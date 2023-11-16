const express = require("express");
const router = express.Router();
const db = require("../../db");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/resume");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

router.use(express.static("public"));

const upload = multer({ storage });

router.post("/applyJob", upload.single("resume"), (req, res) => {
  // const image = req.file ? req.file.filename : null;
  console.log("Entered /applyJob route"); // Add this line to check if the route is being accessed
  const resume = req.file ? req.file.filename : null;
  console.log(resume);
  console.log(req.file);

  const {
    userId,
    jobId,
    companyId,
    jobTitle,
    applicantPhoneNo,
    applicantEmail,
    description,
    posterId,
    status,
    applicantName,
  } = req.body;

  const sql =
    "INSERT INTO jobapplication (`userId`,`jobId`,`companyId`,`jobTitle`,`applicantName`,`resume`,`applicantPhoneno`,`applicantEmail`,`description`,`posterId`,`status`) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
  db.query(
    sql,
    [
      userId,
      jobId,
      companyId,
      jobTitle,
      applicantName,
      resume,
      applicantPhoneNo,
      applicantEmail,
      description,
      posterId,
      status,
    ],
    (err, result) => {
      console.log("Database query result:", result);
      console.log(err);
      if (err) return res.json({ Message: "error" });
      return res.json({ Status: "Success" });
    }
  );
});

router.get("/getAlljobApplication", (req, res) => {
  const sql = "SELECT * FROM jobapplication";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

router.get("/downloadPDF", (req, res) => {
  const fileName = req.query.test;
  const filePath = path.join(__dirname, "../../public/resume", fileName);
  console.log(fileName);
  console.log(filePath), "filePath";

  if (fs.existsSync(filePath)) {
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } else {
    res.status(404).send("File not found");
  }
});

router.post("/updateJobAppStatus", (req, res) => {
  console.log(req.body);
  const sql = "UPDATE jobapplication SET status = ? WHERE jobApplicationId = ?";
  const values = [req.body.status, req.body.jobApplicationId];
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

module.exports = router;
