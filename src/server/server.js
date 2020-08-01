const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded());


const port = process.env.PORT || 3000;
app.listen( port, () => {
    console.log(`listening on port: ${port}`);
});