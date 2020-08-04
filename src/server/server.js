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
    
    let tripCardInfo = await tripData(req.body);
    res.send(JSON.stringify(tripCardInfo));
    
});

async function tripData(reqData){
    // getting the data from the Geonames API
    let geoObj = await getGeo(reqData.dest);

    // getting weather data
    let weatherObj = await getWeaher(reqData.isCurrent, geoObj);

    // getting the picture of the visited place
    let picObj = await getPic(geoObj);

    // prepare the data in one object for the client
    let trip = {
        city: geoObj.city,
        country: geoObj.country.replace("+", " "),
        countryCode: geoObj.countryCode,
        lowTemp: weatherObj.low,
        maxTemp: weatherObj.max,
        imgURL: picObj.imgURL
    }

    return trip;
    //weatherObj.low

}

function gettingDataFromWeather(value){
    return value;
}

async function getGeo(dest) {
    // This function will fetch the data from  the Geonames API and return the important values only that will be used in other API's.
    let geonamesResponse = await fetch(`http://api.geonames.org/searchJSON?q=${dest}&maxRows=10&username=${process.env.GEO_USERNAME}`);
    let geonamesData = await geonamesResponse.json();
    //console.log(geonamesData.geonames[0]);
    let result = {
        lat: geonamesData.geonames[0].lat,
        lon: geonamesData.geonames[0].lng,
        country: geonamesData.geonames[0].countryName.replace(" ", "+"),
        city: dest,
        countryCode: geonamesData.geonames[0].countryCode
    }
    return result;
}


async function getWeaher(isCurrent, geoObj){
    let apiRoute = "forecast/daily";
    if(isCurrent)
        apiRoute = "current";  
    
    let responseWeatherData = await fetch(`https://api.weatherbit.io/v2.0/${apiRoute}?lat=${geoObj.lat}&lon=${geoObj.lon}&key=${process.env.BIT_API_KEY}`);
    let weatherData = await responseWeatherData.json();    

    let result = {
        low: weatherData.data[0]["low_temp"],
        max: weatherData.data[0]["max_temp"],
    }
    return result;

}


async function getPic(geoObj){
    let responsePic = await fetch(`https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&q=${geoObj.city}&image_type=photo&orientation=horizontal&category=places`)
    let picObj = await responsePic.json();

    if(picObj.totalHits == 0){
        // if the response was 0 images for the city, get the Pic for the country.
        responsePic = await fetch(`https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&q=${geoObj.country}&image_type=photo&orientation=horizontal&category=places`)
        picObj = await responsePic.json();      
    }

    let result = {
        imgURL: picObj.hits[0].webformatURL
    };

    return result;
}


const port = process.env.PORT || 3000;
app.listen( port, async function (){
    console.log(`listening on port: ${port}`);

});

module.exports = {getGeo};
