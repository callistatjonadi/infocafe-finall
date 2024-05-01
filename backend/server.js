const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const app = express();
const multer = require("multer");
const path = require("path");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "info_cafe",
});

// Handle registration
app.post("/register", (req, res) => {
  const { username, email, password } = req.body;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      return res.status(500).send("Server error hashing password");
    }
    const query = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    db.query(query, [username, email, hash], (err, result) => {
      if (err) {
        return res.status(500).send("Server error while inserting user");
      }
      res.status(201).send("User registered successfully");
    });
  });
});

//handle login
const SECRET_KEY = "ayam_goreng";

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    } else if (results.length > 0) {
      bcrypt.compare(password, results[0].password, (err, result) => {
        if (result) {
          const token = jwt.sign(
            {
              user_id: results[0].user_id,
              role: results[0].role,
            },
            SECRET_KEY,
            { expiresIn: "8h" }
          );

          res.json({
            token: token,
            role: results[0].role,
            username: results[0].username,
            email: results[0].email,
            id: results[0].user_id,
          });
        } else {
          res.status(401).json({ error: "Invalid credentials" });
        }
      });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  });
});

//get all cafe list
app.get("/api/cafes", (req, res) => {
  db.query("SELECT id, name, description, address, image, distance FROM cafes", (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error retrieving data from database");
    } else {
      res.json(result);
    }
  });
});

//get cafe by id
app.get("/api/cafes/:cafeId", (req, res) => {
  const cafeId = req.params.cafeId;
  const sqlQuery = `
      SELECT cafes.*, reviews.comment, reviews.rating, reviews.user_id, username
      FROM cafes
      LEFT JOIN reviews ON cafes.id = reviews.cafe_id 
      LEFT JOIN users ON users.user_id = reviews.user_id
      WHERE cafes.id = ?;
  `;

  db.query(sqlQuery, [cafeId], (err, results) => {
    if (err) {
      console.error("SQL error:", err);
      return res.status(500).send(`Failed to retrieve cafe data: ${err.message}`);
    }
    if (results.length > 0) {
      const cafeData = {
        id: results[0].id,
        name: results[0].name,
        description: results[0].description,
        address: results[0].address,
        image: results[0].image,
        reviews: results
          .filter((row) => row.comment != null) // Filter first to remove entries without comments
          .map((row) => ({
            comment: row.comment,
            rating: row.rating,
            user_id: row.user_id,
            username: row.username,
          })),
      };
      res.send(cafeData);
    } else {
      res.status(404).send("Cafe not found");
    }
  });
});

//add cafes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dest = path.resolve(__dirname, "../frontend/public/images/cafes/");
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, `image-${uniqueSuffix}${fileExtension}`);
  },
});

const upload = multer({ storage: storage });

app.post("/api/cafes/add", upload.single("image"), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  const { name, description, address, distance } = req.body;
  const image = req.file ? req.file.filename : "";

  if (!name || !description || !address) {
    return res.status(400).send("All fields are required");
  }

  db.query("INSERT INTO cafes (name, description, address, image, distance) VALUES (?, ?, ?, ?, ?)", [name, description, address, image, distance], (err, result) => {
    if (err) {
      console.error("Failed to insert into database", err);
      res.status(500).send("Failed to add cafe");
    } else {
      res.send({ message: "Cafe added successfully", cafeId: result.insertId });
    }
  });
});

//add review
app.post("/api/reviews/:cafeId", (req, res) => {
  const { cafeId } = req.params;
  const { comment, rating, user_id } = req.body;

  const sqlQuery = `
      INSERT INTO reviews (user_id, cafe_id, comment, rating)
      VALUES (?, ?, ?, ?);
  `;

  db.query(sqlQuery, [user_id, cafeId, comment, rating], (err, result) => {
    if (err) {
      console.error("SQL error:", err);
      return res.status(500).send(`Failed to add review: ${err.message}`);
    }
    res.status(201).send({ id: result.insertId, user_id, cafe_id: cafeId, comment, rating }); // Send back the newly created review details
  });
});

app.listen(8081, () => {
  console.log("Server listening on port 8081");
});

app.get("/", (req, res) => {
  return res.json("From Backend Side");
});
