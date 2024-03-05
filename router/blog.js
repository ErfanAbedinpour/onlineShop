const { Router } = require("express");
const controller = require("../controllers/blog");
const userInfo = require("../middlewares/userInfo");
const uploader = require("../uploader/uplodaer");
const router = Router();

router.get("/", userInfo, controller.shows);

router
  .route("/add")
  .get(userInfo, (req, res) => {
    res.render("addBlog", {
      isEdit: false,
    });
  })
  .post(uploader.single("blog_image"), controller.addBlog);

router.get("/details/:id", userInfo, controller.showDetails);

module.exports = router;
