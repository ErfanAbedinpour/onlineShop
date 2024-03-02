const multer = require("multer");

const uploader = multer({
  storage: multer.memoryStorage(),
});

module.exports = uploader;
