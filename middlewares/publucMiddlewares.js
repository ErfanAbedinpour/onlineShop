const jsonwebtoken = require("jsonwebtoken");
const userModel = require("../models/user");
require("dotenv").config();

//Get User With Token
const getUser = async (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    req.isLogin = false;
    return next();
  }
  req.isLogin = true;
  const { id } = jsonwebtoken.verify(token, process.env["KEY"]);
  req.user = await userModel
    .findById(id)
    .select("-password -__v -createdAt -updatedAt");
  next();
};

//Get User Role
const isAdmin = (req, res, next) => {
  if (req.user.role === "ADMIN") {
    return next();
  }
  return res.json({
    status: false,
    msg: "You Cant Accses to this api",
  });
};

module.exports = {
  getUser,
  isAdmin,
};
