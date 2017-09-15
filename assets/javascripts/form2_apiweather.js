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

/*
function callweather5dayforecast ( v_lat, v_long)
{

  var queryurl = "https:/api.openweathermap.org/data/2.5/forecast?APPID=";
  var apikey = "3d1a8b5789767e359e88b92160cb58fe";
  var param_1 = "&lat="+v_lat+"&lon="+v_long;
  var param_2 = "&units=imperial";
  console.log('In function call for 5day forecast -the query url');
  console.log(queryurl+apikey+param_1+param_2);

  $.ajax({
    url: queryurl+apikey+param_1+param_2,
    method:"GET"
  }).done(function(response)
  {
        console.log("The Weather API 5 day forecast- by lat & long REsponse",response);
        $("#columnhead").append(`<th>Date</th>
                        <th>00:00:00</th>
                        <th>03:00:00</th>
                        <th>06:00:00</th>
                        <th>09:00:00</th>
                        <th>12:00:00</th>
                        <th>15:00:00</th>
                        <th>18:00:00</th>

                        `);
        $("#columnhead").append(`<tr><th>  <img src = "./assets/images/weather.jpg" height = 80 width = 80></img></th>
                          <th><img src = "./assets/images/degF.png" height = 50 width = 50></img></th>
                            <th><img src = "./assets/images/degF.png" height = 50 width = 50></img></th>
                              <th><img src = "./assets/images/degF.png" height = 50 width = 50></img></th>
                                <th><img src = "./assets/images/degF.png" height = 50 width = 50></img></th>
                                  <th><img src = "./assets/images/degF.png" height = 50 width = 50></img></th>
                                   <th><img src = "./assets/images/degF.png" height = 50 width = 50></img></th>
                                     <th><img src = "./assets/images/degF.png" height = 50 width = 50></img></th>
                                      </tr>
                                        `);
         for( var i =0; i < (response.cnt) ; i = i+7)
         {
                  var rowid = $('<tr>');
                  var thedate = response.list[i].dt_txt;
                  var  datefor = thedate.substr(0,10);
                  var adddate = (`<td>${datefor}</td>`);
                  rowid.append(adddate);
                  console.log('the date : '+thedate);

                  for(var j =0 ; (j < 7); j++)
                  {
                          if ( (i+j) < response.cnt)
                          {

                                  console.log('the index value: '+i +"+"+j+"="+(i+j));
                                  var t1_temp = response.list[i+j].main.temp ;
                                  var t2_desc = response.list[i+j].weather[0].description ;
                                  var t3_ico = response.list[i+j].weather[0].icon ;
                                  var t4_src =  "http://openweathermap.org/img/w/"+t3_ico +".png";
                                  var t5_dxt = response.list[i+j].dt_txt;
                                  var altimg = response.list[i+j].weather[0].main ;
                                  console.log('The response date : '+t5_dxt);
                                  var t6_dt = t5_dxt.split(" ");
                                  //console.log( "t1_temp : "+t1_temp);
                                  //console.log( "t2_desc : "+t2_desc);
                                //  console.log( "t3_ico : "+t3_ico);
                                  //console.log( "t4_src : "+t4_src);
                                  var weatherrow = (`<td><p>${t1_temp}</p>
                                      <img src = ${t4_src} alt = ${altimg}></img>

                                    <p>${t2_desc}</p>`);
                                  rowid.append(weatherrow);
                          }

                   } // end of j
                   $("#weathertablecontent").append(rowid);
           } // end of i

  }); //end of API call
} */