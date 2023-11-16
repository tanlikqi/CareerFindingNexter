const express = require("express");
const router = express.Router();
const db = require("../../db"); // Import your database connection

router.get("/", (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

router.post("/signup", (req, res) => {
  const sql =
    "INSERT INTO users (`firstName`,`lastName`,`userName`,`password`,`phoneNo`,`email`,`userRole`) VALUES (?)";
  const values = [
    req.body.firstName,
    req.body.lastName,
    req.body.userName,
    req.body.password,
    req.body.phoneNo,
    req.body.email,
    req.body.userRole,
  ];
  db.query(sql, [values], (err, data) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res
          .status(409)
          .json({ message: "User already exists", resultCode: 2 });
      } else {
        console.error("Error creating user:", err);
        return res
          .status(500)
          .json({ message: "Error creating user", resultCode: 0 });
      }
    }

    // User created successfully
    return res
      .status(201)
      .json({ message: "User created successfully", resultCode: 1 });
  });
});

router.post("/login", (req, res) => {
  const sql =
    "SELECT `id`,`firstName`,`lastName`,`username`,`email`,`profileImageUrl`,`userRole`,`phoneNo` FROM users WHERE `userName` = ? AND `password` = ?";
  db.query(sql, [req.body.userName, req.body.password], (err, data) => {
    if (err) {
      console.error("Error querying the database:", err);
      return res
        .status(500)
        .json({ message: "Internal server error", resultCode: 0 });
    }
    if (data.length > 0 && data.length == 1) {
      console.log("Login Success");
      const userData = data[0];
      return res
        .status(200)
        .json({ message: "Success", resultCode: 1, data: userData });
    } else {
      console.log("Failed");
      return res
        .status(401)
        .json({ message: "Authentication failed", resultCode: 2 });
    }
  });
});

// Export the router to be used in the main application file
module.exports = router;
