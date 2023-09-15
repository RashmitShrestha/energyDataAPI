const express = require("express");
const app = express();

const dbCSV = require("./dbScript.js");
const dotenv = require("dotenv");
dotenv.config();
app.use(express.static("public"));

app.use(express.json());

if(process.env.NODE_ENV === 'production'){
  //set static folder
  app.use(express.static('public'));
}


app.listen(process.env.PORT, () => {
  console.log("http://localhost:" + process.env.PORT);
});


app.get("/hey", (req, res) => { 
  res.send("ho!");
});



app.get("/state/:state", (req, res) => {
  try {
    dbCSV.getState(req, res);
  } catch (err) {
    next(err);
  }
});

app.get("/region/:region", (req, res) => {
  try {
    dbCSV.getRegion(req, res);
  } catch (err) {
    next(err);
  }
});

app.get("/netCap", (req, res) => {
  try {
    dbCSV.getNetCapRange(req, res);
  } catch (err) {
    next(err);
  }
});

app.get("/name/:name", (req, res) => {
  try {
    dbCSV.getPlantName(req, res);
  } catch (err) {
    next(err);
  }
});

app.get("/quarter/:quart", (req, res) => {
  try {
    dbCSV.getQuarter(req, res);
  } catch (err) {
    next(err);
  }
});

app.get("/fuel/:fuel", (req, res) => {
  try {
    dbCSV.getFuelCode(req, res);
  } catch (err) {
    next(err);
  }
});
