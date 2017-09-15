/* form2_apiweather.js                                                         */
/* Description: trail search engines                                      */
/* Date: 9/1/2017                                                         */
/* Author: Wallis Chau, Sangeetha Kaliaperumal, Ed Quintana, Kelly Wenzel */

//diplay current weather icon on the form2
function callweatherbylatlong(v_lat,v_long, index)
{
  var queryurl = "https://api.openweathermap.org/data/2.5/weather?APPID=";
  var apikey = "3d1a8b5789767e359e88b92160cb58fe";
  var param_1 = "&lat="+v_lat+"&lon="+v_long;
  var param_2 = "&units=imperial";
  // console.log('In function call by lat & long');
  // console.log(queryurl+apikey+param_1+param_2);

  $.ajax({
    url: queryurl+apikey+param_1+param_2,
    method:"GET"
  }).done(function(response)
  {
    var icon = "<img src=https://openweathermap.org/img/w/" + response.weather[0].icon + ".png>";
    var description = "<p style='margin-bottom:0px; line-height:0.7; font-size:10px;'>" + response.weather[0].description + "</p>";
    console.log(icon);
    $('#row-' + index + " td.td-weather").html(icon + description);
        console.log("The Current Weather : ", response);


   });
}

