const express = require("express");
const router = express();

const Content = require("../../controllers/Content/Content");

//for pdf upload
router.post("/pdf", (req, res) => {
  Content.pdfUpload(req, res);
});
//  for ppt upload
router.post("/myppt", (req, res) => {
  Content.pptUpload(req, res);
});
// for Video Upload
router.post("/video", (req, res) => {
  Content.videoUpload(req, res);
});

module.exports = router;
