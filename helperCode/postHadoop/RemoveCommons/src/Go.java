import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

public class Go {

	public static void main(String[] args) throws IOException {
		// TODO Auto-generated method stub
		
		doIt("hoodCount.txt", "hoodFood.txt", "food.txt");
		doIt("hopkinsCount.txt", "hopkinsFood.txt", "food.txt");
		doIt("TowsonCount.txt", "towsonFood.txt", "food.txt");
		doIt("umbcCount.txt", "umbcFood.txt", "food.txt");
		doIt("umdCount.txt", "umdFood.txt", "food.txt");
		
		// Academics
		doIt("hoodCount.txt", "hoodAcad.txt", "aca.txt");
		doIt("hopkinsCount.txt", "hopkinsAcad.txt", "aca.txt");
		doIt("TowsonCount.txt", "towsonAcad.txt", "aca.txt");
		doIt("umbcCount.txt", "umbcAcad.txt", "aca.txt");
		doIt("umdCount.txt", "umdAcad.txt", "aca.txt");
		
		
		/* For Articles
		doItRemove("hoodCount.txt", "hoodClean.txt", "articles.txt");
		doItRemove("hopkinsCount.txt", "hopkinsClean.txt", "articles.txt");
		doItRemove("TowsonCount.txt", "towsonClean.txt", "articles.txt");
		doItRemove("umbcCount.txt", "umbcClean.txt", "articles.txt");
		doItRemove("umdCount.txt", "umdClean.txt", "articles.txt");
		*/
	}
	
	public static void doItRemove(String fileIn, String fileOut, String artName) throws IOException {
		BufferedReader br = new BufferedReader(new FileReader(fileIn));
		PrintWriter writer = new PrintWriter(fileOut, "UTF-8");
		ArrayList<String> arts = loadArticles(artName);
		String[] words = new String[2];
		String line = br.readLine();
		
		while(line != null) {
			words = line.split("\t");
			String word = words[0];
			boolean isArt = false;
			for(String art : arts) {
				if(art.equalsIgnoreCase(word)) {
					isArt = true;
				}
			}
			if(!isArt) {
				writer.println(line);
			}
			
			line = br.readLine();
		}
		
		br.close();
		writer.close();
	}
	
	public static void doIt(String fileIn, String fileOut, String artName) throws IOException {
		BufferedReader br = new BufferedReader(new FileReader(fileIn));
		PrintWriter writer = new PrintWriter(fileOut, "UTF-8");
		ArrayList<String> arts = loadArticles(artName);
		String[] words = new String[2];
		String line = br.readLine();
		
		while(line != null) {
			words = line.split("\t");
			String word = words[0];
			boolean isArt = false;
			for(String art : arts) {
				if(art.equalsIgnoreCase(word)) {
					isArt = true;
				}
			}
			if(isArt) {
				writer.println(line.toLowerCase());
			}
			
			line = br.readLine();
		}
		
		br.close();
		writer.close();
	}

	
	public static ArrayList<String> loadArticles(String filein) throws IOException {
		ArrayList<String> art = new ArrayList<String>();
		BufferedReader br = new BufferedReader(new FileReader(filein));
		String line = br.readLine();
		
		while(line != null) {
			art.add(line);
			line = br.readLine();
		}
		br.close();
		return art;
	}
}
