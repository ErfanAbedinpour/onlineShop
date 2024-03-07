const { Router } = require("express");
const controllers = require("../controllers/comment");
const router = Router();

router.post("/add/:id", controllers.add);

module.exports = router;
