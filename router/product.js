const { Router } = require("express");
const controller = require("../controllers/product");
const uploader = require("../uploader/uplodaer");
const validator = require("../middlewares/validator.middleware");
const { ProductAdd } = require("../validator/authResource");
const userInfo = require("../middlewares/userInfo");
const router = Router();

router.get("/", userInfo, controller.ShowProducts);
router.get("/add-product", userInfo, controller.ShowAddProductPage);
router.get("/details/:id", userInfo, controller.productDetails);
router.post(
  "/add-product",
  uploader.single("product_image"),
  validator(ProductAdd),
  controller.addProduct
);

router.get("/manage-product", userInfo, controller.showAllProducts);

router.get("/delete/:id", controller.deleteProduct);

router
  .route("/edit/:id")
  .get(controller.editPageRender)
  .post(uploader.single("product_image"), controller.editProduct);
module.exports = router;
