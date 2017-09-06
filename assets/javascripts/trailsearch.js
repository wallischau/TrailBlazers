
const gglGeoKey = "AIzaSyCMmYZlGfP_9f2Prq5sCqvSfpp5D3s7EoU";

$(document).ready(function() {

	$('#trailForm').on('click', '.search-btn', function(event) {
		event.preventDefault(); 

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
		var city = $("#input-trail-city").val();
		var state = $("#input-trail-state").val();
		var location = city + "," + state;
		var address = location.replace(/ /g, '+');
		var queryUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=" + gglGeoKey;
		$.ajax({url: queryUrl, method: 'GET'}).done(function(response) {
			var lat = response.results[0].geometry.location.lat;
			var lon = response.results[0].geometry.location.lng;
			queryTrailApi(lat, lon, radius, city);
		});
	});
});
		
// var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
function queryTrailApi(lat, lon, radius, city) {
	//setup map
	var image = { url:"assets/images/icons/trekking-pink-24.ico", 
		size: new google.maps.Size(24,24), 
		origin: new google.maps.Point(0,0),
		anchor: new google.maps.Point(10,24) };
	var map = new google.maps.Map(
		document.getElementById('map'), {
		zoom: 11,
          MapTypeId: google.maps.MapTypeId.ROADMAP,
		center: {lat: lat, lng: lon}
	});
	var limit = 50;
	var queryUrl = "https://trailapi-trailapi.p.mashape.com/?limit=" + limit + "&lat=" + lat + "&lon=" + lon + "&radius=" + radius + "&q[city_cont]=" + city;
	var headers = {"X-Mashape-Key": "h484kdqRk8mshMubKo8ocVlMlIerp1sUIoSjsn8W8HlEap2L4I"};
	$.ajax({url: queryUrl, method: 'GET', headers: headers}).done(function(response) {
		$("#trailTable > tbody").html("");
		for (i=0; i<response.places.length; i++) {
			var activities = "";
			for (j=0; j<response.places[i].activities.length; j++) {
				activities += response.places[i].activities[j].activity_type_name + " ";
			}

			$("#trailTable > tbody").append("<tr><td>" + response.places[i].name + "</td><td>" + response.places[i].city + "</td><td>" +
				response.places[i].state + "</td><td>" + activities + "</td></tr>");
			var marker = new google.maps.Marker({
				position: { lat: response.places[i].lat, lng: response.places[i].lon},
				map:map,
				title: response.places[i].name,
				icon: image
		});
	
    	}
	}); 
}
