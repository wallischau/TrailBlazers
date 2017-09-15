/*Code Author: Sangeetha
  Purpose: To fetch parameters from trailblazers.html and use it to display forecast
  from Weather API */

/* the Following code waits for the HTML document and evaluates the url and identifies the 3 inputs*/
$(document).ready(function() {
       /* Code for extracting the input parameters from the url */
        var parameters = window.location.search.substring(1).split("&");
        var p1 = parameters[0].split("=");
        var p2 = parameters[1].split("=");
        var p3 = parameters[2].split("=");
        var para_1 = unescape(p1[1])
        var para_2 = unescape(p2[1]);
        var para_3 = unescape(p3[1]);
        var pr_1 = para_1.substr(0,para_1.length-1);
        var pr_2 = para_2.substr(0,para_2.length-1);
        var pr_3 = para_3.substr(0,para_3.length);

        var trailname = "";
        var trname = pr_3.split('+');
        for ( var i =0; i<trname.length;i++)
        {
          trailname = trailname+" "+trname[i];
        }

      /* Call to Weather API using the right parameters*/
      callweather(pr_1,pr_2,trailname);

});

//Display weather forecast.
function callweather( v_lat, v_long,v_name)
{

                    var queryurl = "https://api.openweathermap.org/data/2.5/forecast?APPID=";
                    var apikey = "3d1a8b5789767e359e88b92160cb58fe";
                    var param_1 = "&lat="+v_lat+"&lon="+v_long;
                    var param_2 = "&units=imperial";
                    var counter = 1;

                    console.log(queryurl+apikey+param_1+param_2);

                    $("#weatherheading").text(v_name);

                    $.ajax({
                      url: queryurl+apikey+param_1+param_2,
                      method:"GET"
                    }).done(function(response)
                    {
                          $("#weathertablecontent").html("");
                          console.log("The Weather API 5 day forecast- by lat & long REsponse",response);
                          var t1_temp;
                          var t2_desc;
                          var t3_ico;
                          var t4_src;
                          var altimg;
                          var weatherrow;
                          var ondate = (response.list[0].dt_txt).substr(0,10);
                          var dispdate = ondate.split("-");
                          var dtdisp = dispdate[1]+"/"+(dispdate[2]);
                          weatherrow = (`<td>${dtdisp}</td>`);
                          var rowid = $('<tr>');
                          var count = 0;

                           for( var i =0; i < (response.cnt) ; i++)
                           {
                                    var thedate = response.list[i].dt_txt;
                                    var  date_time = thedate.split(" ");

                                    if (ondate.trim() === date_time[0].trim())
                                    {

                                      if ( date_time[1].trim() === "06:00:00")
                                      {
                                         t1_temp = parseInt(response.list[i].main.temp) ;
                                         t2_desc = response.list[i].weather[0].description ;
                                         t3_ico = response.list[i].weather[0].icon ;
                                         t4_src =  "http://openweathermap.org/img/w/"+t3_ico +".png";
                                         altimg = response.list[i].weather[0].main ;
                                         weatherrow = weatherrow+(`<td style = 'padding:0;margin:0'><p style='lineheight:0.7;margin:0'>${t1_temp}</p>
                                             <img style='lineheight:0.7;margin:0' src = ${t4_src} class="material-icons" alt = ${altimg}></img>
                                           <p style='lineheight:0.7;margin:0'>${t2_desc}</p><td>`);


                                           count++;
                                      }
                                      else if (date_time[1].trim() === "09:00:00")
                                       {
                                         t1_temp = parseInt(response.list[i].main.temp) ;
                                         t2_desc = response.list[i].weather[0].description ;
                                         t3_ico = response.list[i].weather[0].icon ;
                                         t4_src =  "http://openweathermap.org/img/w/"+t3_ico +".png";
                                         altimg = response.list[i].weather[0].main ;
                                         weatherrow = weatherrow+(`<td style = 'padding:0;margin:0'><p style='lineheight:0.7;margin:0'>${t1_temp}</p>
                                             <img style='lineheight:0.7;margin:0' src = ${t4_src} class="material-icons" alt = ${altimg}></img>
                                           <p style='lineheight:0.7;margin:0'>${t2_desc}</p><td>`);
                                           count++;
                                      }
                                      else if (date_time[1].trim() === "12:00:00")
                                      {
                                        t1_temp = parseInt(response.list[i].main.temp) ;
                                        t2_desc = response.list[i].weather[0].description ;
                                        t3_ico = response.list[i].weather[0].icon ;
                                        t4_src =  "http://openweathermap.org/img/w/"+t3_ico +".png";
                                        altimg = response.list[i].weather[0].main ;
                                        weatherrow = weatherrow+(`<td style = 'padding:0;margin:0'><p style='lineheight:0.7;margin:0'>${t1_temp}</p>
                                            <img style='lineheight:0.7;margin:0' src = ${t4_src} class="material-icons" alt = ${altimg}></img>
                                          <p style='lineheight:0.7;margin:0'>${t2_desc}</p><td>`);
                                          count++;
                                      }

                                    else if (date_time[1].trim() === "15:00:00")
                                      {
                                              t1_temp = parseInt(response.list[i].main.temp) ;
                                              t2_desc = response.list[i].weather[0].description ;
                                              t3_ico = response.list[i].weather[0].icon ;
                                              t4_src =  "http://openweathermap.org/img/w/"+t3_ico +".png";
                                              altimg = response.list[i].weather[0].main ;
                                              weatherrow = weatherrow+(`<td style = 'padding:0px;margin:0'><p style='lineheight:0.7;margin:0'>${t1_temp}</p>
                                                  <img style='lineheight:0.7;margin:0' src = ${t4_src} class="material-icons" alt = ${altimg}></img>
                                                <p style='lineheight:0.7;margin:0'>${t2_desc}</p><td>`);
                                                count++;
                                      }
                                      else if (date_time[1].trim() === "18:00:00")
                                      {
                                            t1_temp = parseInt(response.list[i].main.temp) ;
                                            t2_desc = response.list[i].weather[0].description ;
                                            t3_ico = response.list[i].weather[0].icon ;
                                            t4_src =  "http://openweathermap.org/img/w/"+t3_ico +".png";
                                            altimg = response.list[i].weather[0].main ;
                                            weatherrow = weatherrow+(`<td style = 'padding:0px'><p style='lineheight:0.7;margin:0;'>${t1_temp}</p>
                                                <img style='lineheight:0.7;margin:0' src = ${t4_src} class="material-icons" alt = ${altimg}></img>
                                              <p style='lineheight:0.7;margin:0'>${t2_desc}</p><td>`);
                                              rowid.append(`${weatherrow}`);
                                              count++;
                                              if ( count === 5)
                                              {
                                                $("#weathertablecontent").append(rowid);
                                              }
                                        }
                                    }
                                    else {
                                        ondate  = (response.list[i].dt_txt).substr(0,10);
                                        dispdate = ondate.split("-");
                                        dtdisp = dispdate[1]+"/"+(dispdate[2]);
                                        weatherrow = (`<td>${dtdisp}</td>`);
                                        var rowid = $('<tr>');
                                        count = 0;
                                       }

                               } // end of i

      }); //end of weatherAPI call
}

//diplay current weather icon on the form2 (Walli to copy paste weather related API call programs for form2)
function callweatherbylatlong(v_lat,v_long, index)
{
          var queryurl = "https://api.openweathermap.org/data/2.5/weather?APPID=";
          var apikey = "3d1a8b5789767e359e88b92160cb58fe";
          var param_1 = "&lat="+v_lat+"&lon="+v_long;
          var param_2 = "&units=imperial";

          $.ajax({
            url: queryurl+apikey+param_1+param_2,
            method:"GET"
          }).done(function(response)
          {
            var icon = "<img src=https://openweathermap.org/img/w/" + response.weather[0].icon + ".png>";
            var description = "<p style='margin-bottom:0px;'>" + response.weather[0].description + "</p>";

            $('#row-' + index + " td.td-weather").html(icon + description);
                console.log("The Current Weather : ", response);
           });
}
