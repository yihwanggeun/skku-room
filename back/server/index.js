const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();

app.use(cors());
app.use(express.json()); // Add this line to parse JSON requests

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

    const location_query = "SELECT l.* FROM location l JOIN item i ON l.itemID = i.itemID WHERE i.share = 0;"
    db.query(location_query, (err, results) => {
        if (err) {
          console.error("Database query error:", err);
          res.status(500).send("Internal Server Error");
        } else {
          res.send(results);
        }
      });
});


app.get("/share", function (req, res) {

  const location_query = "SELECT l.* FROM location l JOIN item i ON l.itemID = i.itemID WHERE i.share = 1;"
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

app.post("/signin", function (req, res){
  const email = req.body.email;
  const password = req.body.password;
  db.query(`SELECT * FROM users WHERE email = ?`, [email], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
      return;
    }

    // 사용자 존재 여부 확인
    if (results.length === 0) {
      res.status(200).send("No");
      return;
    }

    // 비밀번호 일치 여부 확인
    const user = results[0];
    if (password !== user.password) {
      res.status(200).send("No");
      return;
    }

    // 로그인 성공
    console.log(user);
    res.status(200).send({id :user.id});
  });
  
});

app.post("/signup", function (req, res) {
  // 데이터 처리
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const phone = req.body.phone;

  // 중복된 이메일 확인
  db.query(`SELECT COUNT(*) AS count FROM users WHERE email = ?`, [email], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }

    const count = results[0].count;
    if (count > 0) {
      res.status(200).send("EXIST");
      return;
    }

    // 회원가입 로직
    db.query(`INSERT INTO users (username,email,password,phone)VALUES (?, ?, ?, ?) `, [username, email, password, phone], (err, results) => {
      if (err) {
        res.status(500).send(err);
        return;
      }

      // 성공 응답
      res.status(200).send("회원가입 성공");
    });
  });
});

app.post("/addroom", function (req, res) {
  console.log(req.body);
  const {
    userId,
    image,
    lat,
    lng,
    roomType,
    rent,
    deposit,
    description,
    jibun,
    number,
    title
  } = req.body;

  console.log(title);
  const query = `INSERT INTO contract (userId,image,lat,lng,roomType,rent,deposit,description,jibun,number,title)VALUES (?,?,?,?,?, ?, ?, ?,?,?,?)`
  console.log(req.body);
  db.query(query,[userId, image, lat, lng, roomType, rent, deposit, description, jibun, number,title],(err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
      return;
    }

    // 성공 응답
    res.status(200).send("방 내 놓기 성공");
    });
});

app.get("/contract/side", function (req, res) {
  const contractId = req.query.contractId;
  const Query = "SELECT * FROM contract where contractId = ?";
  db.query(Query,[contractId], (err, results) => {
    if (err) {
        console.error("Database query error:", err);
        res.status(500).send("Internal Server Error");
    } else {
      res.send(results);
    }
});
});

app.get("/contract", function (req, res) {
  const Query = "SELECT * FROM contract";
  db.query(Query, (err, results) => {
    if (err) {
        console.error("Database query error:", err);
        res.status(500).send("Internal Server Error");
    } else {
      res.send(results);
    }
});
});

app.get("/contract/reqdetail", function (req, res) {
  const contractId = req.query.contractId;
  console.log(contractId);
  const Query = "SELECT * FROM contractreq where contractId = ?";
  db.query(Query,[contractId] ,(err, results) => {
    if (err) {
        console.error("Database query error:", err);
        res.status(500).send("Internal Server Error");
    } else {
      console.log(results);
      res.send(results);
    }
});
});

app.get("/contract/myreqest", function (req, res) {
  const userId = req.query.userId;
  const Query = "SELECT * FROM contractreq where userId = ?";
  db.query(Query,[userId] ,(err, results) => {
    if (err) {
        console.error("Database query error:", err);
        res.status(500).send("Internal Server Error");
    } else {
      res.send(results);
    }
});
});

app.post("/contract/req", function (req, res) {
  console.log(req.body);
  const {
    userid,
    username,
        personid,
        currentlocation,
        phone,
        purpose,
        moneycapacity,
        comment,
        contractId
  } = req.body;
  
  const query = `INSERT INTO contractreq (userId,userName,personalId,currentLocation,phone,purpose,moneyCapacity,comment,accepted,contractId)VALUES (?,?,?,?,?, ?, ?, ?,?,?)`
  console.log(req.body);
  db.query(query,[userid, username, personid, currentlocation, phone, purpose, moneycapacity, comment, 0,contractId],(err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
      return;
    }

    // 성공 응답
    res.status(200).send("계약 의사 전달 완료");
    });
});

app.post("/contract/accept", function (req, res) {
  console.log(req.body);
  const { requestId } = req.body;

  const query = `UPDATE contractreq SET accepted = 1 WHERE requestId = ?`;

  db.query(query, [requestId], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
      return;
    }

    // 성공 응답
    res.status(200).send("Okay");
  });
});

// 서버 동작중인 표시
app.listen(app.get("port"), app.get("host"), () =>
  console.log(
    "Server is running on : " + app.get("host") + ":" + app.get("port")
  )
);