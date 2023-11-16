const express = require("express");
const router = express.Router();
const db = require("../../db"); // Import your database connection
const multer = require("multer");
const path = require("path");

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

router.use(express.static("public"));

const upload = multer({ storage });

router.post("/createCompany", upload.single("image"), (req, res) => {
  const image = req.file ? req.file.filename : null;

  const sql =
    "INSERT INTO company (`name`,`address`,`telno`,`companyEmail`,`userEmail`,`numberofEmployees`,`companyLogoUrl`) VALUES (?,?,?,?,?,?,?)";
  const { name, address, telno, companyEmail, userEmail, numberofEmployees } =
    req.body;
  db.query(
    sql,
    [name, address, telno, companyEmail, userEmail, numberofEmployees, image],
    (err, data) => {
      if (err) {
        console.log(err);
        if (err.code === "ER_DUP_ENTRY") {
          return res
            .status(409)
            .json({ message: "Company already exists", resultCode: 2 });
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
        .json({ message: "Company created successfully", resultCode: 1 });
    }
  );
});

router.get("/getAllCompany", (req, res) => {
  const sql = "SELECT * FROM company";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

module.exports = router;
