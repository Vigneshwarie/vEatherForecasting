var requestUrl = 'https://api.api-ninjas.com/v1/geocoding';






$("#searchButton").on('click', function () {  
     console.log("hello");
     var cityName = $("input[name=cityDataList]").val();
     if (cityName !== "") {
          console.log(cityName);
          requestUrl = requestUrl + "?city=" + cityName + "";

          $.ajax({
          method: 'GET',
          url: requestUrl,
          headers: { 'X-Api-Key': 'VvjL07GIM+tjq1AaTRH46Q==SCecnrlco9Gox1FX'},
          contentType: 'application/json',
          success: function(result) {
               console.log(result);
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
