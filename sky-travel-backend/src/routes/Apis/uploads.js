const express = require("express");
const multer = require("multer");
const { GenerateError } = require("../../helpers/errors");
const router = express.Router();

const storage = multer.diskStorage({
  destination: "./images",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype.includes("image")) {
      cb(null, true);
    } else {
      cb("Please Upload an Valid Image Type", false);
    }
  },
});

router.post("/single", upload.single("image"), async (req, res) => {
  try {
    let fileType = req.file.mimetype.split("/")[0];

    res.send({ file: req.file.path.replace("\\", "/"), fileType });
  } catch (err) {
    GenerateError(res, err);
  }
});

module.exports = router;
