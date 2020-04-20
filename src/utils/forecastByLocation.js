const forecast = require('./forecast');
const geocode = require('./geocode');

const forecastByLocation = function (location, callback) {
// geocode is using mapbox API && forecast is using darksky API
    geocode(location, (error, response) => {
        if (error) {
            callback({error: error});
        } else {
            forecast(response.latitude, response.longitude, (error, responseForecast) => {
                if (error) {
                    callback({error: error});
                } else {
                    callback({location : response.location,forecast : responseForecast});
                }
            });
        }
    });
}

module.exports = forecastByLocation;