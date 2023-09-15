const fs = require("fs");
const { parse } = require("csv-parse");

//  exports.getDraftMetrics = function () {
//     fs.createReadStream("draft metrics.csv")
//       .pipe(parse({ delimiter: ",", from_line: 2 }))
//       .on("data", function (row) {
//         console.log(row);
//       })}

const sqlite3 = require("sqlite3").verbose();

// open the database
let db = new sqlite3.Database("energyDB.db", sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the chinook database.");
});
// 0 is sun, 1 is wind
// 0 is winter, 1 is spring, 2 is summer, 3 is fall
db.run(
  "CREATE TABLE IF NOT EXISTS draftMetrics (id INTEGER PRIMARY KEY AUTOINCREMENT, plantName TEXT, plantState TEXT, unit TEXT, netCapacity REAL, sizeGroup TEXT, currCapp REAL, fuelCode INTEGER, quarter INTEGER, region TEXT)"
);

// add entry to db

//  addEntryDB = function (plantName, plantState, unit, netCapacity, sizeGroup, currCapp, fuelCode, quarter, region) {
//   db.run(`INSERT INTO draftMetrics(plantName, plantState, unit, netCapacity, sizeGroup, currCapp, fuelCode, quarter, region) VALUES(?,?,?,?,?,?,?,?,?)`, [plantName, plantState, unit, netCapacity, sizeGroup, currCapp, fuelCode, quarter, region], function(err) {
//     if (err) {
//       return console.log(err.message);
//     }});
//  }

//  fs.createReadStream("draft metrics.csv")
//        .pipe(parse({ delimiter: ","}))
//        .on("data", function (row) {

//         addEntryDB(row[0], row[1], row[2], row[3], row[4], row[5], row[8], row[9], row[10]);
//         console.log("row added" + row[0]);
//        })

// db.run(`INSERT INTO draftMetrics(plantName, plantState, unit, netCapacity, sizeGroup, currCapp, fuelCode, quarter, region) VALUES(?,?,?,?,?,?,?,?,?)`, ["test", "test", "test", 1, "test", 1, 1, 1, "test"], function(err) {
//   if (err) {
//     return console.log(err.message);
//   }});

// get data
// db.all(`SELECT * FROM draftMetrics ORDER BY id DESC LIMIT 1`, [], (err, rows) => {
//   if (err) {
//     throw err;
//   }
//   rows.forEach((row) => {
//     console.log(row);
//   });
// });

// db.run(`DELETE FROM draftMetrics WHERE id = 1426`, function(err) {
//   if (err) {
//     return console.log(err.message);
//   }});

function dbClose() {
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Close the database connection.");
  });
}

// return info based on state
function getState(request, respond) {
  db.all(
    `SELECT * FROM draftMetrics WHERE plantState = ?`,
    [request.params.state.charAt(0).toUpperCase() + request.params.state.slice(1).toLowerCase()],
    (err, rows) => {
      if (err) {
        console.log(err);
      }
      // console.log(rows[0]);
      respond.send(rows);
    }
  );
}

function getRegion(req, res) {
  db.all(
    "SELECT * FROM draftMetrics WHERE region = ?",
    [request.params.region.charAt(0).toUpperCase() + request.params.region.slice(1).toLowerCase()],
    (err, rows) => {
      if (err) {
        console.log(err);
      }
      res.send(rows);
    }
  );
}

function getNetCapRange(req, res) {
  db.all(
    "SELECT * FROM draftMetrics WHERE netCapacity BETWEEN ? AND ?",
    [parseInt(req.query.lower), parseInt(req.query.higher)],
    (err, rows) => {
      if (err) {
        console.log(err);
      }
      res.send(rows);
    }
  );
}

function getFuelCode(req, res) {
  db.all(
    "SELECT * FROM draftMetrics WHERE fuelCode = ?",
    [(req.params.fuel).toUpperCase()],
    (err, rows) => {
      if (err) console.log(err);

      res.send(rows);
    }
  );
}


function getPlantName(req, res) {
  db.all(
    "SELECT * FROM draftMetrics WHERE plantName LIKE '%'||?||'%'",
    [req.params.name],
    (err, rows) => {
      if (err) console.log(err);

      res.send(rows);
    }
  );
}


function getQuarter(req, res) {

  const query = req.params.quart;
  db.all(
    "SELECT * FROM draftMetrics WHERE quarter = ?",
    [query.charAt(0).toUpperCase() + query.toLowerCase().slice(1).toLowerCase()],
    (err, rows) => {
      if (err) console.log(err);
      res.send(rows);
    }
  );
}



// dbClose();

// export getPlantInfo
module.exports = {
  getState,
  getRegion,
  getNetCapRange,
  getFuelCode,
  getPlantName,
  getQuarter, 
};
