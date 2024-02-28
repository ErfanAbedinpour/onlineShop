//router
const { Router } = require("express");
const controller = require("../controllers/admin");
const middlewares = require("../middlewares/publucMiddlewares");

const router = Router();
//MiddleWares
router.use(middlewares.getUser);
router.use(middlewares.isAdmin);

// router.post("/user/ban/:id", controller.admin);
router.get("/user/ban/", (req, res) => {
  res.send("Nice");
});

module.exports = router;
