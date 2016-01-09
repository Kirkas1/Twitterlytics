//Twitterlytics
//Class: CMSC 491 Big Data
//Instructor: Dr Karuna Joshi
//Date: 03/11/2015
//Formats file containing tweets to be parsed by word cloud

import java.io.*;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.io.FileOutputStream;
import java.io.FileInputStream;
import java.util.Scanner;

public class integrator {
		static String fileTwo = "";

  public integrator(String aFileName){
    fFilePath = Paths.get(aFileName);
	
  }
  
  //Processes each count
    public final void processLineByLine() throws IOException {
    try (Scanner scanner =  new Scanner(fFilePath, ENCODING.name())){
	fileTwo += log("[");
      while (scanner.hasNextLine())
	  {
        processLine(scanner.nextLine());
      }
	fileTwo += log("]");
	System.out.println(fileTwo);	
    }
  }
 
 //Iterates through counts for formatting
  protected void processLine(String aLine){
    //use a second Scanner to parse the content of each line 
    Scanner scanner = new Scanner(aLine);

    if (scanner.hasNext()){
      //assumes the line has a certain structure
      String word = scanner.next();
      String count = scanner.next();
	fileTwo += log("[" + quote(word.trim()) + ", " + count + "], \n");
		System.out.println(".");	

    }
    else {
      System.out.println("Empty or invalid line. Unable to process.");
    }

  }
  
  // PRIVATE 
  private Path fFilePath;
  private final static Charset ENCODING = StandardCharsets.UTF_8;  
  
  private static String log(Object aObject){
    return String.valueOf(aObject);
  }
  
  private String quote(String aText){
    String QUOTE = "'";
    return QUOTE + aText + QUOTE;
  }
  
  //Main
  public static void main(String... args) throws IOException {
	
	try
	    {

		if (args.length == 1)
		    {
			integrator parser = new integrator(args[0]);
								
			parser.processLineByLine();	
			System.out.println(fileTwo);	
			File file = new File(args[0]);
			DataOutputStream os = new DataOutputStream(new FileOutputStream(file, false));
			os.write(fileTwo.getBytes());
			os.close();		    
			}
		}
	catch(FileNotFoundException e)
		{
			System.out.println("File Not Found");
		}
	catch (EOFException f)
		{
			System.out.println("End of File!");
		}
	catch (IOException g)
		{
			System.out.println("IOException!");
		}   
				
	System.out.println("Done!");  
	}
}