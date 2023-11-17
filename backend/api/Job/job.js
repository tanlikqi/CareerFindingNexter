const express = require("express");
const router = express.Router();
const db = require("../../db"); // Import your database connection
const multer = require("multer");
const path = require("path");
const fs = require("fs");

router.get("/joblist", (req, res) => {
  const sql = "SELECT * FROM joblist";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

// const resumeStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/resume");
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

router.use(express.static("public"));

const uploadImage = multer({ storage: imageStorage });

// const uploadResume = multer({ storage: resumeStorage });

router.post("/uploadJob", uploadImage.single("image"), (req, res) => {
  // const image = req.file ? req.file.filename : null;
  console.log(req.body.image);
  const {
    companyName,
    experience,
    userId,
    jobRequirements,
    jobDescriptions,
    jobType,
    location,
    salary,
    specialisation,
    state,
    title,
    image,
    companyId,
  } = req.body;

  const sql =
    "INSERT INTO joblist (`userId`,`companyId`,`companyName`,`title`,`jobType`,`specialisation`,`state`,`experience`,`salary`,`location`,`companyLogoUrl`,`requirement`,`description`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";
  db.query(
    sql,
    [
      userId,
      companyId,
      companyName,
      title,
      jobType,
      specialisation,
      state,
      experience,
      salary,
      location,
      image,
      jobRequirements,
      jobDescriptions,
    ],
    (err, result) => {
      console.log(err);
      if (err) return res.json({ Message: "error" });
      return res.json({ Status: "Success" });
    }
  );
});

router.post("/updateJob", uploadImage.single("image"), (req, res) => {
  const image = req.file ? req.file.filename : null; // Check if an image was uploaded

  const {
    companyName,
    experience,
    jobRequirements,
    jobDescriptions,
    jobType,
    location,
    salary,
    specialisation,
    state,
    title,
    jobId,
  } = req.body;

  const sqlParams = [
    companyName,
    title,
    jobType,
    specialisation,
    state,
    experience,
    salary,
    location,
    image,
    jobRequirements,
    jobDescriptions,
    jobId,
  ];

  let conditionsql = `  
    UPDATE joblist
    SET
      companyName = ?,
      title = ?,
      jobType = ?,
      specialisation = ?,
      state = ?,
      experience = ?,
      salary = ?,
      location = ?,
      companyLogoUrl = ?,
      requirement = ?,
      description = ?
    WHERE
      jobId = ?;`;

  if (image == null) {
    conditionsql = `
      UPDATE joblist
      SET
        companyName = ?,
        title = ?,
        jobType = ?,
        specialisation = ?,
        state = ?,
        experience = ?,
        salary = ?,
        location = ?,
        requirement = ?,
        description = ?
      WHERE
        jobId = ?;`;
    // If image is not provided, remove the companyLogoUrl part from the query
    sqlParams.splice(sqlParams.indexOf(image), 1);
  }

  db.query(conditionsql, sqlParams, (err, result) => {
    console.log(err);
    if (err) return res.json({ Message: "error" });
    return res.json({ Status: "Success" });
  });
});

router.post("/deletejoblist", (req, res) => {
  const jobId = req.body.data;
  const sql = "DELETE FROM joblist WHERE `jobId` = ?";
  db.query(sql, [jobId], (err, data) => {
    if (err) {
      console.log(err);
      return res.json({ Message: "error" });
    } else return res.json({ Status: "Success" });
  });
});

router.post("/getjobDetailById", (req, res) => {
  const jobId = req.body.data; // Access the jobId from the query parameters
  const sql = "SELECT * FROM joblist WHERE `jobId` = ? ";
  db.query(sql, [jobId], (err, data) => {
    if (err) {
      console.log(err);
      return res.json({ Message: "error" });
    } else if (data.length > 0 && data.length == 1) {
      const userData = data[0];
      return res.json({ Status: "Success", data: userData });
    }
  });
});

router.post("/searchJob", (req, res) => {
  const searchInput = req.body.searchInput;
  console.log(searchInput);

  // You can modify the SQL query based on your search criteria
  let sql = `
    SELECT * FROM joblist
    WHERE 1`; // Always true initially

  const params = [];

  if (searchInput !== null) {
    sql += `
      AND (
        title LIKE ? OR
        companyName LIKE ? OR
        specialisation LIKE ? OR
        jobType LIKE ?
      )`;

    const searchParam = `%${searchInput}%`;

    // Add the search parameters only if searchInput is not null
    params.push(searchParam, searchParam, searchParam, searchParam);
  }

  db.query(sql, params, (err, data) => {
    if (err) {
      console.log(err);
      return res.json({ Message: "error" });
    }
    return res.json({ Status: "Success", data: data });
  });
});

module.exports = router;
