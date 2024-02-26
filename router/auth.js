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
} = require("../validator/ResourceValidator");
//router

const router = Router();

//middlewares
router.use(CheckMethod);

//singup Router
router.post("/singup", validator(singUp), singup);

//Login Router
router.post("/login", validator(loginValidator), login);

//ChangePasswordRouters
router.get("/reset-password", (req, res) => {}); //Render just Email Page
router.get("/change-password", validator(), resetPassword); // Render change Page after Check Email
//Render Change password Page
router.get("/change-password:token", (req, res) => {
  const { token } = req.params;
  req.flash("token", token);
  res.render("Pages"); // this is must Send Token And In Front Click on Action this token Send With Post to Backend
}); // Render Change Password Page
router.post(
  "/change-password:token",
  validator(changePasswordValidator),
  changePassword
); // Change Password

//exports
module.exports = router;
