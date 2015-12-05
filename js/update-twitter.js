function updateTwitter() {
	var school = $("#school-select option:selected").text();	
	
	if(school=="UMBC") {
		$("div#towson-timeline").hide();
		$("div#jhu-timeline").hide();
		$("div#hood-timeline").hide();
		$("div#umd-timeline").hide();
		$("div#umbc-timeline").show();
		$("canvas#umbccanvas").show();
		$("canvas#umdcanvas").hide();
		$("canvas#hopkinscanvas").hide();
		$("canvas#towsoncanvas").hide();
		$("canvas#hoodcanvas").hide();
		
	} 
	else if (school=="College Park") {
		$("div#towson-timeline").hide();
		$("div#jhu-timeline").hide();
		$("div#hood-timeline").hide();
		$("div#umbc-timeline").hide();
		$("div#umd-timeline").show();
		$("canvas#umbccanvas").hide();
		$("canvas#umdcanvas").show();
		$("canvas#hopkinscanvas").hide();
		$("canvas#towsoncanvas").hide();
		$("canvas#hoodcanvas").hide();
	} 
	else if (school=="Towson") {
		$("div#jhu-timeline").hide();
		$("div#hood-timeline").hide();
		$("div#umd-timeline").hide();
		$("div#umbc-timeline").hide();
		$("div#towson-timeline").show();
		$("canvas#umbccanvas").hide();
		$("canvas#umdcanvas").hide();
		$("canvas#hopkinscanvas").hide();
		$("canvas#towsoncanvas").show();
		$("canvas#hoodcanvas").hide();
	} 
	else if (school=="John Hopkins") {
		$("div#towson-timeline").hide();
		$("div#hood-timeline").hide();
		$("div#umd-timeline").hide();
		$("div#umbc-timeline").hide();
		$("div#jhu-timeline").show();
		$("canvas#umbccanvas").hide();
		$("canvas#umdcanvas").hide();
		$("canvas#hopkinscanvas").show();
		$("canvas#towsoncanvas").hide();
		$("canvas#hoodcanvas").hide();
	} 
	else if (school=="Hood") {
		$("div#towson-timeline").hide();
		$("div#jhu-timeline").hide();
		$("div#umd-timeline").hide();
		$("div#umbc-timeline").hide();
		$("div#hood-timeline").show();
		$("canvas#umbccanvas").hide();
		$("canvas#umdcanvas").hide();
		$("canvas#hopkinscanvas").hide();
		$("canvas#towsoncanvas").hide();
		$("canvas#hoodcanvas").show();
	}
}