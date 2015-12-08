// TODO Auto-generated method stub
//		Move everything from coordinate to geoLocation

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Scanner;

import twitter4j.*;
import twitter4j.conf.ConfigurationBuilder;

public class Driver {

	public static void main(String[] args) throws TwitterException, ParseException, IOException {
		
		// USAGE java -jar CollegeTweetGrabber.jar NameOfCollege(UMBC, Towson, UMD, Hopkins, Hood) 
		//ArrayList<Status> twts = getUMBCTweetsMyWay();
		
		if(args.length != 1) {
			System.out.println("Usage CollegeTweetGrabber NameOfCollege(UMBC, Towson, UMD, Hopkins, Hood)");
			System.exit(0);
		}
		
		String college = args[0];
		double[] botLeft = new double[2];
		double[] tRight = new double[2];
		
		if(college.equals("UMBC")) {
			botLeft[0] = -76.726110;
			botLeft[1] = 39.245387;
			tRight[0] = -76.702183;
			tRight[1] = 39.260102;			
		} else if(college.equals("Towson")) {
			botLeft[0] = -76.624263;
			botLeft[1] = 39.382764;
			tRight[0] = -76.591672;
			tRight[1] = 39.402323;			
		} else if(college.equals("UMD")) {
			botLeft[0] = -76.967550;
			botLeft[1] = 38.976214;
			tRight[0] = -76.910816;
			tRight[1] = 39.005834;			
		} else if(college.equals("Hopkins")) {
			botLeft[0] = -76.629453;
			botLeft[1] = 39.321066;
			tRight[0] = -76.609627;
			tRight[1] = 39.336337;			
		} else if(college.equals("Hood")) {
			botLeft[0] = -77.424601;
			botLeft[1] = 39.419200;
			tRight[0] = -77.410525;
			tRight[1] = 39.426908;			
		}
		//makeCSVOfTweets(twts);
		TwStreamer tsm = null;
		
		try {
			tsm = new TwStreamer(college, botLeft, tRight);
			tsm.getTweets();
		}
		
		catch(TwitterException t) {
			t.printStackTrace();
			//tsm.saveTweets();
		}
	}

	
	
	static ArrayList<Status> getUMBCTweetsMyWay() throws ParseException, TwitterException, FileNotFoundException, UnsupportedEncodingException {
		final String CONSUMER_KEY = "ugKhuhppdjzkOtsuoSzA6BlZu";
		final String CONSUMER_SECRET = "4ES3BwudWqVk4Lmpr9aYVhMXtSMNgOSYbq6PLVhOhLDKfMTZr0";
		final String ACCESS_TOKEN = "46306245-mjOMALTntWw3qCSfuRGZA6sBVhQVak3cx6EKX3Cxp";
		final String ACCESS_SECRET = "LEYTCyRmaxmokkymsF3AFsayOrnoqbWmsMvJoYJHO5lZE";
		final double UMBC_LAT = 39.25703;
		final double UMBC_LONG = -76.710621;
		final double QUERY_MILES = 5; // IN MILES WOW
		
		ConfigurationBuilder cb = new ConfigurationBuilder();
		cb.setOAuthConsumerKey(CONSUMER_KEY);
		cb.setOAuthConsumerSecret(CONSUMER_SECRET);
		cb.setOAuthAccessToken(ACCESS_TOKEN);
		cb.setOAuthAccessTokenSecret(ACCESS_SECRET);
		
		Twitter twitter = new TwitterFactory(cb.build()).getInstance();
		
		// For keeping track of stats
		int numTweets = 0;

		GeoLocation umbcLoc = new GeoLocation(UMBC_LAT, UMBC_LONG);

		Query q = new Query();
		q.setGeoCode(umbcLoc, QUERY_MILES, Query.MILES);
		QueryResult r = twitter.search(q);
		
		
		ArrayList<Status> totalTweets = new ArrayList<Status>();
		totalTweets.addAll(r.getTweets());
		
		// Goes through search results
		while(r.hasNext()) {
			numTweets += r.getTweets().size();
			r = twitter.search(r.nextQuery());
			totalTweets.addAll(r.getTweets());
		}
		
		System.out.println("Radius of search used around UMBC: " + QUERY_MILES + " miles");
		System.out.println("Number of tweets: " + numTweets);
		
		return totalTweets;
	}
	
	static void makeCSVOfTweets(ArrayList<Status> tweets) throws FileNotFoundException, UnsupportedEncodingException, ParseException {

		PrintWriter pW = new PrintWriter("generalTweets4.txt", "UTF-8");
		
		// Keep track of the range of tweets we're gathering
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date min = sdf.parse("3000-12-31");
		Date max = sdf.parse("1980-12-31");
		
		// Header for csv
		pW.println("username|date|text|retweet-count|favorite-count");
		
		for (Status s : tweets) {
			Date tweetDate = s.getCreatedAt();
			
			if(tweetDate.compareTo(max) > 0) {
				max = tweetDate;
			}
			else if(tweetDate.compareTo(min) < 0) {
				min = tweetDate;
			}
			
			pW.println(fixText(s.getUser().getName()) + "|" +
					fixText(s.getCreatedAt().toString()) + "|" +
					fixText(s.getText()) + "|" +
					s.getRetweetCount() + "|" +
					s.getFavoriteCount());		
		}
		
		pW.close();
		

		System.out.println("From: " + min + " to " + max);
	}
	
	// Parameters: lat, lon coords
	// Output: prints locations with their id for searching
	static void printPlacesNearLoc(double lat, double lon) {
		try {
			Twitter twitter = new TwitterFactory().getInstance();
			GeoLocation loc = new GeoLocation(lat, lon);
			GeoQuery gq = new GeoQuery(loc);

			ResponseList<Place> places = twitter.searchPlaces(gq);

			if(places.size() == 0) {
				System.out.println("Oops didn't find anything");
			}
			else {
				for(Place p : places) {
					System.out.print("Name: " + p.getName());
					System.out.println("\tId: " + p.getId());
				}
			}
		}
		catch(TwitterException te) {
			te.printStackTrace();
			System.out.println("Oops it failed: \n" + te.getMessage());
		}
	}

	// Makes the csv less lame to look at by removing new lines
	// Also checks the string for the delimiter used (|) to prevent
	// any issues popping up when we go to analyze it later
	static String fixText(String s) {
		s = s.replace("\n", " ");
		s = s.replace("\r", " ");
		s = s.replace("|", " ");
		return s;
	}

	// Parameters: String containing the place id for twitter searches
	// Output: Full details for specified place including
	//			Country, country code, full name, id, place type, address, contained within
	static void printDetailsForPlace(String placeId) {
		try {
            Twitter twitter = new TwitterFactory().getInstance();
            Place place = twitter.getGeoDetails(placeId);
            System.out.println("name: " + place.getName());
            System.out.println("country: " + place.getCountry());
            System.out.println("country code: " + place.getCountryCode());
            System.out.println("full name: " + place.getFullName());
            System.out.println("id: " + place.getId());
            System.out.println("place type: " + place.getPlaceType());
            System.out.println("street address: " + place.getStreetAddress());
            Place[] containedWithinArray = place.getContainedWithIn();
            if (containedWithinArray != null && containedWithinArray.length != 0) {
                System.out.println("  contained within:");
                for (Place containedWithinPlace : containedWithinArray) {
                    System.out.println("  id: " + containedWithinPlace.getId() + " name: " + containedWithinPlace.getFullName());
                }
            }
            System.exit(0);
        } catch (TwitterException te) {
            te.printStackTrace();
            System.out.println("Failed to retrieve geo details: " + te.getMessage());
            System.exit(-1);
        }
	}

}
