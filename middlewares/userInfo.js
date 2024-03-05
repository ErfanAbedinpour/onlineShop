const orderModel = require("../models/order");
const cartModel = require("../models/cart");
const userInfo = async (req, res, next) => {
  if (req.isLogin) {
    req.flash("isAdmin", req.isAdmin);
    req.flash("isLogin", true);
    req.flash("userName", req.user.userName);
    req.flash("mailCount", req.mailCount.toString());
    const countOrd = await orderModel
      .find({ user: req.user._id })
      .countDocuments();
    req.flash("ordcount", countOrd || "0");
    const cartCount = (await cartModel.findOne({ user: req.user._id }))
      ?.products.length;

    req.flash("cartCount", cartCount || "0");
  }
  next();
};

module.exports = userInfo;
