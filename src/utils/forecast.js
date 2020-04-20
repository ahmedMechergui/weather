const request = require('request');

const forecast = function(latitude,longitude,callback) {
    const urlDarkSky = 'https://api.darksky.net/forecast/ad95e11dbf8fe6961a05425dea338c24/'+latitude+','+longitude+'?units=si';
    request({url:urlDarkSky,json:true},(error, {body})=>{
        if (error){
            callback('unable to connect to weather services!',undefined);
        } else if (body.error){
            callback(body.error,undefined);
        } else {
            const weatherNow = body.currently;
            const weatherToday = body.daily.data[0].summary;
            forecastString = weatherToday + ' It is currently ' + weatherNow.temperature + ' degrees out . There is ' +
                weatherNow.precipProbability*100 + '% chance of rain'
            callback(undefined,forecastString);
        }
    });
}

module.exports = forecast;