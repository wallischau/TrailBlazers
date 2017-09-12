
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
            var description = "<p style='margin-bottom:0px;'>" + response.weather[0].description + "</p>";
            console.log(icon);
            $('#row-' + index + " td.td-weather").html(icon + description);
                console.log("The Current Weather : ", response);
           });
}

function callweather5dayforecast ( v_lat, v_long)
{

  var queryurl = "https:/api.openweathermap.org/data/2.5/forecast?APPID=";
  var apikey = "3d1a8b5789767e359e88b92160cb58fe";
  var param_1 = "&lat="+v_lat+"&lon="+v_long;
  var param_2 = "&units=imperial";
  console.log('In function call for 5day forecast -the query url');
  console.log(queryurl+apikey+param_1+param_2);
  //$("#columnhead").html("");
  //$("#form3-weather").html("");
  $("weatherhead").text("5 Days Weather Forecast");
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
        $("#columnhead").append(`<tr><th></th>
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

                                  //console.log('the index value: '+i +"+"+j+"="+(i+j));
                                  var t1_temp = response.list[i+j].main.temp ;
                                  var t2_desc = response.list[i+j].weather[0].description ;
                                  var t3_ico = response.list[i+j].weather[0].icon ;
                                  var t4_src =  "http://openweathermap.org/img/w/"+t3_ico +".png";
                                  var t5_dxt = response.list[i+j].dt_txt;
                                  var altimg = response.list[i+j].weather[0].main ;
                                //  console.log('The response date : '+t5_dxt);
                                  var t6_dt = t5_dxt.split(" ");
                                  var weatherrow = (`<td><p>${t1_temp}</p>
                                      <img src = ${t4_src} alt = ${altimg}></img>

                                    <p>${t2_desc}</p>`);
                                  rowid.append(weatherrow);
                          }

                   } // end of j
                   $("#weathertablecontent").append(rowid);
           } // end of i

  }); //end of weatherAPI call
}
function callform3disptrail(mylat,mylong,myradius,mystate)
{
        var queryUrl = "https://trailapi-trailapi.p.mashape.com/?limit=1" +
          "&lat=" + mylat + "&lon=" + mylong + "&radius=" + myradius + "&q\[state_cont\]=" + mystate;
        // EfhnnnowefmshUGxEymg72wQQRblp13wFKzjsnxaA5xcPffFSD
        //  var headers = {"X-Mashape-Key": "EfhnnnowefmshUGxEymg72wQQRblp13wFKzjsnxaA5xcPffFSD"};
        var headers = {'X-Mashape-Key': 'Vuj1DDNZGimshFGN9DdyRCTYfZ9sp1KGqo6jsnnmI1xFkvJsgV' };
        //The above is sangeetha's key - to avoid rate limits
        //Header Prior to 9/6/17
        // var headers = {"X-Mashape-Key": "h484kdqRk8mshMubKo8ocVlMlIerp1sUIoSjsn8W8HlEap2L4I"};
        $.ajax({url: queryUrl, method: 'GET', headers: headers}).done(function(response) {
          console.log('The Park API call to display');
          console.log(response);
          //store response
              //var v_city = response.places[0].city ;
              //var v_state = response.places[0].state;
              var v_activities = response.places[0].activities ;
              var v_actlength = v_activities.length;
              var v_placename = response.places[0].name ;
              var v_description = response.places[0].description ;
              $("#parkinfohead").text(`${v_placename}`);

              for ( var i =0; i< v_actlength; i++)
              {
                   var v_acttypname = response.places[0].activities[i].activity_type_name;
                   var v_actname = response.places[0].activities[i].name;
                   var v_actdescr = response.places[0].activities[i].description ;
                   var detail_link = response.places[0].activities[i].url;
                   var img_link = response.places[0].activities[i].thumbnail;
                   var v_rating = response.places[0].activities[i].rating;

                   console.log("inside for park");
                   console.log("v_acttypname",v_acttypname);
                   console.log("v_actname", v_actname);
                   console.log("v_actdescr",v_actdescr);
                   console.log("detail_link",detail_link);
                   console.log("img_link",img_link);
                   console.log("rating",v_rating);
                   if ( v_actname === null )
                   {
                     v_actname = v_placename;
                   }
                   if ( v_actdescr === null )
                   {
                     v_actdescr = v_description;
                   }
                   if (img_link != null )
                   {
                           var trtbrow1 = $("<tr>");
                            var addtrailinfo1 = (`
                              <th>Trail :${v_actname}</th>
                              <th>Activity :${v_acttypname}</th>
                               <th>Rating : ${v_rating}</th>`);
                            trtbrow1.append(addtrailinfo1);

                            var trtbrow2 = $("<tr>");
                             var addtrailinfo2 =(`
                              <tr><th><img src = "${img_link}" height = 200 width = 200></img></th>
                                   <th>${v_actdescr}</th>`);
                             trtbrow2.append(addtrailinfo2);

                            var trtbrow3 = $("<tr>");
                            var addtrailinfo3 =(`
                              <tr><a href ="${detail_link}">For more Information</a></th></tr>
                                   `);
                             trtbrow3.append(addtrailinfo3);
                             console.log("in image link");
                    }
                    else {
                              var trtbrow1 = $("<tr>");
                               var addtrailinfo1 = (`
                                 <th>${v_actname}</th>
                                      <th>Activity : +${v_acttypname}</th>
                                      <th>Rating : +${v_rating}</th>`);
                              trtbrow1.append(addtrailinfo1);
                               var trtbrow2 = $("<tr>");
                                var addtrailinfo2 =(`
                                      <th>${v_actdescr}</th>`);
                                trtbrow2.append(addtrailinfo2);

                               var trtbrow3 = $("<tr>");
                               var addtrailinfo3 =(`
                                 <tr><a href ="${detail_link}">For more Information</a></th></tr>
                                      `);
                                trtbrow3.append(addtrailinfo3);

                    } // end of if
                    $("#form3-trail-content").append(trtbrow1);
                    $("#form3-trail-content").append(trtbrow2);
                    $("#form3-trail-content").append(trtbrow3);

              }  // end of for

        });
}
