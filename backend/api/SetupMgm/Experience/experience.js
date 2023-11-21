const express = require("express");
const router = express.Router();
const db = require("../../../db"); // Import your database connection

router.post("/createExperience", (req, res) => {
  const sql =
    "INSERT INTO experience (`name`,`status`,`createdBy`) VALUES (?,?,?)";
  const values = [req.body.name, req.body.status, req.body.createdBy];
  db.query(sql, values, (err, data) => {
    if (err) {
      console.error("Error creating :", err);
      return res
        .status(500)
        .json({ message: "Error creating ", resultCode: 0 });
    }

    return res
      .status(201)
      .json({ message: " created successfully", resultCode: 1 });
  });
});

router.get("/getAllExperience", (req, res) => {
  const sql = "SELECT * FROM experience";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

router.post("/updateExperience", (req, res) => {
  const sql =
    "UPDATE experience SET name = ?, status = ?,updatedBy = ? WHERE id = ?";
  const values = [
    req.body.name,
    req.body.status,
    req.body.updatedBy,
    req.body.id,
  ];
  db.query(sql, values, (err, data) => {
    if (err) {
      console.error("Error updating: ", err);
      return res.status(500).json({ message: "Error updating", resultCode: 0 });
    }

    return res
      .status(200)
      .json({ message: "Updated successfully", resultCode: 1 });
  });
});

router.post("/deleteExperience", (req, res) => {
  const id = req.body.data;
  const sql = "DELETE FROM experience WHERE `id` = ?";
  db.query(sql, [id], (err, data) => {
    if (err) {
      console.log(err);
      return res.json({ Message: "error" });
    } else return res.json({ Status: "Success" });
  });
});

module.exports = router;
