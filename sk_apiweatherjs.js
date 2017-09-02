  //global Variables
function callweatherbycityid (cid)
{
                  var queryurl = "https:/api.openweathermap.org/data/2.5/forecast?APPID=";
                  var apikey = "39e91c48d1b4f937beac8b5748619871";
                  var param_1 = "&id="+cid;
                  console.log('In function call by cityid');
                  $.ajax({
                    url: queryurl+apikey+param_1,
                    method:"GET"
                  }).done(function(response){
                              console.log("The Weather API- by cityid REsponse",response);
                              var len = response.list.length;
                              $("#total1").text(len);

                              console.log("Total elements:",len);
                                  for (var i = 0; i< len ; i++)
                                  {


                                        var addrowitem = (
                                          `<tr>
                                               <th>${response.list[i].dt_txt}</th>
                                               <th>${response.list[i].weather[0].description}</th>
                                                <th>${response.list[i].weather[0].icon}</th>
                                               <th>${response.list[i].main.temp}</th>
                                               <th>${response.list[i].wind.speed}</th>
                                               <th>${response.list[i].wind.deg}</th>
                                           </tr>`
                                        );
                                        $("#details1").append(addrowitem);

                                    }
                  });
}
function callweatherbyzipcode(zcode)
{
                  var queryurl = "https:/api.openweathermap.org/data/2.5/weather?APPID=";
                  var apikey = "3d1a8b5789767e359e88b92160cb58fe";
                  var param_1 = "&zip="+zcode;
                  console.log('In function call by zipcode');
                  $.ajax({
                    url: queryurl+apikey+param_1,
                    method:"GET"
                  }).done(function(response){
                              console.log("The Weather API - By Zipcode Response",response);
                              var citydata = (`
                                <tr>
                                      <th>${response.name}</th>
                                      <th>${response.sys.country}</th>
                                     <th>${response.coord.lon}</th>
                                     <th>${response.coord.lat}</th>
                                      <th>${response.coord.lat}</th>
                                 </tr>
                               `);
                              $("#total2").append(citydata);



                                        var addrowitem = (
                                          `<tr>

                                               <th>${response.main.temp}</th>
                                               <th>${response.main.temp}</th>
                                               <th>${response.weather[0].main}</th>
                                               <th>${response.weather[0].icon}</th>
                                               <th>${response.wind.speed}</th>
                                               <th>${response.wind.deg}</th>
                                           </tr>`
                                        );
                                        $("#details2").append(addrowitem);


                  });
}

function callweatherbylatlong(v_lat,v_long)
{
                  var queryurl = "https:/api.openweathermap.org/data/2.5/weather?APPID=";
                  var apikey = "3d1a8b5789767e359e88b92160cb58fe";
                  var param_1 = "&lat="+v_lat+"&lon="+v_long;
                  console.log('In function call by lat & long');
                  $.ajax({
                    url: queryurl+apikey+param_1,
                    method:"GET"
                  }).done(function(response){
                              console.log("The Weather API - by lat & long REsponse",response);
                           var itemdetail = (`
                              <tr>
                                  <td>${response.name}</td>
                                  <td>${response.sys.country}</td>
                                  <td>${response.coord.lon}</td>
                                  <td>${response.coord.lat}</td>
                                  <td> </td>
                              </tr>
                             `)
                              $("#total3").append(itemdetail);

                                        var addrowitem = (
                                          `<tr>
                                               <td>${response.main.temp}</td>
                                               <td>${response.weather[0].main}</td>
                                               <td>${response.weather[0].description}</td>
                                               <td>${response.weather[0].icon}</td>
                                               <td>${response.wind.speed}</td>
                                               <td>${response.wind.deg}</td>

                                           </tr>`);

                                        $("#details3").append(addrowitem);
                  });
}
console.log('In JS file-');
console.log('before function call city id');
callweatherbycityid(2172797);
console.log('before function call by zipcode');
callweatherbyzipcode(80016);
console.log('lat long function call');
callweatherbylatlong(35,139);
/*
var qurl1 = "http://api.openweatresponse.list[i].main.temp_maxhermap.org/pollution/v1/co/0.0,10.0/2016-03-01Z.json?appid={39e91c48d1b4f937beac8b5748619871} 1 digit (~78km) ";
console.log('min temperature',

var qurl2 = "http://api.openweathermap.org/pollution/v1/co/0.0,10.0/current.json?appid={39e91c48d1b4f937beac8b5748619871}" ;
$.ajax({
  url: qurl2,
  method:"GET"
}).done(function(response){
  console.log("The Weather API REsponse",response);

});
*/
