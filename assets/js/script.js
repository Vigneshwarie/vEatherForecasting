var requestLocationLatLongUrl = 'https://api.api-ninjas.com/v1/geocoding';

var weatherUrl = "http://api.openweathermap.org/data/2.5/forecast";

var vLatitudeLongitude_API_KEY = "VvjL07GIM+tjq1AaTRH46Q==SCecnrlco9Gox1FX";
var vWeather_API_KEY = "c36758574d57eccdb423116f200c9c41";
var cityName;
var latitude;
var longitude;

var cityNameDisplay = document.getElementById("cityNameDisplay");
var today = dayjs().format('YYYY-MM-DD');

// Data is nested in multifolds. Tried few other ways. Im wasting time, so going with day wise. Formatting is not working in single line. 
var requestDate = dayjs(today);
var day1 = requestDate.add(1, "day");
var day2 = requestDate.add(2, "day");
var day3 = requestDate.add(3, "day");
var day4 = requestDate.add(4, "day");
var day5 = requestDate.add(5, "day");

day1 = day1.format('YYYY-MM-DD');
day2 = day2.format('YYYY-MM-DD');
day3 = day3.format('YYYY-MM-DD');
day4 = day4.format('YYYY-MM-DD');
day5 = day5.format('YYYY-MM-DD');

//console.log(today + "==" + day1);





$("#searchButton").on('click', function () {  
     cityName = $("input[name=cityDataList]").val();
     if (cityName !== "") {
          console.log(cityName);
          getLatitudeLongitude(cityName);
     }
     else {
          window.alert("Please select the city!");
     }
});

//Using the below API for getting the latitude and longitude of the entered city. They have given reference code on how to use their APIs. Since, one city has multiple values, I chose the first value as default. The latitude and longitude is passed to another function which calls the weather API.
//https://api-ninjas.com/api/geocoding
function getLatitudeLongitude(city) {
     requestLocationLatLongUrl = requestLocationLatLongUrl + "?city=" + city + "";

     $.ajax({
          method: 'GET',
          url: requestLocationLatLongUrl,
          headers: { 'X-Api-Key': vLatitudeLongitude_API_KEY},
          contentType: 'application/json',
          success: function(result) {
               console.log(result);
               if (result.length > 1) {
                    latitude = result[0].latitude;
                    longitude = result[0].longitude;
               }
               else {
                    latitude = result.latitude;
                    longitude = result.longitude;
               }       
               getWeatherDetails(latitude, longitude);
          },
          error: function ajaxError(jqXHR) {
               console.error('Error: ', jqXHR.responseText);
          }
     });  
}


// This function uses the latitude and longitude data and brings the data from Weather API
function getWeatherDetails(pLatitude, pLongitude) {
     weatherUrl = weatherUrl + "?lat=" + pLatitude + "&lon=" + pLongitude + "&appid=" + vWeather_API_KEY + "&units=imperial";
     
     console.log(weatherUrl);

     $.ajax({
     url: weatherUrl,
     method: 'GET',
     }).then(function (response) {
          console.log('AJAX Response \n-------------');
          console.log(response);
          displayCurrentDayDetails(response);
     });
}

//Reference Degree display http://mc-computing.com/languages/Javascript/Degree_Symbol/Degree_Symbol.html

function displayCurrentDayDetails(data) { 
     cityNameDisplay.innerHTML = cityName +" ("+dayjs.unix(data.list[0].dt).format('MM/DD/YYYY')+")";
     console.log(data);
     if (data.cnt > 1) {
          for (var i = 0; i < data.cnt; i++) {
               var vDate = data.list[i].dt_txt;
               vDate = vDate.split(" ");
               console.log(vDate[0]);
               console.log(today);
              

               // Code for current day display
               if (vDate[0] === today) {
                    document.getElementById("currTemp").innerHTML = "Temp: " + data.list[i].main.temp + "&degF";
                    document.getElementById("currWind").innerHTML = "Wind Speed: " + data.list[i].wind.speed + " MPH";
                    document.getElementById("currHumidity").innerHTML = "Humidity: " + data.list[i].main.humidity + " %";   
               }

               if (vDate[0] === day1) {
                    document.getElementById("day1Header").innerHTML = dayjs.unix(data.list[i].dt).format('MM/DD/YYYY')
               }
               if (vDate[0] === day2) {
                     document.getElementById("day2Header").innerHTML = dayjs.unix(data.list[i].dt).format('MM/DD/YYYY')
               }
               if (vDate[0] === day3) {
                     document.getElementById("day3Header").innerHTML = dayjs.unix(data.list[i].dt).format('MM/DD/YYYY')
               }
               if (vDate[0] === day4) {
                     document.getElementById("day4Header").innerHTML = dayjs.unix(data.list[i].dt).format('MM/DD/YYYY')
               }
               if (vDate[0] === day5) {
                     document.getElementById("day5Header").innerHTML = dayjs.unix(data.list[i].dt).format('MM/DD/YYYY')
               }
        
               //console.log(vDate[1]);
          }
     }
     console.log("Hello here 1");
     console.log(data.cnt);
     if (data.cnt > 1) {
          console.log(data.list[0]);
          console.log(dayjs.unix(data.list[0].dt).format('MM/DD/YYYY'));
          
          //console.log("Hello here 2");
      
     }

}


