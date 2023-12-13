const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();
app.use(cors());

const db = mysql.createConnection({
    host: "yellu-mysql.cv910hqsuyvy.us-east-1.rds.amazonaws.com",
    user: "root",
    password: "cowcow24",
    database: "skku_room",
});
  
db.connect((err) => {
if (err) {
    console.error("Database connection error:", err);
} else {
    console.log("Connected to the database");
}
});

  



app.set("port", process.env.PORT || 3030); 
app.set("host", process.env.HOST || "0.0.0.0"); // 아이피 설정

// 루트 접속시 아이피 출력
app.get("/", function (req, res) {

    const location_query = "SELECT * FROM location"
    db.query(location_query, (err, results) => {
        if (err) {
          console.error("Database query error:", err);
          res.status(500).send("Internal Server Error");
        } else {
          res.send(results);
        }
      });
});

// 루트 접속시 아이피 출력
app.get("/getItemDetails", function (req, res) {
    console.log(req.query.itemIds);
    const itemIds = req.query.itemIds;
    const getItemDetailsQuery = "SELECT * FROM item JOIN price ON item.itemId = price.itemId JOIN location ON item.itemId = location.itemId JOIN room ON item.itemId = room.itemId JOIN area ON item.itemId = area.itemId  WHERE item.itemId IN (?)";
    db.query(getItemDetailsQuery, [itemIds], (err, results) => {
      if (err) {
          console.error("Database query error:", err);
          res.status(500).send("Internal Server Error");
      } else {
        console.log(results);
          res.send(results);
      }
  });
});


// 루트 접속시 아이피 출력
app.get("/itemdetail", function (req, res) {
  
  const itemId = req.query.itemId;
  console.log(itemId);
  const itemDetailQuery = "SELECT * \
  FROM item \
  JOIN area ON item.itemId = area.itemId  \
  JOIN floor ON item.itemId = floor.itemId  \
  JOIN location ON item.itemId = location.itemId \
  JOIN parking ON item.itemId = parking.itemId \
  JOIN price ON item.itemId = price.itemId \
  JOIN room ON item.itemId = room.itemId \
  WHERE item.itemId IN (?)";
  db.query(itemDetailQuery, [itemId], (err, results) => {
    if (err) {
        console.error("Database query error:", err);
        res.status(500).send("Internal Server Error");
    } else {
      res.send(results);
    }
});
});

app.get("/itemimages", function (req, res) {
  
  const itemId = req.query.itemId;
  console.log(itemId);
  const itemImageQuery = "SELECT * FROM image WHERE itemId IN (?)";
  db.query(itemImageQuery, [itemId], (err, results) => {
    if (err) {
        console.error("Database query error:", err);
        res.status(500).send("Internal Server Error");
    } else {
      res.send(results);
    }
});
});
app.get("/itemoptions", function (req, res) {
  
  const itemId = req.query.itemId;
  console.log(itemId);
  const itemOptionQuery = "SELECT * FROM options WHERE itemId IN (?)";
  db.query(itemOptionQuery, [itemId], (err, results) => {
    if (err) {
        console.error("Database query error:", err);
        res.status(500).send("Internal Server Error");
    } else {
      res.send(results);
    }
});
});
// 서버 동작중인 표시
app.listen(app.get("port"), app.get("host"), () =>
  console.log(
    "Server is running on : " + app.get("host") + ":" + app.get("port")
  )
);