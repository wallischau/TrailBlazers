
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

/*function sleep(miliseconds) {
    var currentTime = new Date().getTime();
    while (currentTime + miliseconds >= new Date().getTime()) {
    }
}*/

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

       //trow.attr("link",response.places[i].activities[])

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
       var trailInfo = `<td colspan='7'>${v_actdescr}</td>`;
       //add 2nd row for trail info
       trow2.append(trailInfo);
       $("#tablecontent").append(trow2);
       //add button row
       var trow3 = $("<tr>");
       trow3.addClass("row" + i);
       trow3.addClass("last-row");
       trow3.css('border-bottom', '2px solid');
       trow3.css("display", "none");
       //add button weather
       var weatherBtn = $("<button>");
       weatherBtn.addClass("weather-btn");
       weatherBtn.text("Weather");
       weatherBtn.attr('id',`weather-btn-${i}`);
       weatherBtn.attr('trail-name', response.places[i].name);
       weatherBtn.attr('lat', response.places[i].lat);
       weatherBtn.attr('lon', response.places[i].lon);
       console.log(weatherBtn);
       var buttonTd = $('<td>');
       buttonTd.attr('colspan', 2);
       buttonTd.append(weatherBtn);
       trow3.append(buttonTd);
       //add button transit
       var TransitBtn = $("<button>");
       TransitBtn.addClass("transit-btn");
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

});

//weather button onclick
$("#tablecontent").on("click",".weather-btn", function(event) {
	event.preventDefault();
	console.log($(this));
//	callweather5dayforecast($(this).attr('lat'),$(this).attr('lon'),$(this).attr('trail-name'));
	callweather5dayforecast($(this).attr('lat'),$(this).attr('lon'));
});

//transit button onclick
$("#tablecontent").on("click",".transit-btn", function(event) {
	event.preventDefault();
    $("#hide2").show();
	console.log($(this));
   	getTransitInfo($(this).attr('source-Addr'), $(this).attr('latlon-dest'), 0, true);
});

//Figuring out hidding/showing stuff on Submit button click
$("#submit").click(function(){
    $(".hide1").show();
});
 
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



