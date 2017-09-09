

const gglGeoKey = "AIzaSyCMmYZlGfP_9f2Prq5sCqvSfpp5D3s7EoU";
const LIMIT = 50;
var sourceAddr = "";

$(document).ready(function() {

	$('#trailForm').on('click', '.search-btn', function(event) {
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
		var startAddress = $("#input-trail-address").val().trim();
		sourceAddr = startAddress;
		var city = $("#input-trail-city").val().trim();
		var state = $("#input-trail-state").val().trim();
		var location = city + "," + state;
		var address = location.replace(/ /g, '+');
		var queryUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=" + gglGeoKey;
		$.ajax({url: queryUrl, method: 'GET'}).done(function(response) {
			var lat = response.results[0].geometry.location.lat;
			var lon = response.results[0].geometry.location.lng;
			queryTrailApi(lat, lon, radius, city);

		}); console.log(sourceAddr);
	}); //on click search btn
}); //ready
		
function queryTrailApi(lat, lon, radius, city) {
	//setup map
	var image = { url:"assets/images/icons/trekking-pink-24.ico", 
		size: new google.maps.Size(24,24), 
		origin: new google.maps.Point(0,0),
		anchor: new google.maps.Point(10,24) };
	var map = new google.maps.Map(
		document.getElementById('map'), {
		zoom: 10,
          MapTypeId: google.maps.MapTypeId.ROADMAP,
		center: {lat: lat, lng: lon}
	});
	var limit = LIMIT;
	var queryUrl = "https://trailapi-trailapi.p.mashape.com/?limit=" + limit + "&lat=" + lat + "&lon=" + lon + "&radius=" + radius + "&q\[city_cont\]=" + city;
	// EfhnnnowefmshUGxEymg72wQQRblp13wFKzjsnxaA5xcPffFSD
	var headers = {"X-Mashape-Key": "EfhnnnowefmshUGxEymg72wQQRblp13wFKzjsnxaA5xcPffFSD"};
	//Header Prior to 9/6/17
	// var headers = {"X-Mashape-Key": "h484kdqRk8mshMubKo8ocVlMlIerp1sUIoSjsn8W8HlEap2L4I"};
	$.ajax({url: queryUrl, method: 'GET', headers: headers}).done(function(response) {
		console.log(response);
		$("#trailTable > tbody").html("");
		for (i=0; i<response.places.length; i++) {
			var activities = "";
			for (j=0; j<response.places[i].activities.length; j++) {
				activities += response.places[i].activities[j].activity_type_name + " ";
			}

			$("#trailTable > tbody").append("<tr><td>" + response.places[i].name + "</td><td>" + response.places[i].city + "</td><td>" +
				response.places[i].state + "</td><td>" + activities + "</td></tr>");
			//create map with icon marker for each trail
			createMarker(response.places[i], map, image);
	
    	} //for
	}); //ajax
} //queryTrailAPI

//create map with markers for each trail
//hover marker will show trail's name
//click on marker show transit info
function createMarker(place, map, img) {
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
    	infowindow.setContent(place.name);
    	infowindow.open(map, this);
    	//open new tab to do transit search
   	 	getTransitInfo(sourceAddr, latlonDest);
  	});
}

// show transit info map and direction
function getTransitInfo(sourceAddr, destAddr) {
	console.log(sourceAddr);
	console.log(destAddr);
	calcRoute(sourceAddr, destAddr);
}