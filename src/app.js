const path = require('path');
const express = require('express');
const hbs = require('hbs');

const getForecastByLocation = require('./utils/forecastByLocation');

const publicPath = path.join(__dirname,'..','public');
const partialsPath = path.join(__dirname,'..','views','partials');
const app = express();
app.set('view engine','hbs');
app.use(express.static(publicPath));
hbs.registerPartials(partialsPath);

app.get('',(req,res)=>{
   res.render('index',{
       title : 'Weather',
       name : 'Ahmed Mechergui'
   });
});

app.get('/about',(req,res)=>{
    res.render('about',{
        title : 'About',
        name : 'Ahmed Mechergui'
    });
});

app.get('/help',(req,res)=>{
    res.render('help',{
        title : 'Help page',
       message : 'this is help message',
        name : 'Ahmed Mechergui'
    });
});

app.get('/weather',(req,res)=>{
    const address = req.query.address;
    if (!address){
        return res.send({
            error : 'no address provided!'
        });
    }
    try{
    getForecastByLocation(address,(forecast)=>{
     res.send(forecast);
    })
    }catch (e) {
        res.send({error:' Something went wrong , please try again'});
    }
});

app.get('/help/*',(req,res)=>{
    res.render('not-found',{
        notFoundMessage : 'Help article not found!'
    });
});

app.get('*',(req,res)=>{
    res.render('not-found',{
        notFoundMessage  : 'Page not found!'
    });
});



app.listen(3000,()=>{
    console.log('server started');
});