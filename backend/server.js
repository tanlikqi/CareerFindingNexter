const express = require("express");
// const mysql = require("mysql");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const app = express();
app.use(cors());
app.use(express.json());
const db = require("./db");

const authRoutes = require("./api/Authentication/auth");

const jobRoutes = require("./api/Job/job");

const companyRoutes = require("./api/Company/company");

const jobapplication = require("./api/Job/jobapplication");

// SetupMgm //
const jobTypeRoutes = require("./api/SetupMgm/JobType/jobType");
const stateRoutes = require("../backend/api/SetupMgm/State/state");
const specialisationRoutes = require("./api/SetupMgm/Specialization/specialization");
// SetupMgm //

app.use("/auth", authRoutes);

app.use("/job", jobRoutes);

app.use("/jobApplication", jobapplication);

app.use("/company", companyRoutes);

app.use("/setupMgm/jobType", jobTypeRoutes);

app.use("/setupMgm/state", stateRoutes);

app.use("/setupMgm/specialization", specialisationRoutes);

app.get("/", (re, res) => {
  return res.json("From BackendSide");
});

// app.get("/users", (req, res) => {
//   const sql = "SELECT * FROM users";
//   db.query(sql, (err, data) => {
//     if (err) return res.json(err);
//     return res.json(data);
//   });
// });

// -----------------------------------------------------------------------//

//Job

// app.get("/joblist", (req, res) => {
//   const sql = "SELECT * FROM joblist";
//   db.query(sql, (err, data) => {
//     if (err) return res.json(err);
//     return res.json(data);
//   });
// });

const storage = multer.diskStorage({
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

app.use(express.static("public"));

const upload = multer({ storage });

// app.post("/uploadJob", upload.single("image"), (req, res) => {
//   // const image = req.file ? req.file.filename : null;
//   console.log(req.body.image);
//   const {
//     companyName,
//     experience,
//     userId,
//     jobRequirements,
//     jobDescriptions,
//     jobType,
//     location,
//     salary,
//     specialisation,
//     state,
//     title,
//     image,
//     companyId,
//   } = req.body;

//   const sql =
//     "INSERT INTO joblist (`userId`,`companyId`,`companyName`,`title`,`jobType`,`specialisation`,`state`,`experience`,`salary`,`location`,`companyLogoUrl`,`requirement`,`description`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";
//   db.query(
//     sql,
//     [
//       userId,
//       companyId,
//       companyName,
//       title,
//       jobType,
//       specialisation,
//       state,
//       experience,
//       salary,
//       location,
//       image,
//       jobRequirements,
//       jobDescriptions,
//     ],
//     (err, result) => {
//       console.log(err);
//       if (err) return res.json({ Message: "error" });
//       return res.json({ Status: "Success" });
//     }
//   );
// });

// app.post("/updateJob", upload.single("image"), (req, res) => {
//   const image = req.file ? req.file.filename : null; // Check if an image was uploaded

//   const {
//     companyName,
//     experience,
//     jobRequirements,
//     jobDescriptions,
//     jobType,
//     location,
//     salary,
//     specialisation,
//     state,
//     title,
//     jobId,
//   } = req.body;

//   const sqlParams = [
//     companyName,
//     title,
//     jobType,
//     specialisation,
//     state,
//     experience,
//     salary,
//     location,
//     image,
//     jobRequirements,
//     jobDescriptions,
//     jobId,
//   ];

//   let conditionsql = `
//   UPDATE joblist
//   SET
//     companyName = ?,
//     title = ?,
//     jobType = ?,
//     specialisation = ?,
//     state = ?,
//     experience = ?,
//     salary = ?,
//     location = ?,
//     companyLogoUrl = ?,
//     requirement = ?,
//     description = ?
//   WHERE
//     jobId = ?;`;

//   if (image == null) {
//     conditionsql = `
//     UPDATE joblist
//     SET
//       companyName = ?,
//       title = ?,
//       jobType = ?,
//       specialisation = ?,
//       state = ?,
//       experience = ?,
//       salary = ?,
//       location = ?,
//       requirement = ?,
//       description = ?
//     WHERE
//       jobId = ?;`;
//     // If image is not provided, remove the companyLogoUrl part from the query
//     sqlParams.splice(sqlParams.indexOf(image), 1);
//   }

//   db.query(conditionsql, sqlParams, (err, result) => {
//     console.log(err);
//     if (err) return res.json({ Message: "error" });
//     return res.json({ Status: "Success" });
//   });
// });

// app.post("/deletejoblist", (req, res) => {
//   const jobId = req.body.data;
//   const sql = "DELETE FROM joblist WHERE `jobId` = ?";
//   db.query(sql, [jobId], (err, data) => {
//     if (err) {
//       console.log(err);
//       return res.json({ Message: "error" });
//     } else return res.json({ Status: "Success" });
//   });
// });

// app.post("/getjobDetailById", (req, res) => {
//   const jobId = req.body.data; // Access the jobId from the query parameters
//   const sql = "SELECT * FROM joblist WHERE `jobId` = ? ";
//   db.query(sql, [jobId], (err, data) => {
//     if (err) {
//       console.log(err);
//       return res.json({ Message: "error" });
//     } else if (data.length > 0 && data.length == 1) {
//       const userData = data[0];
//       return res.json({ Status: "Success", data: userData });
//     }
//   });
// });

//Job

// -----------------------------------------------------------------------//

//Company

// app.post("/createCompany", upload.single("image"), (req, res) => {
//   console.log(req);
//   const image = req.file ? req.file.filename : null;

//   const sql =
//     "INSERT INTO company (`name`,`address`,`telno`,`companyEmail`,`userEmail`,`numberofEmployees`,`companyLogoUrl`) VALUES (?,?,?,?,?,?,?)";
//   const { name, address, telno, companyEmail, userEmail, numberofEmployees } =
//     req.body;
//   db.query(
//     sql,
//     [name, address, telno, companyEmail, userEmail, numberofEmployees, image],
//     (err, data) => {
//       if (err) {
//         if (err.code === "ER_DUP_ENTRY") {
//           return res
//             .status(409)
//             .json({ message: "Company already exists", resultCode: 2 });
//         } else {
//           console.error("Error creating user:", err);
//           return res
//             .status(500)
//             .json({ message: "Error creating user", resultCode: 0 });
//         }
//       }

//       // User created successfully
//       return res
//         .status(201)
//         .json({ message: "Company created successfully", resultCode: 1 });
//     }
//   );
// });

// app.get("/getAllCompany", (req, res) => {
//   const sql = "SELECT * FROM company";
//   db.query(sql, (err, data) => {
//     if (err) return res.json(err);
//     return res.json(data);
//   });
// });

//Company

//--------------------------------------------------------------------------------------//
//SetupMagement
// Job Type

// app.post("/createJobType", (req, res) => {
//   const sql =
//     "INSERT INTO jobtype (`name`,`status`,`createdBy`) VALUES (?,?,?)";
//   const values = [req.body.name, req.body.status, req.body.createdBy];
//   db.query(sql, values, (err, data) => {
//     if (err) {
//       console.error("Error creating :", err);
//       return res
//         .status(500)
//         .json({ message: "Error creating ", resultCode: 0 });
//     }

//     return res
//       .status(201)
//       .json({ message: " created successfully", resultCode: 1 });
//   });
// });

// app.get("/getAllJobType", (req, res) => {
//   const sql = "SELECT * FROM jobType";
//   db.query(sql, (err, data) => {
//     if (err) return res.json(err);
//     return res.json(data);
//   });
// });

// app.post("/updateJobType", (req, res) => {
//   const sql =
//     "UPDATE jobtype SET name = ?, status = ?,updatedBy = ? WHERE id = ?";
//   const values = [
//     req.body.name,
//     req.body.status,
//     req.body.updatedBy,
//     req.body.id,
//   ];
//   db.query(sql, values, (err, data) => {
//     if (err) {
//       console.error("Error updating: ", err);
//       return res.status(500).json({ message: "Error updating", resultCode: 0 });
//     }

//     return res
//       .status(200)
//       .json({ message: "Updated successfully", resultCode: 1 });
//   });
// });

// app.post("/deletejobType", (req, res) => {
//   const id = req.body.data;
//   const sql = "DELETE FROM jobtype WHERE `id` = ?";
//   db.query(sql, [id], (err, data) => {
//     if (err) {
//       console.log(err);
//       return res.json({ Message: "error" });
//     } else return res.json({ Status: "Success" });
//   });
// });

//----------------------------------------------------------------------------------------///

app.listen(8081, () => {
  console.log("Listeining");
});
