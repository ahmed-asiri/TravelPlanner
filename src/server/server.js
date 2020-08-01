const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(helmet());


app.use("/", express.static(__dirname + "/../../dist"));

const port = process.env.PORT || 3000;
app.listen( port, () => {
    console.log(`listening on port: ${port}`);
});
