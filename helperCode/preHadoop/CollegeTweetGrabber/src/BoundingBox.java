import twitter4j.GeoLocation;

public class BoundingBox {
	GeoLocation northwest;
	GeoLocation southeast;
	
	public BoundingBox(GeoLocation nw, GeoLocation se) {
		northwest = nw; 
		southeast = se;
	}
	
	// Parameters: lat, long and a radius (IN KM)
	// Constructs a bounding box given a radius
	public BoundingBox(double lat, double lon, double radius) {
		double R = 6371; // Earth Radius in Km

		double nwX = lon - Math.toDegrees(radius/R/Math.cos(Math.toRadians(lat)));
		double seX = lon + Math.toDegrees(radius/R/Math.cos(Math.toRadians(lat)));
		double nwY = lat + Math.toDegrees(radius/R);
		double seY = lat - Math.toDegrees(radius/R);
		
		northwest = new GeoLocation(nwY, nwX);
		southeast = new GeoLocation(seY, seX);
	}
	
	public boolean contains(double lat, double lon) {
		return ( (lat <= northwest.getLatitude() && lat >= southeast.getLatitude()) && 
					(lon >= northwest.getLongitude() && lon <= southeast.getLongitude()) );
	}
	
	public boolean contains(GeoLocation c) {
		double lat = c.getLatitude();
		double lon = c.getLongitude();
		
		return ( (lat <= northwest.getLatitude() && lat >= southeast.getLatitude()) && 
				(lon >= northwest.getLongitude() && lon <= southeast.getLongitude()) );
	}
	
	public void print() {
		System.out.println("Northwest, lat: " + northwest.getLatitude() + " long: " + northwest.getLongitude());
		System.out.println("Northwest, lat: " + southeast.getLatitude() + " long: " + southeast.getLongitude());
	}
	
}

