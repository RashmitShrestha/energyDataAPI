const express = require("express");
const app = express();

const dbCSV = require("./dbScript.js");

app.use(express.static("public"));

app.use(express.json());

app.listen(process.env.PORT || 8080, () => {
  console.log("http://localhost:" + 8080);
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
