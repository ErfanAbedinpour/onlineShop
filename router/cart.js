const { Router } = require("express");
const controller = require("../controllers/cart");
const middlewares = require("../middlewares/publucMiddlewares");
const validator = require("../middlewares/validator.middleware");
const userInfo = require("../middlewares/userInfo");

const router = Router();

router.post("/add", controller.addToCart);
router.get("/", userInfo, controller.ShowCarts);
router.get("/delete/:id", controller.deleteCart);
router.get("/inc/:id", controller.addOne);
module.exports = router;
