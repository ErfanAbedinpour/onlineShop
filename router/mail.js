const { Router } = require("express");
const controller = require("../controllers/mail");
const middlewares = require("../middlewares/publucMiddlewares");
const { mailValidator } = require("../validator/authResource");
const validator = require("../middlewares/validator.middleware");

const router = Router();
//Check is User is Admin accses to this apis
// router.use(middlewares.getUser);

router.post("/send", validator(mailValidator), controller.SendMail);

router.get("/", controller.showMailBox);

router.get("/delete/:id", controller.deleteMail);

router.get("/answer/:id", controller.showAnswerPage);
router.post("/answer/:id", controller.sendAnswer);
module.exports = router;
