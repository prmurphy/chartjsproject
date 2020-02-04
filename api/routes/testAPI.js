var express = require("express");
var router = express.Router()
const sqlite3 = require('sqlite3').verbose();
 
// open database in memory
let db = new sqlite3.Database('./routes/my_db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});
 
// close the database connection


  

router.get("/", function(req, res, next) {
    db.all('Select * from names', [], (err, rows) => {
        if (err) {
          throw err;
        }
        rows.forEach((row) => {
          console.log(row.first_name);
        });
      });

    res.send("testAPI is working properly"+ row.first_name);

    
});

module.exports = router;


// db.close((err) => {
//     if (err) {
//       return console.error(err.message);
//     }
//     console.log('Close the database connection.');
//   });