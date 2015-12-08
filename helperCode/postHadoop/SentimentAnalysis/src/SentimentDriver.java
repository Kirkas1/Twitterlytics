import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class SentimentDriver {

	public static void main(String[] args) throws IOException {
		// TODO Auto-generated method stub

		Map<String, String> mapz = loadSent();
		PrintWriter writer = new PrintWriter("schoolSentiment.txt", "UTF-8");
		int hoodSen = doIt("hoodCount.txt", mapz);
		int hopSen = doIt("hopkinsCount.txt", mapz);
		int towSen = doIt("TowsonCount.txt", mapz);
		int umbcSen = doIt("umbcCount.txt",mapz);
		int umdSen = doIt("umdCount.txt", mapz);
		
		writer.println("Hood: " + hoodSen);
		writer.println("Hopkins: " + hopSen);
		writer.println("Towson: " + towSen);
		writer.println("UMBC: " + umbcSen);
		writer.println("UMD: " + umdSen);
		
		writer.close();
	}
	
	public static int doIt(String fileIn, Map<String,String> map) throws IOException {
		BufferedReader br = new BufferedReader(new FileReader(fileIn));
		String[] words = new String[2];
		int total = 0;
		String line = br.readLine();

		while(line != null) {
			words = line.split("\t");
			String val= "";
			String word = words[0].toLowerCase();
			int freq = Integer.parseInt(words[1]);
			if((val = map.get(word)) != null) {
				if(val.charAt(2) == 'g') { // For negative
					total += -1 * Math.log(freq );
				} else if (val.charAt(2) == 's'){ // For positive
					total += 1 * Math.log(freq);
				} 
				
			}
			line = br.readLine();
		}
		
		br.close();
		return total;
	}
	
	public static Map<String, String> loadSent() throws IOException {
		HashMap map = new HashMap();
		BufferedReader br = new BufferedReader(new FileReader("justWordAndSentiment.txt"));
		String line = br.readLine();
		String[] words = new String[2];
		while(line != null) {
			words = line.split(",");
			map.put(words[0],words[1]);
			line = br.readLine();
		}
		
		return map;
	}
}
