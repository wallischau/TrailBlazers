
$(document).ready(function() {

	$('#trail').on('click', '.search-btn', function(event) {
		event.preventDefault(); 
		
		var limit = "50";
		var state = $("#input-trail-state").val();
		var radius = $("#input-trail-radius").val();
		var city = $("#input-trail-city").val();
		var queryUrl = "https://trailapi-trailapi.p.mashape.com/?limit=" + limit + "&q[state_cont]="+ state + "&radius="+ radius +"&q[city_cont]=" + city;
		var headers = {"X-Mashape-Key": "h484kdqRk8mshMubKo8ocVlMlIerp1sUIoSjsn8W8HlEap2L4I"};

		$.ajax({url: queryUrl, method: 'GET', headers: headers})
	            .done(function(response) {
	                console.log(response);
	            });

	}); //submit onclick

}); //ready
