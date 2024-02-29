const { Router } = require("express");
const userInfo = require("../middlewares/userInfo");
const router = Router();

router.get("/", userInfo, (req, res) => {
  res.render("index");
});

router.get("/mail-box", userInfo, (req, res) => {
  res.render("mailBox");
});

module.exports = router;
