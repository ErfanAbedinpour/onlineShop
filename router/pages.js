const { Router } = require("express");
const userInfo = require("../middlewares/userInfo");
const { getBestViewsAndNews } = require("../controllers/product");
const router = Router();

router.get("/", userInfo, async (req, res) => {
  const { newsProduct: NewProduct, viewsProduct: ViewProducts } =
    await getBestViewsAndNews();
  res.render("index", {
    NewProduct,
    ViewProducts,
  });
});

router.get("/mail-box", userInfo, (req, res) => {
  res.render("mailBox");
});

module.exports = router;
