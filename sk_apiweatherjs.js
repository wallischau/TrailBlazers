//global Variables
var queryurl = "https:/api.openweathermap.org/data/2.5/forecast?APPID=";
var apikey = "39e91c48d1b4f937beac8b5748619871";
var param_1 = "&id=524901"
$.ajax({
  url: queryurl+apikey+param_1,
  method:"GET"
}).done(function(response){
  console.log("The Weather API REsponse",response);
  var len = response.list.length;
  $("#total").text(len);

  console.log("Total elements:",len)
  for(var i = 0; i< len ; i++)
  {
  /*  var dyrow = $("<tr>");
    var dycol1 = $("<th>");
    var dycol2 = $("<th>");
    var dycol3 = $("<th>");
    var dycol4 = $("<th>");
    $("#dycol1").append(`<br/> `);
    $("#dycol2").append(` `);
    $("#dycol3").append(` `);
    $("#dycol4").append(``); */
    var addrowitem = (
      `<tr>
           <th>${response.list[i].clouds.dt_txt}</th>
           <th>${response.list[i].weather}</th>
           <th>${response.list[i].weather.temp_main}</th>
           <th>${response.list[i].weather.temp_min}</th>
       </tr>`
    )
    $("#details").append(addrowitem);
  }
});
/*
var qurl1 = "http://api.openweathermap.org/pollution/v1/co/0.0,10.0/2016-03-01Z.json?appid={39e91c48d1b4f937beac8b5748619871} 1 digit (~78km) "

var qurl2 = "http://api.openweathermap.org/pollution/v1/co/0.0,10.0/current.json?appid={39e91c48d1b4f937beac8b5748619871}" ;
$.ajax({
  url: qurl2,
  method:"GET"
}).done(function(response){
  console.log("The Weather API REsponse",response);

});
*/
