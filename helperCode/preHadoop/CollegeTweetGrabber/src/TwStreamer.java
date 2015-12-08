import java.io.IOException;

import twitter4j.*;
import twitter4j.conf.ConfigurationBuilder;

public class TwStreamer {
	private TwitterStream twitterStream;
	private StatusListener listener;
	private TweetList twList;
	private double[] bottomLeft;
	private double[] topRight; 
	private String name;
	public TwStreamer(String na, double[] botLeft, double[] toRight) throws TwitterException {
		twList = new TweetList();
		ConfigurationBuilder cb =  new ConfigurationBuilder();
		cb.setOAuthConsumerKey("KhnbTnCYssVROqMM58VXl9o7g");
		cb.setOAuthConsumerSecret("rpBnp9DL4Gbyf8vlCi5lBrxnGoNOe5fMKrtsWqlQ1LJPCOZuGD");
		cb.setOAuthAccessToken("46306245-79XY5vyo0BTiYhBqERPFImzKvQnm6wPXeq1fUez7X");
		cb.setOAuthAccessTokenSecret("RCFgWIgrJ3lGZR9bsuOxUJY6sP5TXI9Rds16J03ISictB");
		TwitterStreamFactory twitterFact= new TwitterStreamFactory(cb.build());
		twitterStream = twitterFact.getInstance();
		bottomLeft = botLeft;
		topRight = toRight;
		name = na;
		
		listener = new StatusListener() {
			@Override
			public void onStatus(Status status) {
				System.out.println("@" + status.getUser().getScreenName() + " - " + status.getText());
				twList.addTweet(status);
				try {
					twList.toCSV(name);
					twList.clear();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}

			@Override
			public void onDeletionNotice(StatusDeletionNotice statusDeletionNotice) {
				System.out.println("Got a status deletion notice id:" + statusDeletionNotice.getStatusId());
			}

			@Override
			public void onTrackLimitationNotice(int numberOfLimitedStatuses) {
				System.out.println("Got track limitation notice:" + numberOfLimitedStatuses);
			}

			@Override
			public void onScrubGeo(long userId, long upToStatusId) {
				System.out.println("Got scrub_geo event userId:" + userId + " upToStatusId:" + upToStatusId);
			}

			@Override
			public void onStallWarning(StallWarning warning) {
				System.out.println("Got stall warning:" + warning);
			}

			@Override
			public void onException(Exception ex) {
				ex.printStackTrace();
			}
		};		
	}

	public void getTweets() {
		// Bottom left, top right
		double[][] locs = {bottomLeft, topRight};
		FilterQuery fq = new FilterQuery();
		// String[] keys = {"UMBC"};
		fq.locations(locs);
		twitterStream.addListener(listener);
		twitterStream.filter(fq);
	}

	public void saveTweets() throws IOException {
		twList.toCSV(name);
	}

}
