
$(document).ready(function() {

var userInputAddr;
var userInputRadius;
var userInputAddrNoSpace;
const KEY = "AIzaSyCMmYZlGfP_9f2Prq5sCqvSfpp5D3s7EoU";
var queryURL;
var lng;
var lat;

$('#park').on('click', '.search-btn', function(event) {
	event.preventDefault(); 
	userInputAddr = $('#input-text-addr').val().trim();
	userInputRadius = parseInt($('#input-text-radius').val());
	userInputAddrNoSpace = userInputAddr.replace(/ /g, '+');
	console.log(userInputAddr);
	console.log(userInputRadius);

	queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + userInputAddrNoSpace + "&key=" + KEY;
	console.log(queryURL);
	$.ajax( {url: queryURL,
			method: 'GET'
			}).done(function(response) {
				// console.log(response);
				lng = response.results[0].geometry.location.lng;
				lat = response.results[0].geometry.location.lat;
				// console.log(lat + " " + lng);
				initMap();	
			});

}); //submit onclick

// function searchPlaces() {
	// queryURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?&location=" + lat + "," + lng + "&radius=" + userInputRadius*1000 + "&type=park&library=places&key=" + KEY ;
	// console.log(queryURL);
	// $.ajax( {url: queryURL,
	// 		method: 'GET'
	// 	}).done(function(response) {
	// 		console.log(response);
	// 	});

// }	

// query for park and display map -------start
var map;
var infowindow;

function initMap() {
  var coord = {lat: lat, lng: lng};
  // console.log(coord);

  map = new google.maps.Map(document.getElementById('map'), {
    center: coord,
    zoom: 13 
  });

  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: coord,
    radius: userInputRadius * 1000,
    type: ['park']
  }, callback);
}

function callback(results, status) {
  console.log(results);
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
      createList(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
    //open new tab to do transit search
    getTransitInfo(userInputAddr, place.vicinity );

  });
}
// query for park and display map -------end


//show park details in left panel
function createList(place) {
	var newDiv = $('<div>');
	newDiv.html(place.name);
	newDiv.attr('id', place.id);
	newDiv.addClass('park-info');
	// console.log(newDiv);
	$('#panel').append(newDiv);
	var newDiv2 = $('<div>');
	newDiv2.html(place.vicinity);
	newDiv2.addClass('park-addr');
	newDiv2.css('margin-bottom', '12px');
	$('#panel').append(newDiv2);

}

function getTransitInfo(sourceAddr, destAddr) {
	console.log(sourceAddr);
	console.log(destAddr);
	calcRoute(sourceAddr, destAddr);
	// var win=window.open("transitsearch.html", '_blank');

}






}); //ready
