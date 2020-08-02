const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(helmet());


app.use("/", express.static(__dirname + "/../../dist"));

app.get("/data", async (req, res) => {
    let result = await fetch(`http://api.geonames.org/searchJSON?q=amman&maxRows=10&username=${process.env.GEO_USERNAME}`);
    let data = await result.json();
    console.log(process.env.GEO_USERNAME);
    console.log(data);
});

const port = process.env.PORT || 3000;
app.listen( port, async function (){
    console.log(`listening on port: ${port}`);

});
