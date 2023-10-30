var requestLocationLatLongUrl = 'https://api.api-ninjas.com/v1/geocoding';

var weatherUrl = "http://api.openweathermap.org/data/2.5/forecast";

var vLatitudeLongitude_API_KEY = "VvjL07GIM+tjq1AaTRH46Q==SCecnrlco9Gox1FX";
var vWeather_API_KEY = "c36758574d57eccdb423116f200c9c41";

var latitude;
var longitude;






$("#searchButton").on('click', function () {  
     var cityName = $("input[name=cityDataList]").val();
     if (cityName !== "") {
          console.log(cityName);
          requestLocationLatLongUrl = requestLocationLatLongUrl + "?city=" + cityName + "";

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
     else {
          window.alert("Please select the city!");
     }
});


function getWeatherDetails(pLatitude, pLongitude) {
     weatherUrl = weatherUrl + "?lat=" + pLatitude + "&lon=" + pLongitude + "&appid=" + vWeather_API_KEY + "";

     console.log(weatherUrl);

     $.ajax({
     url: weatherUrl,
     method: 'GET',
     }).then(function (response) {
     console.log('AJAX Response \n-------------');
     console.log(response);
     });

}
