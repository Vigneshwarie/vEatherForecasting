var requestLocationLatLongUrl = 'https://api.api-ninjas.com/v1/geocoding';

var weatherUrl = "http://api.openweathermap.org/data/2.5/forecast";

var vLatitudeLongitude_API_KEY = "VvjL07GIM+tjq1AaTRH46Q==SCecnrlco9Gox1FX";
var vWeather_API_KEY = "c36758574d57eccdb423116f200c9c41";
var cityName;
var latitude;
var longitude;

var cityNameDisplay = document.getElementById("cityNameDisplay");


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
          //console.log(response);
          displayCurrentDayDetails(response);
     });
}

function displayCurrentDayDetails(data) { 
     cityNameDisplay.innerHTML = cityName;
     console.log(data);
     console.log("Hello here 1");
     console.log(data.cnt);
     if (data.cnt > 1) {
          console.log(data.list[0]);
          console.log(dayjs.unix(data.list[0].dt));
          document.getElementById("currTemp").innerHTML = "Temp: " + data.list[0].main.temp;
          document.getElementById("currWind").innerHTML = "Wind Speed: "+ data.list[0].wind.speed;
          document.getElementById("currHumidity").innerHTML = "Humidity: "+data.list[0].main.humidity;
          //console.log("Hello here 2");
      
     }

}


