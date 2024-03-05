const { Router } = require("express");
const controller = require("../controllers/order");
const userInfo = require("../middlewares/userInfo");
const router = Router();

router.get("/", controller.orderShowPage);
router.post("/", controller.payment);
router.get("/Follow", userInfo, controller.allOrderShows);
router.get("/delete/:id", controller.remove);
router.get("/details/:id", userInfo, controller.orderDetails);
module.exports = router;
