const request = require('request');
const geoCode = function (address, callback) {
    const urlMapBox = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWhtZWRtZWNoZXJndWkiLCJhIjoiY2s5MnR4dTE3MDBnNDNlbWg2aDI3eGRpZyJ9.mnboZT603kjWmkdKiLH4qA&limit=1';
    request({url: urlMapBox, json: true}, (error, response) => {
        if (error) {
            callback('unable to connect to location services! please try again.', undefined);
        } else if (response.body.message) {
            callback('Poorly formatted request!', undefined);
        } else if (response.body.features.length === 0) {
            callback('location not found! please try another one.', undefined);
        } else {
            const latitude = response.body.features[0].center[1];
            const longitude = response.body.features[0].center[0];
            const location = response.body.features[0].place_name;
            callback(undefined, {latitude: latitude, longitude: longitude, location: location});
        }
    });
}

module.exports = geoCode;