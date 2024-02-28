const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
  // if (req.isLogin) {
  req.flash("isLogin", true);
  req.flash("userName", "Erfan");
  // }
  res.render("index");
});

router.get("/mail-box", (req, res) => {
  res.render("mailBox");
});
module.exports = router;
