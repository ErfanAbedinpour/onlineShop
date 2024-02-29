const userInfo = (req, res, next) => {
  if (req.isLogin) {
    req.flash("isAdmin", req.isAdmin);
    req.flash("isLogin", true);
    req.flash("userName", req.user.userName);
    req.flash("mailCount", req.mailCount.toString());
  }
  next();
};

module.exports = userInfo;
