//Auth Router
//modules
const { Router } = require("express");
const {
  singup,
  login,
  resetPassword,
  changePassword,
} = require("../controllers/auth");
const { CheckMethod } = require("../middlewares/authMiddleware");
const validator = require("../middlewares/validator.middleware");
const {
  singUp,
  login: loginValidator,
  changePassword: changePasswordValidator,
} = require("../validator/authResource");
const userInfo = require("../middlewares/userInfo");
//router
const router = Router();
router
  .route("/login")
  .get(userInfo, (req, res) => {
    res.render("login");
  })
  .post(CheckMethod, validator(loginValidator), login);

router
  .route("/singup")
  .get(userInfo, (req, res) => {
    res.render("singup");
  })
  .post(CheckMethod, validator(singUp), singup);

router.get("/logout", (req, res) => {
  res.clearCookie("token");

  res.redirect("/");
});

//ChangePasswordRouters
router.get("/reset-password", userInfo, (req, res) => {
  res.render("resetPassword");
}); //Render just Email Page

router.post("/reset-password", resetPassword); // Render change Page after Check Email
//Render Change password Page
router.get("/change-password/:token", userInfo, (req, res) => {
  const resetToken = req.cookies?.resetToken;
  if (!resetToken) {
    return res.redirect("/404/");
  }
  res.render("changePass"); // this is must Send Token And In Front Click on Action this token Send With Post to Backend
}); // Render Change Password Page

router.post("/change-password", changePassword); // Change Password

//exports
module.exports = router;
