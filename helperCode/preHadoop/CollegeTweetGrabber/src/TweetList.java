import java.io.FileWriter;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import twitter4j.*;

public class TweetList {
	ArrayList<Status> tweets;
	
	public TweetList() {
		tweets = new ArrayList<Status>();
	}
	
	public void addTweet(Status s) {
		tweets.add(s);
	}
	
	public void toCSV(String name) throws IOException{
		String filename= name + "TweetStream.txt";
		FileWriter fw = new FileWriter(filename,true); //the true will append the new data
			
		// Header for csv
		//fw.write("username|date|text|retweet-count|favorite-count\n");

		for (Status s : tweets) {

			fw.write(fixText(s.getText()) + "\n");		
		}
		fw.close();
	}
	
	public void clear() {
		tweets.clear();
	}
	
	// Makes the csv less lame to look at by removing new lines
	// Also checks the string for the delimiter used (|) to prevent
	// any issues popping up when we go to analyze it later
	private static String fixText(String s) {
		s = s.replaceAll("\\W", " ");
		s = s.replaceAll("\n", " ");
		s = s.replaceAll("\r", " ");
		s = s.replaceAll("|", " ");
		return s;
	}
}
