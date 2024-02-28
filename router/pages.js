const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
  if (req.isLogin) {
    req.flash("isLogin", true);
    req.flash("userName", req.user.userName);
  }
  res.render("index");
});

module.exports = Router;
