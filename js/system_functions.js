/*
Source
>The following is edited code taken from
>http://vikku.info/programming/google-maps-v3/get-lattitude-longitude-onclick-and-onmouseover-google-map-v3.htm

Description
>This function sets up the parameters of the google map. This function also contains
Listeners for a page resize and a click on the map.

Variables
>map - contains the Google map object
>marker - positioning tool for the Google map object
*/
var map;
var marker;
var alertUrl = 'http://54.83.23.216:8081/alert/';
var parsed;
var UMBC_Lat = 39.2555; 
var UMBC_Long =  -76.7111;

function initialize() {	
	var mapOptions = {
		center: new google.maps.LatLng(39.2555, -76.7111),
		zoom: 17,
		mapTypeId:google.maps.MapTypeId.ROADMAP,
		draggable: false,
		clickable: false,
		disableDoubleClickZoom: true,
		streetViewControl: false,
		scrollwheel: false,
    	navigationControl: false,
    	mapTypeControl: false,
    	scaleControl: false,
    	zoomControl: false
	};
	//creating the map
	map = new google.maps.Map(document.getElementById('map_canvas'),mapOptions);
	
	google.maps.event.addDomListener(window, "resize", function() {
 		var center = map.getCenter();
 		google.maps.event.trigger(map, "resize");
 		map.setCenter(center); 
 	})
	//Initialize a default marker
	marker = new google.maps.Marker({
            position: new google.maps.LatLng(39.2555, -76.7111),
            map: map,
            zoom: 8
	})
	
	//Make a default radius of 100x point radius
	//and a default lat/lang of the center of the map
	document.getElementById('radius').value = .5
	document.getElementById('latForm').value = 39.2555
	document.getElementById('lonForm').value = -76.7111

	//Retrieving the coordinates from a position on the map
	google.maps.event.addListener(map,'click',function(event) {
		document.getElementById('latForm').value = event.latLng.lat()
		document.getElementById('lonForm').value = event.latLng.lng()
		document.getElementById('radius').value = .0005
	})
	//Placing a marker on a position clicked on the map
	google.maps.event.addListener(map, 'click', function(event) {
   		placeMarker(event.latLng);
  	});
};


//ALERT DETAIL MAP
function alertMap(latitude, longitude) {
      
		var alertPageMap = document.getElementById('alertPageMap');
		/* if(longitude != null && latitude != null) {
			 var mylnglat = new google.maps.LatLng(latitude, longitude);
		}else mylnglat = */ 
		
		var mylnglat = (longitude == null || latitude == null) ? 
				new google.maps.LatLng(UMBC_Lat, UMBC_Long) : new google.maps.LatLng(latitude, longitude);
         
		 var map_options = {
            center: new google.maps.LatLng(UMBC_Lat, UMBC_Long),
            zoom: 16,
            clickable: false,
            draggable: false,
            disableDoubleClickZoom: true,
            paneControl: false,
            streetViewControl: false,
            scrollwheel: false,
            navigationControl: false,
            mapTypeControl: false,
            scaleControl: false,
            zoomControl: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          }
          var map = new google.maps.Map(alertPageMap, map_options)

          var marker = new google.maps.Marker({
              position: mylnglat,
              map: map,
              title: 'Incident Location'
          });

         };
 


/*
Source
>The following is edited code taken from
>http://stackoverflow.com/questions/16571273/google-map-api-v3-remove-old-marker-when-doing-geocoding

Description
>Function for placing a marker on the map.

Variables
>marker - contains the Google map, marker object
*/
function placeMarker(location) {
	//if a marker is on the map already place it in the new position
	//otherwise create a new marker
	if(marker) {
		marker.setPosition(location);
	}else{
        marker = new google.maps.Marker({
            position: location,
            map: map,
            zoom: 8
        });
    }
}

//array of conditional events.
var events = new Array();
//conditions of criminal and non criminal events
events['nonCriminal'] = ['Accident','Chemical Spill', 'Fire','Traffic', 'Weather', 'Other'];
events['criminal'] = ['Active Gunman','Arson', 'Aggravated Assault', 'Burglary', 'Disorderly Conduct', 'Disturbing the Peace',
	'Domestic Violence', 'Public Intoxication', 'Rape', 'Stalking', 'Vandalism', 'Other'];

/*
Source
>The following is edited code taken from
>http://forums.phpfreaks.com/topic/145947-radio-button-to-change-drop-down-fields/

Description
>Changing the contents of a list based on the radio button of the submit form

Parameters
>crimeOrNot - value of the radio button selected by the users ('criminal' or 'nonCriminal')

Variables
>eventList - contains the list of events denoting the criminal status
*/
function changeCrimeStatus(crimeOrNot) {
    var eventList = events[crimeOrNot];
    changeSelect('event', eventList, eventList);
    document.getElementById('event').disabled = false;
}

/*
Source
>The following is edited code taken from
>http://forums.phpfreaks.com/topic/145947-radio-button-to-change-drop-down-fields/

Description
>returns the element of the list

Parameters
>eventValue - takes in the value of the eventList as determined by the user
*/
/*
function changeEvent(eventValue) {
    document.getElementById('output').innerHTML = eventValue;
    return;
}
*/

/*
Source
>The following is edited code taken from
>http://forums.phpfreaks.com/topic/145947-radio-button-to-change-drop-down-fields/

Description
>Populating the dropdown list with elements from a list.

Parameters
>fieldID - the field type
>newValues - The list of events as determined by the criminal status
>newOptions - the elements of the new list if the criminal status is changed
*/
function changeSelect(fieldID, newValues, newOptions) {
	selectField = document.getElementById(fieldID);
	selectField.options.length = 0;

	if (newValues && newOptions) {
		for (i = 0; i < newValues.length; i++) {
	  		selectField.options[selectField.length] = new Option(newOptions[i], newValues[i]);
		}
	}
}

//Array of descriptions for various levels of severity
var sevDesc = ['1 - Informative Alert; 0 Threat to persons. (Ex. School concert this weekend, use good judgement and be safe)',
			   '2 - Advisory; Informative, possibly requiring user awareness. (Ex. Heavy traffic, Inclement Weather(rain, snow, etc.))',
			   '3 - Hazardous Conditions; Be aware as these conditions could cause harm. (Ex. Icey walkway, open construction)',
			   '4 - Non-life threatening damages; Mideameanor or non-violent crime;(Ex. Vandalism, Theft)',
			   '5 - Non-life threatening misconduct; criminal in nature, should be reported to authorities (Ex. lewd conduct, indecent exposure) ',
			   '6 - Severe Inclement Weather; Weather advisory with high potential for human harm. Ex. Tornado, flash flood, hurricane)',
			   '7 - Danger to Persons; Possible life threatening situation. Violent crime. Contact authorities.(Ex. Assault, Domestic violence, sexual assault)',
			   '8 - LIFE THREATENING - Persons are in immediate danger; Call 911 as soon as possible (Ex. active gunman, bomb threat)'];

/*
Description
>Function and setup for displaying a description with the severity slider 	  

Parameters
>level - the level determined by the severity slider
*/ 
function severityDesc(level){
	document.getElementById('severityLevel').innerHTML = sevDesc[level-1];
}


/*
Source
>The following is edited code taken from
>http://jsfiddle.net/briguy37/2MVFd/

Description
>This function creates a unique id for each report submitted

Variables
>today - today's date
>d - time of day
>uuid - combination of todays date and the date the report is submitted. 
*/
function generateID() {
	var today = new Date();
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x7|0x8)).toString(16);
    });
    document.getElementById('source_id').value = today.getMonth().toString() + today.getDate().toString() + uuid.toString();
	
};

//clears the values of the forms so new input can be used in the event that the page is refreshed
function clearValues() {
	document.getElementById('severity').value = 1;
	severityDesc(document.getElementById('severity').value);
	//document.getElementById('crimeStatus').checked = false;
	document.getElementById('event').disabled = true;
	document.getElementById('optDesc').value = '';
	var ele = document.getElementsByName('crimeStatus');
   	for(var i=0;i<ele.length;i++){
   		ele[i].checked = false;
   	}
}


//Code from this function was found and modified from
//http://stackoverflow.com/questions/14554376/dynamically-creating-an-html-table-with-javascript
//by author Rick Calder
//Function for setting up and formatting a table on the View page
function createTable(numRows, elementId, data)
{
    //numRows is given by system and will relate to max number of rows the table will show (the rest will be scrollable)
    //elementId is the Id of the table to be created, in this case the table for active and the table for past alerts.
    var num_rows = numRows;
    var num_cols = 1;
    var tbody = '';
            for(var i=0; i < num_rows; i++){
              tbody += '<tr>';
                for( var j=0; j<num_cols; j++)
                {
					if(data[i].title == null){
						tbody += '<td>';
						tbody += '<a href="alert_detail.html?alertID=' + data[i].name + '">'
						+ 'There is no Title associated with this alert</a>';
						tbody += '</td>';
					}else {
						tbody += '<td>';
						tbody += '<a href="alert_detail.html?alertID=' + data[i].name + '">'
						+ data[i].title + '</a>';  
						tbody += '</td>';
					}
                }
    	     tbody += '</tr>\n';
	     }
    document.getElementById(elementId).innerHTML = tbody;
}



function getAlerts(){
	$.ajax({
		type: 'GET',  // a PUT does a create
		accept: 'application/json',
		url: alertUrl,
		success: function(data){
			// set the text to the result
			var activeAlerts = [];
			var pastAlerts = [];

			for(var i = 0; i < data.docs.length; i++){

				if(data.docs[i].alert_horizon.length == 0 || data.docs[i].alert_horizon[0].end_date == undefined){

					activeAlerts.push(data.docs[i]);

				}else {
					pastAlerts.push(data.docs[i]);
				}

			}
			
			if(activeAlerts == null){
				createTable(activeAlerts.length, 'activeAlerts', activeAlerts);
				if(pastAlerts == null){
					createTable(pastAlerts.length, 'pastAlerts', pastAlerts);
				} else { createTable(pastAlerts.length, 'pastAlerts', pastAlerts.reverse()); }
				
			} else if(pastAlerts == null){
				createTable(pastAlerts.length, 'pastAlerts', pastAlerts);
			}else{
				createTable(activeAlerts.length, 'activeAlerts', activeAlerts.reverse());
				createTable(pastAlerts.length, 'pastAlerts', pastAlerts.reverse());
			}
		},
		error: function(msg){
			console.log('Error');
		} 
	});	
		
}


//this funcitno takes the query string from the url and gets the alert object
//that it corresponds to and then calls a function to set up the page and get the map
//and details displayed.
function getAlertFromID(callBackFormat){

	var alertID = decodeURIComponent(location.search.split('=')[1]);
	var selectedAlert = {};
	
	$.ajax({
		type: 'GET',  // a PUT does a create
		accept: 'application/json',
		url: alertUrl,
		success: function(data){
			// set the text to the result
			for(var i = 0; i < data.docs.length; i++){
				if(data.docs[i].name == alertID){
					selectedAlert = data.docs[i];
				}else {
				}
			}
			
			callBackFormat(selectedAlert, 'alertDetails');
		},
		error: function(msg){
			console.log('Error');
		} 
	});
}

//The function that will be called at the completion of the ajax request to set up the
//details page based on the alert returned in the getAlertID method.
function callBackFormat(alertToDisplay, tableID){

	if(alertToDisplay.place[0] == null || alertToDisplay.place[0].latitude == null){
		alertMap(UMBC_Lat, UMBC_Long);
	} else {alertMap(alertToDisplay.place[0].latitude, alertToDisplay.place[0].longitude);}
	
    var tbody = '';
	tbody += '<tr><td colspan="2">Alert Details</td></tr>';
	tbody += '<tr><td>Title</td><td>' + 
		((alertToDisplay.title == null) ? 'There is no title for this alert' : alertToDisplay.title) + '</td><tr>';
	tbody += '<tr><td>Start Time</td><td>' + new Date(alertToDisplay.activationDate) + '</td><tr>';
	tbody += '<tr><td>End Time</td><td>' + 
		((alertToDisplay.alert_horizon[0] == null || alertToDisplay.alert_horizon[0].end_date == null) ? 'There is no end time for this alert; it is still active.' : new Date(alertToDisplay.alert_horizon[0].end_date)) + '</td><tr>';
	
	tbody += '<tr><td>Duration</td><td>' + calcDuration(alertToDisplay) + '</td><tr>';
	
	if(alertToDisplay.place[0] == null){
		
		tbody += '<tr><td>Alert Location - Latitude</td><td>There is no latitude for this alert</td><tr>';
		tbody += '<tr><td>Alert Location - Longitude</td><td>There is no longitude for this alert</td><tr>';
		tbody += '<tr><td>Place Name</td><td>There is no established name for this location</td><tr>';
		
	}else { 
		tbody += '<tr><td>Alert Location - Latitude</td><td>' + 
			((alertToDisplay.place[0].latitude == null) ? 'There is no latitude for this alert' : alertToDisplay.place[0].latitude) + '</td><tr>';
		tbody += '<tr><td>Alert Location - Longitude</td><td>' + 
			((alertToDisplay.place[0].longitude == 0) ? 'There is no longitude for this alert' : alertToDisplay.place[0].longitude) + '</td><tr>';
		tbody += '<tr><td>Place Name</td><td>' + 
			((alertToDisplay.place[0].name == null) ? 'There is no established name for this location' : alertToDisplay.place[0].name) + '</td><tr>';
	}
	
	tbody += '<tr><td>Severity</td><td>' + 
		((alertToDisplay.severity == null) ? 'There is not an established severity for this alert' : alertToDisplay.severity) + '</td><tr>';
	tbody += '<tr><td>Description</td><td>' + 
		((alertToDisplay.description == null) ? 'There is no extra description for this alert' : alertToDisplay.description) + '</td><tr>';
	tbody += '\n';
	
    document.getElementById(tableID).innerHTML = tbody;
}

//Helper function that calculates the duration of an alert in milliseconds and returns a formated string
function calcDuration(alert){
	var startDate = new Date(alert.activationDate);
	var endDate;
	if(alert.alert_horizon[0] == null || alert.alert_horizon[0].end_date == null || alert.alert_horizon[0].end_date == null){
		return 'Unable to determine the duration of this alert; '+
			'Alerts without an end date are still active and will not yet have a duration';
	} else {
		endDate = new Date(alert.alert_horizon[0].end_date);
		return formatDuration((endDate.getTime() - startDate.getTime()));
	}
}


//This code was taken from http://stackoverflow.com/questions/8528382/javascript-show-milliseconds-as-dayshoursmins-without-seconds
// by author Mic, and adapted for use on in the ARGOS system
//this helper function takes a number as an argument (a time in milliseconds) and returns a formated string of days hours and minutes
function formatDuration(t){
    var cd = 24 * 60 * 60 * 1000,
        ch = 60 * 60 * 1000,
        d = Math.floor(t / cd),
        h = '0' + Math.floor( (t - d * cd) / ch),
        m = '0' + Math.round( (t - d * cd - h * ch) / 60000);
    return [d,'Days', h.substr(-2),'Hours', m.substr(-2),'Minutes'].join(' ');
}