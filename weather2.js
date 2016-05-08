/*
 Courtesy of fourtonfish
 Storing city, temperature, weather in a variable to manipulate them later.
 Also storing temperature value and units to do the unit conversion.

 We'll use JSON and AJAX
*/
var weatherData = {
    city: document.querySelector("#city"),
    weather: document.querySelector("#weather"),
    temperature: document.querySelector("#temperature"),
    temperatureValue: 0,
    units: "°C"
};

function roundTemperature(temperature) {
    temperature = +temperature.toFixed(2);
    return temperature;
}

function switchUnits() {
    /*
 		 Actual conversion formulas are:
 		°F = °C * 9/5 + 32;
		°C = (°F - 32) * 5/9;
    */
    if (weatherData.units == "°C") {
        weatherData.temperatureValue = roundTemperature(weatherData.temperatureValue * 9 / 5 + 32);
        weatherData.units = "°F";
    } else {
        weatherData.temperatureValue = roundTemperature((weatherData.temperatureValue - 32) * 5 / 9);
        weatherData.units = "°C";
    }

    weatherData.temperature.innerHTML = weatherData.temperatureValue + weatherData.units;
}

// AJAX Server Request
function getLocationAndWeather() {
    if (window.XMLHttpRequest) {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("load", function() {
            console.log("Processing weather info...");
            var response = JSON.parse(xhr.responseText);

            console.log(response);
            var position = {
                latitude: response.latitude,
                longitude: response.longitude
            };
            var cityName = response.city;
            if (cityName == "Earth") {
                // IP-based location detection failed. Let's ask the user where he or she lives.
                getWeatherForLocation();
            } else {
                var weatherSimpleDescription = response.weather.simple;
                var weatherDescription = response.weather.description;
                //			A note: rounding the temperature here is really only necessary when starting with Celsius as your default unit.
                var weatherTemperature = roundTemperature(response.weather.temperature);
                /*
                			To keep things lean, we don't really need to store the values above in the memory, so we're defining them as local variables. As such, they will be cleared after this function runs. However, we will need to save the temperature globally in order to do conversions.
                */
                weatherData.temperatureValue = weatherTemperature;

                loadBackground(position.latitude, position.longitude, weatherSimpleDescription);
                weatherData.city.innerHTML = cityName;
                weatherData.weather.innerHTML = "(click to switch units), " + weatherDescription;
                weatherData.temperature.innerHTML = weatherTemperature + weatherData.units;
                console.log("Finished processing and displaying weather info...");

            }
        }, false);

        xhr.addEventListener("error", function(err) {
            alert("Could not complete the request");
        }, false);

        xhr.open("GET", "https://fourtonfish.com/tutorials/weather-web-app/getlocationandweather.php?owapikey=ab5360bc8257f02fea87f2681447d642&units=metric", true);

        xhr.send();
        console.log("Requesting weather info...");
    } else {
        alert("Unable to fetch the location and weather data.");
    }
}

function getWeatherForLocation() {
    var location = prompt("Your location could not be detected automatically, can you tell me where you live?");
    if (location != null) {
        document.querySelector("body").style.backgroundImage = "url('https://fourtonfish.com/tutorials/weather-web-app/images/default.jpg')";
        document.querySelector("#image-source").setAttribute("href", "https://www.flickr.com/photos/superfamous/310185523/sizes/o/");

        var xhr = new XMLHttpRequest();
        xhr.addEventListener("load", function() {
            var response = JSON.parse(xhr.responseText);

            console.log(response);
            var position = {
                latitude: response.latitude,
                longitude: response.longitude
            };
            var cityName = response.city;

            var weatherSimpleDescription = response.weather.simple;
            var weatherDescription = response.weather.description;
            var weatherTemperature = roundTemperature(response.weather.temperature);
            weatherData.temperatureValue = weatherTemperature;

            weatherData.city.innerHTML = cityName;
            weatherData.weather.innerHTML = ", " + weatherDescription;
            weatherData.temperature.innerHTML = weatherTemperature + weatherData.units;
        }, false);

        xhr.addEventListener("error", function(err) {
            alert("Could not complete the request");
        }, false);



        xhr.open("GET", "https://fourtonfish.com/tutorials/weather-web-app/getweatherforlocation.php?owapikey=45713cc0d54c4bfa1c7efbbdbd1c6c2b&units=metric&location=" + location, true);
        xhr.send();
    } else {
        alert("Unable to fetch the location and weather data.");
    }
}

function loadBackground(lat, lon, weatherTag) {
    var script_element = document.createElement('script');

    script_element.src = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=43513dee7fa05b095aac5f0f98f3a9d0&lat=" + lat + "&lon=" + lon + "&accuracy=1&tags=" + weatherTag + "&sort=relevance&extras=url_l&format=json";

    document.getElementsByTagName('head')[0].appendChild(script_element);
}

function jsonFlickrApi(data) {
    console.log(data);
    if (data.photos.pages > 0) {
        var photo = data.photos.photo[0];
        document.querySelector("body").style.backgroundImage = "url('" + photo.url_l + "')";
        document.querySelector("#image-source").setAttribute("href", "http://www.flickr.com/photos/" + photo.owner + "/" + photo.id);
    } else {
        document.querySelector("body").style.backgroundImage = "url('http://hills.ccsf.edu/~dbess1/images/portfolio/IMG_2222.jpg')";
        document.querySelector("#image-source").setAttribute("href", "https://www.flickr.com/photos/");
    }
}

// Everything is defined, let's start this show.
getLocationAndWeather();
