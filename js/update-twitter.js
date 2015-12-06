function updateTwitter() {
	var school = $("#school-select option:selected").text();	
	
	if(school=="UMBC") {
		$("div#towson-timeline").hide();
		$("div#jhu-timeline").hide();
		$("div#hood-timeline").hide();
		$("div#umd-timeline").hide();
		$("div#umbc-timeline").show();

		$("canvas#umd-canvas").hide();
		$("canvas#umd-food-canvas").hide();
		$("canvas#umd-acad-canvas").hide();
		$("canvas#hopkins-canvas").hide();
		$("canvas#hopkins-food-canvas").hide();
		$("canvas#hopkins-acad-canvas").hide();
		$("canvas#towson-canvas").hide();
		$("canvas#towson-food-canvas").hide();
		$("canvas#towson-acad-canvas").hide();
		$("canvas#hood-canvas").hide();
		$("canvas#hood-food-canvas").hide();
		$("canvas#hood-acad-canvas").hide();

		if(document.getElementById('subject-food').checked) {
			$("canvas#umbc-canvas").hide();
			$("canvas#umbc-acad-canvas").hide();
			$("canvas#umbc-food-canvas").show();
		} else if(document.getElementById('subject-acad').checked) {
			$("canvas#umbc-canvas").hide();
			$("canvas#umbc-food-canvas").hide();
			$("canvas#umbc-acad-canvas").show();
		}
		else {
			$("canvas#umbc-food-canvas").hide();
			$("canvas#umbc-acad-canvas").hide();
			$("canvas#umbc-canvas").show();
		}
		
		map.panTo(new google.maps.LatLng(39.2555, -76.7111));
		map.setZoom(17);
	} 
	else if (school=="College Park") {
		$("div#towson-timeline").hide();
		$("div#jhu-timeline").hide();
		$("div#hood-timeline").hide();
		$("div#umbc-timeline").hide();
		$("div#umd-timeline").show();
		
		$("canvas#umbc-food-canvas").hide();
		$("canvas#umbc-acad-canvas").hide();
		$("canvas#hopkins-canvas").hide();
		$("canvas#hopkins-food-canvas").hide();
		$("canvas#hopkins-acad-canvas").hide();
		$("canvas#towson-canvas").hide();
		$("canvas#towson-food-canvas").hide();
		$("canvas#towson-acad-canvas").hide();
		$("canvas#hood-canvas").hide();
		$("canvas#hood-food-canvas").hide();
		$("canvas#hood-acad-canvas").hide();

		if(document.getElementById('subject-food').checked) {
			$("canvas#umd-canvas").hide();
			$("canvas#umd-acad-canvas").hide();
			$("canvas#umd-food-canvas").show();
		} else if(document.getElementById('subject-acad').checked) {
			$("canvas#umd-canvas").hide();
			$("canvas#umd-food-canvas").hide();
			$("canvas#umd-acad-canvas").show();
		}
		else {
			$("canvas#umd-food-canvas").hide();
			$("canvas#umd-acad-canvas").hide();
			$("canvas#umd-canvas").show();
		}

		map.panTo(new google.maps.LatLng(38.988741, -76.943178));
		map.setZoom(15);
	} 
	else if (school=="Towson") {
		$("div#jhu-timeline").hide();
		$("div#hood-timeline").hide();
		$("div#umd-timeline").hide();
		$("div#umbc-timeline").hide();
		$("div#towson-timeline").show();
		
		$("canvas#umbc-canvas").hide();
		$("canvas#umbc-food-canvas").hide();
		$("canvas#umbc-acad-canvas").hide();
		$("canvas#umd-canvas").hide();
		$("canvas#umd-food-canvas").hide();
		$("canvas#umd-acad-canvas").hide();
		$("canvas#hopkins-canvas").hide();
		$("canvas#hopkins-food-canvas").hide();
		$("canvas#hopkins-acad-canvas").hide();
		$("canvas#hood-canvas").hide();
		$("canvas#hood-food-canvas").hide();
		$("canvas#hood-acad-canvas").hide();
		
		if(document.getElementById('subject-food').checked) {
			$("canvas#towson-canvas").hide();
			$("canvas#towson-acad-canvas").hide();
			$("canvas#towson-food-canvas").show();
		} else if(document.getElementById('subject-acad').checked) {
			$("canvas#towson-canvas").hide();
			$("canvas#towson-food-canvas").hide();
			$("canvas#towson-acad-canvas").show();
		}
		else {
			$("canvas#towson-food-canvas").hide();
			$("canvas#towson-acad-canvas").hide();
			$("canvas#towson-canvas").show();
		}

		map.panTo(new google.maps.LatLng(39.394360, -76.610733));
		map.setZoom(16);
	} 
	else if (school=="John Hopkins") {
		$("div#towson-timeline").hide();
		$("div#hood-timeline").hide();
		$("div#umd-timeline").hide();
		$("div#umbc-timeline").hide();
		$("div#jhu-timeline").show();

		$("canvas#umbc-canvas").hide();
		$("canvas#umbc-food-canvas").hide();
		$("canvas#umbc-acad-canvas").hide();
		$("canvas#umd-canvas").hide();
		$("canvas#umd-food-canvas").hide();
		$("canvas#umd-acad-canvas").hide();
		$("canvas#towson-canvas").hide();
		$("canvas#towson-food-canvas").hide();
		$("canvas#towson-acad-canvas").hide();
		$("canvas#hood-canvas").hide();
		$("canvas#hood-food-canvas").hide();
		$("canvas#hood-acad-canvas").hide();

		if(document.getElementById('subject-food').checked) {
			$("canvas#hopkins-canvas").hide();
			$("canvas#hopkins-acad-canvas").hide();
			$("canvas#hopkins-food-canvas").show();
		} else if(document.getElementById('subject-acad').checked) {
			$("canvas#hopkins-canvas").hide();
			$("canvas#hopkins-food-canvas").hide();
			$("canvas#hopkins-acad-canvas").show();
		}
		else {
			$("canvas#hopkins-food-canvas").hide();
			$("canvas#hopkins-acad-canvas").hide();
			$("canvas#hopkins-canvas").show();
		}

		map.panTo(new google.maps.LatLng(44.926629, -93.404636));
		map.setZoom(14);
	} 
	else if (school=="Hood") {
		$("div#towson-timeline").hide();
		$("div#jhu-timeline").hide();
		$("div#umd-timeline").hide();
		$("div#umbc-timeline").hide();
		$("div#hood-timeline").show();
		
		$("canvas#umbc-canvas").hide();
		$("canvas#umbc-food-canvas").hide();
		$("canvas#umbc-acad-canvas").hide();
		$("canvas#umd-canvas").hide();
		$("canvas#umd-food-canvas").hide();
		$("canvas#umd-acad-canvas").hide();
		$("canvas#hopkins-canvas").hide();
		$("canvas#hopkins-food-canvas").hide();
		$("canvas#hopkins-acad-canvas").hide();
		$("canvas#towson-canvas").hide();
		$("canvas#towson-food-canvas").hide();
		$("canvas#towson-acad-canvas").hide();

		if(document.getElementById('subject-food').checked) {
			$("canvas#hood-canvas").hide();
			$("canvas#hood-acad-canvas").hide();
			$("canvas#hood-food-canvas").show();
		} else if(document.getElementById('subject-acad').checked) {
			$("canvas#hood-canvas").hide();
			$("canvas#hood-food-canvas").hide();
			$("canvas#hood-acad-canvas").show();
		}
		else {
			$("canvas#hood-food-canvas").hide();
			$("canvas#hood-acad-canvas").hide();
			$("canvas#hood-canvas").show();
		}
		
		map.panTo(new google.maps.LatLng(39.421573, -77.419701));
		map.setZoom(17);
	}
}
