const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(helmet());


app.use("/", express.static(__dirname + "/../../dist"));

app.post("/", async (req, res) => {
    
    // getting the data from the Geonames API
    let result = await fetch(`http://api.geonames.org/searchJSON?q=${req.body.dest}&maxRows=10&username=${process.env.GEO_USERNAME}`);
    let geonamesData = await result.json();

    // getting weather data

    if(req.body.isCurrent){
        let responseWeatherData = await fetch(`https://api.weatherbit.io/v2.0/current?lat=${geonamesData.geonames[0].lat}&lon=${geonamesData.geonames[0].lng}&key=${process.env.BIT_API_KEY}`);
        let weatherData = await responseWeatherData.json();

        console.log(geonamesData.geonames[0].lat, geonamesData.geonames[0].lng);
        console.log(weatherData);
    } else {
        let responseWeatherData = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${geonamesData.geonames[0].lat}&lon=${geonamesData.geonames[0].lng}&key=${process.env.BIT_API_KEY}`);
        let weatherData = await responseWeatherData.json();

        console.log(geonamesData.geonames[0].lat, geonamesData.geonames[0].lng);
        console.log(weatherData);
    }


    //res.send(data);
    console.log(req.body.isCurrent);
});

const port = process.env.PORT || 3000;
app.listen( port, async function (){
    console.log(`listening on port: ${port}`);

});
