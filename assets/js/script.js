

var vLatitudeLongitude_API_KEY = "VvjL07GIM+tjq1AaTRH46Q==SCecnrlco9Gox1FX";
var vWeather_API_KEY = "c36758574d57eccdb423116f200c9c41";
var cityName;
var latitude;
var longitude;

var cityNameDisplay = document.getElementById("cityNameDisplay");
var searchHistoryDisplayEl = document.querySelector("#citySearchHistory");

var today = dayjs().format('YYYY-MM-DD');

var currDate =  dayjs().format('MM/DD/YYYY');



// Data is nested in multifolds. Tried few other ways. Im wasting time, so going with day wise. Formatting is not working in single line. 
// Referred from https://day.js.org/docs/en/manipulate/add
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

var weatherCities = [];

var cityWeatherObject;

var currDayWeatherObject = [];
var day1WeatherObject = [];
var day2WeatherObject = [];
var day3WeatherObject = [];
var day4WeatherObject = [];
var day5WeatherObject = [];

var iconURL = "https://openweathermap.org/img/wn/";
var newURL;

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
     var requestLocationLatLongUrl = 'https://api.api-ninjas.com/v1/geocoding';
     console.log("Calling this everytime");
     requestLocationLatLongUrl = requestLocationLatLongUrl + "?city=" + city + "";

      weatherCities.push(city);

     console.log(requestLocationLatLongUrl);
     document.getElementById("cityDataList").value = "";

     setTimeout(()=>{$.ajax({
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
     });  }, 100);
}


// This function uses the latitude and longitude data and brings the data from Weather API
function getWeatherDetails(pLatitude, pLongitude) {
     var weatherUrl = "https://api.openweathermap.org/data/2.5/forecast";
     weatherUrl = weatherUrl + "?lat=" + pLatitude + "&lon=" + pLongitude + "&appid=" + vWeather_API_KEY + "&units=imperial";

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

// Tried few others ways to display data. Things were not working out.. Hence, achieved like this. Please tell me some hint on the other possible ways.
// Also, as it is forecasting, I couldn't fix the time like 9am. So, it will display the last value of the loop.
// The given API doesn't give current day data after some hrs passed in the day.


function displayCurrentDayDetails(data) { 
     //console.log(data);
     if (data.cnt > 1) {
          document.getElementById("displayDiv").style.display = "block";
          
          for (var i = 0; i < data.cnt; i++) {
               var vDate = data.list[i].dt_txt;
               vDate = vDate.split(" ");
               
               // Code for current day display. After certain time, we may not receive the data and it works the next day.
               if (vDate[0] === today) {
                    newURL = iconURL+ data.list[i].weather[0].icon + ".png";
                    cityNameDisplay.innerHTML = cityName + " (" + dayjs.unix(data.list[0].dt).format('MM/DD/YYYY') + ") " + `<img src=${newURL} alt="">`;
                    document.getElementById("currTemp").innerHTML = "Temp: " + data.list[i].main.temp + "&degF";
                    document.getElementById("currWind").innerHTML = "Wind Speed: " + data.list[i].wind.speed + " MPH";
                    document.getElementById("currHumidity").innerHTML = "Humidity: " + data.list[i].main.humidity + " %";   
                    currDayWeatherObject = [ { "temp": "" + data.list[i].main.temp + "", "wind": "" + data.list[i].wind.speed + "", "humidity": "" + data.list[i].main.humidity + "", "icon": "" + data.list[i].weather[0].icon + "" }]
               }             
               if (vDate[0] === day1) {
                    newURL = iconURL+ data.list[i].weather[0].icon + ".png";
                    document.getElementById("day1Header").innerHTML = dayjs.unix(data.list[i].dt).format('MM/DD/YYYY');
                    document.getElementById("day1Icon").innerHTML = `<img src=${newURL} alt="">`;
                    document.getElementById("day1Temp").innerHTML = "Temp: " + data.list[i].main.temp + "&degF";
                    document.getElementById("day1Wind").innerHTML = "Wind Speed: " + data.list[i].wind.speed + " MPH";
                    document.getElementById("day1Humidity").innerHTML = "Humidity: " + data.list[i].main.humidity + " %";   
                    day1WeatherObject = [ { "temp": "" + data.list[i].main.temp + "", "wind": "" + data.list[i].wind.speed + "", "humidity": "" + data.list[i].main.humidity + "", "icon": "" + data.list[i].weather[0].icon + "" }]
               }
               if (vDate[0] === day2) {
                    newURL = iconURL+ data.list[i].weather[0].icon + ".png";
                    document.getElementById("day2Header").innerHTML = dayjs.unix(data.list[i].dt).format('MM/DD/YYYY');
                    document.getElementById("day2Icon").innerHTML = `<img src=${newURL} alt="">`;
                    document.getElementById("day2Temp").innerHTML = "Temp: " + data.list[i].main.temp + "&degF";
                    document.getElementById("day2Wind").innerHTML = "Wind Speed: " + data.list[i].wind.speed + " MPH";
                    document.getElementById("day2Humidity").innerHTML = "Humidity: " + data.list[i].main.humidity + " %";   
                    day2WeatherObject = [ { "temp": "" + data.list[i].main.temp + "", "wind": "" + data.list[i].wind.speed + "", "humidity": "" + data.list[i].main.humidity + "", "icon": "" + data.list[i].weather[0].icon + "" }]
               }
               if (vDate[0] === day3) {
                    newURL = iconURL+ data.list[i].weather[0].icon + ".png";
                    document.getElementById("day3Header").innerHTML = dayjs.unix(data.list[i].dt).format('MM/DD/YYYY');
                    document.getElementById("day3Icon").innerHTML = `<img src=${newURL}  alt="">`;
                    document.getElementById("day3Temp").innerHTML = "Temp: " + data.list[i].main.temp + "&degF";
                    document.getElementById("day3Wind").innerHTML = "Wind Speed: " + data.list[i].wind.speed + " MPH";
                    document.getElementById("day3Humidity").innerHTML = "Humidity: " + data.list[i].main.humidity + " %";   
                    day3WeatherObject = [ { "temp": "" + data.list[i].main.temp + "", "wind": "" + data.list[i].wind.speed + "", "humidity": "" + data.list[i].main.humidity + "", "icon": "" + data.list[i].weather[0].icon + "" }]
               }
               if (vDate[0] === day4) {
                    newURL = iconURL+ data.list[i].weather[0].icon + ".png";
                    document.getElementById("day4Header").innerHTML = dayjs.unix(data.list[i].dt).format('MM/DD/YYYY');
                    document.getElementById("day4Icon").innerHTML = `<img src=${newURL} alt="">`;
                    document.getElementById("day4Temp").innerHTML = "Temp: " + data.list[i].main.temp + "&degF";
                    document.getElementById("day4Wind").innerHTML = "Wind Speed: " + data.list[i].wind.speed + " MPH";
                    document.getElementById("day4Humidity").innerHTML = "Humidity: " + data.list[i].main.humidity + " %";   
                    day4WeatherObject = [ { "temp": "" + data.list[i].main.temp + "", "wind": "" + data.list[i].wind.speed + "", "humidity": "" + data.list[i].main.humidity + "", "icon": "" + data.list[i].weather[0].icon + "" }]
               }
               if (vDate[0] === day5) {
                    newURL = iconURL+ data.list[i].weather[0].icon + ".png";
                    document.getElementById("day5Header").innerHTML = dayjs.unix(data.list[i].dt).format('MM/DD/YYYY');
                    document.getElementById("day5Icon").innerHTML = `<img src=${newURL} alt="">`;
                    document.getElementById("day5Temp").innerHTML = "Temp: " + data.list[i].main.temp + "&degF";
                    document.getElementById("day5Wind").innerHTML = "Wind Speed: " + data.list[i].wind.speed + " MPH";
                    document.getElementById("day5Humidity").innerHTML = "Humidity: " + data.list[i].main.humidity + " %";   
                    day5WeatherObject = [ { "temp": "" + data.list[i].main.temp + "", "wind": "" + data.list[i].wind.speed + "", "humidity": "" + data.list[i].main.humidity + "", "icon": "" + data.list[i].weather[0].icon + "" }]
               }
          }
          // Based central grader comments, included the functionality to store the details in local storage for retrieval.
          cityWeatherObject = {
               "currDate": { "currDate": currDayWeatherObject },
               "day1": { "day1": day1WeatherObject },
               "day2": { "day2": day2WeatherObject },
               "day3": { "day3": day3WeatherObject },
               "day4": { "day4": day4WeatherObject },
               "day5": { "day5": day5WeatherObject }
          };
          localStorage.setItem("" + cityName + "", JSON.stringify(cityWeatherObject)); 
          showSearchHistory();
     }
     else {
          window.alert("No data for the selected city. Please choose a different city");
     }
}

// This function will create a button everytime the city is searched.
function showSearchHistory() {
     searchHistoryDisplayEl.innerHTML = "";
     searchHistoryDisplayEl.style.display = "block";

     weatherCities.forEach((city) => {
          var cityDivEl = document.createElement("div");

          cityDivEl.classList.add("cityList");
          var idAttr = document.createAttribute("cityId");
          idAttr.value = city;
          cityDivEl.setAttributeNode(idAttr);
          cityDivEl.innerHTML = `<button type="button" class="btn btn-primary" id="displayCityDetail">${city}</button> `;
          var displayCityDetailBtnFun = cityDivEl.querySelector("#displayCityDetail");
          displayCityDetailBtnFun.addEventListener("click", displayCityDetail);

          searchHistoryDisplayEl.appendChild(cityDivEl);
          var brEl1 = document.createElement("br");
          searchHistoryDisplayEl.appendChild(brEl1);
     });
}

// This function takes the target element city and fetch the data from the localstorage and display.
function displayCityDetail(event) {
     var targetEl = event.currentTarget.parentElement;
     var city = targetEl.getAttribute("cityId");
     var cityObject = localStorage.getItem(city);
     var cityData = JSON.parse(cityObject);
 
     

     if (cityData.currDate.currDate.length > 0) {
          //Display back current date
          newURL = iconURL + cityData.currDate.currDate[0].icon + ".png";
          cityNameDisplay.innerHTML = city + " (" + currDate + ")" + `<img src=${newURL} alt="">`;
          document.getElementById("currTemp").innerHTML = "Temp: " + cityData.currDate.currDate[0].temp + "&degF";
          document.getElementById("currWind").innerHTML = "Wind Speed: " + cityData.currDate.currDate[0].wind + " MPH";
          document.getElementById("currHumidity").innerHTML = "Humidity: " + cityData.currDate.currDate[0].humidity + " %";   
     }

     //Display back Day 1
     newURL = iconURL+ cityData.day1.day1[0].icon + ".png";
     document.getElementById("day1Icon").innerHTML = `<img src=${newURL} alt="">`;
     document.getElementById("day1Temp").innerHTML = "Temp: " + cityData.day1.day1[0].temp + "&degF";
     document.getElementById("day1Wind").innerHTML = "Wind Speed: " + cityData.day1.day1[0].wind + " MPH";
     document.getElementById("day1Humidity").innerHTML = "Humidity: " + cityData.day1.day1[0].humidity + " %";   

     //Display back Day 2
     newURL = iconURL+ cityData.day2.day2[0].icon + ".png";
     document.getElementById("day2Icon").innerHTML = `<img src=${newURL} alt="">`;
     document.getElementById("day2Temp").innerHTML = "Temp: " + cityData.day2.day2[0].temp + "&degF";
     document.getElementById("day2Wind").innerHTML = "Wind Speed: " + cityData.day2.day2[0].wind + " MPH";
     document.getElementById("day2Humidity").innerHTML = "Humidity: " + cityData.day2.day2[0].humidity + " %";   

     //Display back Day 3
     newURL = iconURL+ cityData.day3.day3[0].icon + ".png";
     document.getElementById("day3Icon").innerHTML = `<img src=${newURL} alt="">`;
     document.getElementById("day3Temp").innerHTML = "Temp: " + cityData.day3.day3[0].temp + "&degF";
     document.getElementById("day3Wind").innerHTML = "Wind Speed: " + cityData.day3.day3[0].wind + " MPH";
     document.getElementById("day3Humidity").innerHTML = "Humidity: " + cityData.day3.day3[0].humidity + " %";   

     //Display back Day 4
     newURL = iconURL+ cityData.day4.day4[0].icon + ".png";
     document.getElementById("day4Icon").innerHTML = `<img src=${newURL} alt="">`;
     document.getElementById("day4Temp").innerHTML = "Temp: " + cityData.day4.day4[0].temp + "&degF";
     document.getElementById("day4Wind").innerHTML = "Wind Speed: " + cityData.day4.day4[0].wind + " MPH";
     document.getElementById("day4Humidity").innerHTML = "Humidity: " + cityData.day4.day4[0].humidity + " %";   

     //Display back Day 5
     newURL = iconURL+ cityData.day5.day5[0].icon + ".png";
     document.getElementById("day5Icon").innerHTML = `<img src=${newURL} alt="">`;
     document.getElementById("day5Temp").innerHTML = "Temp: " + cityData.day5.day5[0].temp + "&degF";
     document.getElementById("day5Wind").innerHTML = "Wind Speed: " + cityData.day5.day5[0].wind + " MPH";
     document.getElementById("day5Humidity").innerHTML = "Humidity: " + cityData.day5.day5[0].humidity + " %";   
}







