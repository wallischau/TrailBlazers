//$(document).ready(function() {
/*console.log($('#map')[0]);
console.log(document.getElementById('map'));

var userInputFrom;
var userInputTo;
$('#submit').on("click", function(event) {
	event.preventDefault();
	userInputFrom = $('#input-text').val().trim();
	userInputTo = $('#input-text-to').val().trim();
	console.log(userInputFrom);
	calcRoute(userInputFrom, userInputTo);
});
*/

//calculate route
//source could be address or coord pair e.g. (lat,lon)
function calcRoute(source, dest) {
  var directionsService = new google.maps.DirectionsService();
  var directionsDisplay = new google.maps.DirectionsRenderer();
  var map = new google.maps.Map(document.getElementById('form3-map'), {
    zoom: 7,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  });
  directionsDisplay.setMap(map);
  var request = {
    origin: source,
    destination: dest,
    travelMode: google.maps.DirectionsTravelMode.TRANSIT,
  };
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      console.log(response);
      directionsDisplay.setDirections(response);
      writeDirectionsSteps(directionsDisplay.directions.routes[0].legs[0].steps);
    }
    else {
      console.error('DirectionsStatus is ' + status);
    }
  });
  // $('#back-btn').css('visibility', 'visible');
}

function writeDirectionsSteps(steps) {
  var directions = $('#form3-panel');
  directions.html('');
  for (var i = 0; i < steps.length; i++) {
    directions.append('<br/><br/>' + steps[i].instructions + '<br/>' + steps[i].distance.text);
    if (typeof steps[i].transit !== "undefined") {
      directions.append('<br/>' + steps[i].transit.arrival_stop.name);
    }
  }
}	






//});