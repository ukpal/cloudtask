const express = require("express");

const {
    generateUploadUrl,
    generateDownloadUrl
} = require("../controllers/file.controller");

const router = express.Router();

router.post("/upload-url", generateUploadUrl);
router.get("/download-url", generateDownloadUrl);

module.exports = router;