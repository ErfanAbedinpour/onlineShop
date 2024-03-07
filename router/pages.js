const { Router } = require("express");
const userInfo = require("../middlewares/userInfo");
const { getBestViewsAndNews } = require("../controllers/product");
const router = Router();

router.get("/", userInfo, async (req, res) => {
  const {
    newsProduct: NewProduct,
    viewsProduct: ViewProducts,
    newBlog,
    disCount,
  } = await getBestViewsAndNews();

  res.render("index", {
    NewProduct,
    ViewProducts,
    newBlog,
    disCount,
  });
});

router.get("/aboutme", userInfo, (req, res) => {
  res.render("about");
});

router.get("/mail-box", userInfo, (req, res) => {
  res.render("mailBox");
});

module.exports = router;
