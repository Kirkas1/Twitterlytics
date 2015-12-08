import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;

public class Driver {

	public static void main(String[] args) throws IOException {
		// TODO Auto-generated method stub
		
		// Food
		doIt("hoodFood.txt", "hoodFoodTop.txt");
		doIt("hopkinsFood.txt", "hopkinsFoodTop.txt");
		doIt("towsonFood.txt", "towsonFoodTop.txt");
		doIt("umbcFood.txt", "umbcFoodTop.txt");
		doIt("umdFood.txt", "umdFoodTop.txt");

		// Academics
		doIt("hoodAcad.txt", "hoodAcadTop.txt");
		doIt("hopkinsAcad.txt", "hopkinsAcadTop.txt");
		doIt("towsonAcad.txt", "towsonAcadTop.txt");
		doIt("umbcAcad.txt", "umbcAcadTop.txt");
		doIt("umdAcad.txt", "umdAcadTop.txt");
		
		/*
		doIt("hoodClean.txt", "hoodTop.txt");
		doIt("hopkinsClean.txt", "hopkinsTop.txt");
		doIt("towsonClean.txt", "towsonTop.txt");
		doIt("umbcClean.txt", "umbcTop.txt");
		doIt("umdClean.txt", "umdTop.txt");
		*/
}

public static void doIt(String fileIn, String fileOut) throws IOException {
	BufferedReader br = new BufferedReader(new FileReader(fileIn));
	PrintWriter writer = new PrintWriter(fileOut, "UTF-8");
	String line = br.readLine();
	

    HashMap map = new HashMap();
    ValueComparator bvc = new ValueComparator(map);
    TreeMap sorted_map = new TreeMap(bvc);
    
	String[] lineSpl = new String[2];
	String word= "";
	String num = "";
	while(line != null) {
		lineSpl = line.split("\t");
		if(lineSpl[1] != null || lineSpl[1] != "") {
			word = lineSpl[0];
			num = lineSpl[1];
		
			map.put(word, Integer.parseInt(num));
		}
		line = br.readLine();			
	}
	sorted_map.putAll(map);
	
	final int TOP_COUNT = 50;
	int count = 0;
	int[] counts = new int[TOP_COUNT];
	String[] wordss = new String[TOP_COUNT];
	Set keys = sorted_map.keySet();
	for (Iterator i = keys.iterator(); i.hasNext() && count < TOP_COUNT;) {
		String key = (String) i.next();
		int value =  (int) map.get(key);
		counts[count] = value;
		wordss[count] = key;
		count++;
	}
	
	for(int j = 0; j < TOP_COUNT; j++) {
		writer.print(wordss[j] + "," + counts[j]);
		if(j!=TOP_COUNT-1) {
			writer.print("|");
		}
	}
	br.close();
	writer.close();
	}
}
class ValueComparator implements Comparator {
    Map base;

    public ValueComparator(Map base) {
        this.base = base;
    }

	@Override
	public int compare(Object a, Object b) {
		if ((int) base.get(a) >= (int) base.get(b)) {
            return -1;
        } else {
            return 1;
        } // returning 0 would merge keys
	}
}