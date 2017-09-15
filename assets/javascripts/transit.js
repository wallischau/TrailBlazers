/* trailsearch.js                                                         */
/* Description: trail search engines                                      */
/* Date: 9/1/2017                                                         */
/* Author: Wallis Chau, Sangeetha Kaliaperumal, Ed Quintana, Kelly Wenzel */


//calculate route
//source could be address or coord pair e.g. (lat,lon)
function calcRoute(source, dest, index, boolShowMap) {
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

  directionsService.route(request, function(response, status ) {
    //don't show map
    if (!boolShowMap) {
      // console.log(response);
      console.log(status + " " + index);
      //update td-transit
      if (status == google.maps.DirectionsStatus.OK) {
          $('#row-' + index + " td.td-transit").html('YES');
          $('#row-' + index + " td.td-time").html(response.routes[0].legs[0].duration.text);
          console.log(response.routes[0].legs[0].duration);
      }
      else if (status != "OVER_QUERY_LIMIT") {
          $('#row-' + index + " td.td-transit").html('NO');
          $('#row-' + index + " td.td-time").html("N/A");
          console.error('DirectionsStatus is ' + status);
      }
      //over query limit
      else {
        console.log(index + " " + status);
      }
    } //if !boolShowMap
    //show map
    else {
      console.log('here2');
      if (status == google.maps.DirectionsStatus.OK) {
        console.log(response);
        directionsDisplay.setDirections(response);
        writeDirectionsSteps(directionsDisplay.directions.routes[0].legs[0].steps);
      }
      else {
        console.error('DirectionsStatus is ' + status);
      }
    } //else
  });  //route
}//calroute

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


