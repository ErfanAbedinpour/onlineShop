const { Router } = require("express");
const controller = require("../controllers/blog");
const userInfo = require("../middlewares/userInfo");
const router = Router();

router.get("/", controller.shows);

router
  .route("/add")
  .get(userInfo, (req, res) => {
    res.render("addBlog", {
      isEdit: false,
    });
  })
  .post(controller.addBlog);
module.exports = router;
