// Storing city, temperature, weather in a variable to manipulate them later
// Also storing temperature value and units to do the unit conversion.

var weatherData = {
    city: document.querySelector("#city"),
    temperature: document.querySelector("#temperature"),
    weather: document.querySelector("#weather"),
    temperatureValue: 0,
    units: "°F"
};

// Actual conversion formulas are:
// °F = °C * 9/5 + 32;
// °C = (°F - 32) * 5/9;

function switchUnits() {
    if (weatherData.units == "°F")
        (weatherData.temperatureValue = roundTemperature((weatherData.temperatureValue - 32) * 5 / 9); weatherData.units = "°C";
        }
    else {
        weatherData.temperatureValue = roundTemperature(weatherData.temperatureValue * 9 / 5 + 32);
        weatherData.units = "°F";
    }

    weatherData.temperature.innerHTML = weatherData.temperatureValue + weatherData.units + ", ";
}

// This single function causes the infobar to appear
function get_location() {
    if (Modernizr.geolocation) {
        navigator.geolocation.getCurrentPosition(show_location, handle_error, success_callback, error_callback, { maximumAge: 75000 });
    } else {
        //no support, Yikes!
    }
}

// Geoposition: a timestamped position report
// The readonly Geocoordinates "coords" below is a property that refers to a Geocoordinates object whose properties specify the user's latitude and longitude.

function show_location(position) {
    var latitude = position.coords.latitude; // coords.latitude are in decimal degrees
    var longitude = position.coords.longitude; // coords.longitutde are in decimal degrees

}

function handle_error(error) {
    if (error.code == 1) {
        // 1. User chooses not to share location; 2. Position may not be found; 3. The network TimedOut
    }
}

if (geoPosition.init()) { // Geolocation Initialization, this verifies that finding the location is possible.
	// Call getCurrentPosition() function to actually find the user's location.
    geoPosition.getCurrentPosition(success_callback, error_callback, { enableHighAccuracy: true });
} else {
    // You cannot use Geolocation in this device
}
geoPositionSimulator.init();

// p : geolocation object
function success_callback(p) {
	alert("Found you at latitute " + p.coords.latitude + ", longitude " + p.coords.longitude);
    // p.latitude : latitude value
    // p.longitude : longitude value
}

function error_callback(p) {
	alert("Could not find your location!");
    // p.message : error message
}
