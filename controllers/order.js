const cartModel = require("../models/cart");
const orderModel = require("../models/order");
const sendEmail = require("../utils/sendMail");

const orderShowPage = async (req, res) => {
  const { cartId } = req.cookies;
  const currentCart = await cartModel.findById(cartId);
  res.render("order", {
    Cart: currentCart,
  });
};

const payment = async (req, res) => {
  const { name, email, phone, method, address } = req.body;
  const { cartId } = req.cookies;
  const Cart = await cartModel.findById(cartId);
  const order = await orderModel.create({
    name,
    email,
    phone,
    method,
    address,
    Price: Cart.TotlaPrice,
    cart: Cart._id,
    user: req.user._id,
  });

  await cartModel.deleteOne({
    _id: cartId,
  });

  res.clearCookie("cartId");
  res.cookie("email", order.email);
  await sendEmail(
    order.email,
    `ممنون از سفارش شما اقای  ${order.name}`,
    "سفارش شما در لبست انتظار قرار گرفت از قسمت پیگیری سفارش میتونید از وضعیت سفارش مطلع شوید"
  );
  res.render("complete", {
    Process: order,
  });
};

const allOrderShows = async (req, res) => {
  const orders = await orderModel.find({});
  res.render("orderList", {
    orders,
  });
};

const remove = async (req, res) => {
  const { id } = req.params;
  await orderModel.deleteOne({ _id: id });
  res.redirect("/order/Follow");
};

const orderDetails = async (req, res) => {
  const { id } = req.params;
  const orders = await orderModel.findById(id);
  res.render("ordDetails", {
    orders,
  });
};

module.exports = {
  orderShowPage,
  payment,
  allOrderShows,
  remove,
  orderDetails,
};
