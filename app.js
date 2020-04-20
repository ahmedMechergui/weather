const chalk = require('chalk');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const location = process.argv[2];
if (!location){
    console.log(chalk.red('please provide a location'));
}else {
    // geocode is using mapbox API && forecast is using darksky API
    geocode(location,(error,response)=>{
        if (error){
            return console.log('error: '+chalk.red(error));
        }
        forecast(response.latitude,response.longitude,(error,responseForecast)=>{
            if (error){
              return  console.log('error: '+chalk.red(error));
            }
            console.log(response.location);
            console.log(responseForecast);
        });
    });
}



