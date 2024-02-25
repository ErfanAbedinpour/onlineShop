//Auth Router
//modules
const { Router } = require("express");
const { singup, login } = require("../controllers/auth");
const { CheckMethod } = require("../middlewares/authMiddleware");
const validator = require("../middlewares/validator.middleware");
const {
  singUp,
  login: loginValidator,
} = require("../validator/ResourceValidator");
//router

const router = Router();

//middlewares
router.use(CheckMethod);

//singup Router
router.post("/singup", validator(singUp), singup);

//Login Router
router.post("/login", validator(loginValidator), login);

//exports
module.exports = router;
