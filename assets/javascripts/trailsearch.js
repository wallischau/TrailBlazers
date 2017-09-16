/* trailsearch.js                                                         */
/* Description: trail search engines                                      */
/* Date: 9/1/2017                                                         */
/* Author: Wallis Chau, Sangeetha Kaliaperumal, Ed Quintana, Kelly Wenzel */

//Global Variables
const gglGeoKey = "AIzaSyDWwrN_OuE7I9kQXw0oVn7OuYbhyAhhyX4";
// AIzaSyDWwrN_OuE7I9kQXw0oVn7OuYbhyAhhyX4
// AIzaSyCMmYZlGfP_9f2Prq5sCqvSfpp5D3s7EoU- Wallis Key
const LIMIT = 10;
var sourceAddr = "";
var trailResponse;
var transitAvail = 0;
var curWeather = 0;
var transitTime = 0;
//Variables needed for form-3
var gl_radius = 1;
var gl_sourceaddr = "";
var gl_state = "";
//Sets focus on Starting Address Field after clicking on the Start Search Button
$( "#startSearch" ).click(function() {
  $( "#pac-input").focus();
});


//Form Submission Function-Passes Values from input form to the Trails API, passes values to Google API
$(document).ready(function() {
//'.search-btn'

	$('#trailForm').on('click', '#submit', function(event) {
		event.preventDefault();
		//clear panel
		$('#panel').empty();
		var radius = 0;
		var inputRadius = $("#input-trail-radius").val();
		if (inputRadius !== null) {
			// Need to remove double-quotes from inputRadius.
			inputRadius = inputRadius.substring(1, inputRadius.length-1);
			radius = parseInt(inputRadius);
		}
		if (isNaN(radius) || radius == 0) {
			// Default to 25 if radius not specified.
			radius = 25;
		}
		var startAddress = $("#pac-input").val().trim();
		sourceAddr = startAddress;
    gl_sourceaddr = startAddress;

		var city = $("#input-trail-city").val().trim();
		var state = $("#input-trail-state").val().trim();
		var location = city + "," + state;
    var gl_state = state;
		var address = location.replace(/ /g, '+');
		var queryUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=" + gglGeoKey;
		$.ajax({url: queryUrl, method: 'GET'}).done(function(response) {
			var lat = response.results[0].geometry.location.lat;
			var lon = response.results[0].geometry.location.lng;
			queryTrailApi(lat, lon, radius, state, sourceAddr);
		 }); console.log(sourceAddr);
	}); //on click search btn
}); //ready

//queryTrail API
//Description: query Trail API and display data into a table
function queryTrailApi(lat, lon, radius, state, sourceAddr) {
	//setup map
  var image = { url:"assets/images/icons/trekking-pink-24.ico",
    size: new google.maps.Size(24,24),
    origin: new google.maps.Point(0,0),
    anchor: new google.maps.Point(10,24) };
  var map = new google.maps.Map(
    document.getElementById('form2-map'), {
    zoom: 10,
          MapTypeId: google.maps.MapTypeId.ROADMAP,
    center: {lat: lat, lng: lon}
  });
	var limit = LIMIT;
	var latlonDest;
	var queryUrl = "https://trailapi-trailapi.p.mashape.com/?limit=" + limit + "&lat=" + lat + "&lon=" + lon + "&radius=" + radius + "&q\[state_cont\]=" + state;
	// EfhnnnowefmshUGxEymg72wQQRblp13wFKzjsnxaA5xcPffFSD
	var headers = {"X-Mashape-Key": "EfhnnnowefmshUGxEymg72wQQRblp13wFKzjsnxaA5xcPffFSD"};
	//Header Prior to 9/6/17
	// var headers = {"X-Mashape-Key": "h484kdqRk8mshMubKo8ocVlMlIerp1sUIoSjsn8W8HlEap2L4I"};
	$.ajax({url: queryUrl, method: 'GET', headers: headers}).done(function(response) {
		console.log(response);
		//store response
		trailResponse = response;
    console.log("The response of PARK API", response);
		$("#trailTable > tbody").html("");
		for (var i=0; i<response.places.length; i++) {
			//skip the park name "fake place". This is placeholder only
			if (response.places[i].name === "Fake Place") {
				continue;
			}
			var activities = "";
			//loop through each item and process to display in table
			for (var j=0; j<response.places[i].activities.length; j++) {
				activities += response.places[i].activities[j].activity_type_name + " ";
			}

      		var idval = "row-"+i ;
      		var trow = $("<tr>");
      		trow.append("<td class='td-name'>" + response.places[i].name + "</td>" +
      		"<td>" + response.places[i].city + "</td>" +
      		"<td>" + response.places[i].state + "</td>" +
      		"<td>" + activities + "</td>" +
      		"<td class='td-transit'>" + transitAvail + "</td>" +
      		"<td class='td-weather'>" + curWeather + "</td>" +
      		"<td class='td-time' style='font-size:12px;'>" + transitTime + "</td>");
      		trow.attr("id", idval);
      		trow.addClass("tr-trail");
      		trow.attr("latval",response.places[i].lat);
      		trow.attr("longval",response.places[i].lon);
      		//for toggling
      		trow.addClass("toggler");
      		trow.attr("data-row", i);
      		$("#tablecontent").append(trow);

      		//add trail info row
      		var trow2 = $("<tr>");
      		trow2.addClass("row" + i);
      		trow2.css("display", "none");
      		//collect trail info
      		var v_placename = response.places[0].name ;
      		var v_description = response.places[i].description ;
      		//var v_acttypname = response.places[i].activities[0].activity_type_name;
      		var v_actname = response.places[i].activities[0].name;
      		var v_actdescr = response.places[i].activities[0].description;
      		if ( v_actname === null )
      		{
      		  v_actname = v_placename;
      		}
      		if ( v_actdescr === null )
      		{
      		  v_actdescr = v_description;
      		}
      		//var detail_link = response.places[i].activities[0].url;
      		//var img_link = response.places[i].activities[0].thumbnail;
      		var trailInfo = `<td colspan='7'class='flow-text hide-on-med-and-down' style='font-size:12px'>${v_actname}<br>${v_actdescr}</td>`;
      		//add 2nd row for trail info
      		trow2.append(trailInfo);
      		$("#tablecontent").append(trow2);
      		//add button row
      		var trow3 = $("<tr>");
      		trow3.addClass("row" + i);
      		trow3.addClass("last-row");
      		trow3.css('border-bottom', '2px solid');
      		trow3.css("display", "none");

			/* Code added by Sangeetha for Weatherresult.html page fetch passing parameters */
      		// Creating a form element and setting attributes for action, method and open in a new page
      		var formele = $("<form>");
      		formele.attr('action','weatherresults.html');
      		formele.attr('method',"GET");
      		formele.attr('target','_blank');
      		// Creating hidden input element to store latitude and adding to the form
      		var inputele_1 = $("<input>");
      		inputele_1.attr('type','hidden');
      		inputele_1.attr('name','v_latitude');
      		inputele_1.attr('value',response.places[i].lat);
      		formele.append(inputele_1);
      		// Creating hidden input element to store longitude and adding to the form
      		var inputele_2 = $("<input>");
      		inputele_2.attr('type','hidden');
      		inputele_2.attr('name','v_longitude');
      		inputele_2.attr('value',response.places[i].lon);
      		formele.append(inputele_2);
      		// Creating hidden input element to store trail name and adding to the form
      		var inputele_3 = $("<input>");
      		inputele_3.attr('type','hidden');
      		inputele_3.attr('name','v_trailname');
      		inputele_3.attr('value',response.places[i].name);
      		formele.append(inputele_3);
      		//Creating submit button and adding it to the form
      		var inputele_4 = $("<input class='sizing'>");
      		inputele_4.attr('type','submit');
      		inputele_4.attr('name','weather_button');
      		inputele_4.val("Trail Weather");
      		inputele_4.addClass("weather-btn btn btn-success btn-sm");
      		formele.append(inputele_4);
      		var buttonTd = $('<td>');
      		buttonTd.attr('colspan', 2);
      		buttonTd.append(formele);
      		trow3.append(buttonTd);
      		/* End of code to fetch weatherresults.html */
      		/* end of sangeetha's code */
      		//add button transit
       		var TransitBtn = $("<button class='sizing'>");
       		TransitBtn.addClass("transit-btn btn btn-success btn-sm");
       		TransitBtn.text("Transit Info");
       		TransitBtn.attr('id',`transit-btn-${i}`);
       		TransitBtn.attr('trail-name', response.places[i].name);
	   		var latlonDest = response.places[i].lat + ',' + response.places[i].lon;
       		TransitBtn.attr('latlon-dest', latlonDest);
       		TransitBtn.attr('source-addr', sourceAddr);
       		console.log(TransitBtn);
       		var buttonTd2 = $('<td>');
       		buttonTd2.attr('colspan', 5);
       		buttonTd2.append(TransitBtn);
       		trow3.append(buttonTd2);
       		$("#tablecontent").append(trow3);

       		console.log("the trow",trow);
			latlonDest = response.places[i].lat + ',' + response.places[i].lon;
			//update transit availability
			if (i<9) {
				setTimeout(getTransitInfo, 100*i, sourceAddr, latlonDest, i, false);
			}
			else if (i<18) {
				setTimeout(getTransitInfo, 500*i, sourceAddr, latlonDest, i, false);
			}
			else if (i<27) {
				setTimeout(getTransitInfo, 700*i, sourceAddr, latlonDest, i, false);
			}
			else {
				setTimeout(getTransitInfo, 800*i, sourceAddr, latlonDest, i, false);
			}

			//update current weather
			callweatherbylatlong(response.places[i].lat, response.places[0].lon, i);
  			//create map with icon marker for each trail
			createMarker(response.places[i], map, image, i);
    	} //for
	}); //ajax
} //queryTrailAPI

//track expaned row, only 1 row expands at a time
var trExpandTracker = -1;
//toggle trigger
$("#tablecontent").on("click",".toggler", function(event) {
	event.preventDefault();
	console.log($(this));
	console.log("click " + trExpandTracker);
	//get row number
	var dataRow = parseInt($(this).attr('data-row'));
	if (dataRow === trExpandTracker) {
		//same row got clicked as last time
		trExpandTracker = -1;
	console.log("same " + trExpandTracker);
	}
	else {
		//different row got clicked, toggle last expanded rows
		$('.row'+ trExpandTracker).toggle();
		//toggle current row
		trExpandTracker = dataRow;
	console.log("other " + trExpandTracker);
	}
	$('.row'+$(this).attr('data-row')).toggle();
	console.log('final' + trExpandTracker);

});


//transit button onclick
$("#tablecontent").on("click",".transit-btn", function(event) {
	event.preventDefault();
    $("#hide2").show();
    window.location = '#form3-map';
	console.log($(this));
   	getTransitInfo($(this).attr('source-Addr'), $(this).attr('latlon-dest'), 0, true);
});

//Figuring out hidding/showing stuff on Submit button click
$("#submit").click(function(){
    $(".hide1").show();
});

//CreateMaker
//create map with markers for each trail
//hover marker will show trail's name
//click on marker show transit info
function createMarker(place, map, img, index) {
	var latlonDest = place.lat + ',' + place.lon;
  	var infowindow = new google.maps.InfoWindow();
  	var marker = new google.maps.Marker({
		position: { lat: place.lat, lng: place.lon},
    	map: map,
		title: place.name,
		icon: img
  	});
  
  	//click event to call transit info
  	google.maps.event.addListener(marker, 'click', function() {
    	$("#hide2").show();
    	infowindow.setContent(place.name);
    	infowindow.open(map, this);
    	//open new tab to do transit search
   	 	getTransitInfo(sourceAddr, latlonDest, 0, true);
   	 	// Show the Transit Map on click
  	});

  	//hover event on marker
  	google.maps.event.addListener(marker, 'mouseover', function() {
  		console.log($(this)[0].myId);
		$('#' + $(this)[0].myId + " td.td-name").css("color","green"); 
		$('#' + $(this)[0].myId ).css("border","2px solid green"); 
  	});

  	//mouseout event on marker
  	google.maps.event.addListener(marker, 'mouseout', function() {
  		console.log($(this)[0].myId);
		$('#' + $(this)[0].myId + " td.td-name").css("color","black"); 
		$('#' + $(this)[0].myId).css("border","0"); 
  	});
  	//add new property to match table row
  	marker.myId = "row-" + index;
}

// show transit info map and direction
function getTransitInfo(sourceAddr, destAddr, index, showMap) {
	console.log(sourceAddr + " " + index);
	console.log(destAddr);
	calcRoute(sourceAddr, destAddr, index, showMap);
}



