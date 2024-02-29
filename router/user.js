const { Router } = require("express");
const controller = require("../controllers/user");
const { CheckMethod } = require("../middlewares/authMiddleware");
const validator = require("../middlewares/validator.middleware");
const { singUp } = require("../validator/authResource");
const userInfo = require("../middlewares/userInfo");
const middlewares = require("../middlewares/publucMiddlewares");

const router = Router();

router.route("/").get(userInfo, controller.showUsers);

router.get("/ban/:id", controller.ban);

router.get("/delete/:id", controller.remove);

router.get("/add-user", userInfo, (req, res) => {
  req.flash("accsess", true);
  res.render("singup");
});
router.post("/add-user", CheckMethod, validator(singUp), controller.addUser);
module.exports = router;
