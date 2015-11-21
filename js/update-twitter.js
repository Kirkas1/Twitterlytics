function updateTwitter() {
	var school = $("#school-select option:selected").text();	
	
	if(school=="UMBC") {
		$("div#towson-timeline").hide();
		$("div#jhu-timeline").hide();
		$("div#hood-timeline").hide();
		$("div#umd-timeline").hide();
		$("div#umbc-timeline").show();
	} 
	else if (school=="College Park") {
		$("div#towson-timeline").hide();
		$("div#jhu-timeline").hide();
		$("div#hood-timeline").hide();
		$("div#umbc-timeline").hide();
		$("div#umd-timeline").show();
	} 
	else if (school=="Towson") {
		$("div#jhu-timeline").hide();
		$("div#hood-timeline").hide();
		$("div#umd-timeline").hide();
		$("div#umbc-timeline").hide();
		$("div#towson-timeline").show();
	} 
	else if (school=="John Hopkins") {
		$("div#towson-timeline").hide();
		$("div#hood-timeline").hide();
		$("div#umd-timeline").hide();
		$("div#umbc-timeline").hide();
		$("div#jhu-timeline").show();
	} 
	else if (school=="Hood") {
		$("div#towson-timeline").hide();
		$("div#jhu-timeline").hide();
		$("div#umd-timeline").hide();
		$("div#umbc-timeline").hide();
		$("div#hood-timeline").show();
	}
}