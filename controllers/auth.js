//Auth controller Login Handler
const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
require("dotenv").config();

//Singup Controller
const singup = async (req, res) => {
  //Get ReqBody
  const data = { ...req.body };
  //Check User identified
  const isExsistIdentified = await userModel.findOne({
    identified: data.identified,
  });
  if (isExsistIdentified) {
    return res.json({
      status: "false",
      msg: `your ${data.method} is userd by another`,
    });
  }
  //Register User
  const HashPass = await bcrypt.hash(data.password, 11);
  const countOfDoc = await userModel.countDocuments();
  const user = await userModel.create({
    userName: data.userName,
    password: HashPass,
    identified: data.identified,
    role: countOfDoc <= 0 ? "ADMIN" : "USER",
  });
  //Generate Token
  const token = jsonwebtoken.sign({ id: user._id }, process.env["KEY"], {
    expiresIn: "30 day",
  });
  //Set Token to seassion
  res.cookie("token", token, {
    httpOnly: true,
  });
  //Delete some Prop For Security
  const userObj = user.toObject();
  delete userObj["password"];
  delete userObj["__v"];
  //Send Response
  res.json({
    status: true,
    msg: "User Register succsesfully",
    userObj,
    accsesToken: token,
  });
};

//Login Controller
const login = async (req, res) => {
  //Check To if Token Exsist
  let token = req.cookies?.token;
  if (token) {
    const { id } = jsonwebtoken.verify(token, process.env["KEY"]);
    const user = await userModel.findById(id);
    const userObj = user.toObject();
    Reflect.deleteProperty(userObj, "password");
    Reflect.deleteProperty(userObj, "__v");
    return res.status(200).json({
      status: true,
      msg: "Login succsesfully",
      user: userObj,
    });
  }
  const { identified, password } = req.body;
  //Check To veryfy identified
  const user = await userModel.findOne({
    identified,
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({
      status: false,
      msg: "Not found Any user",
    });
  }
  //Retuen User Object
  token = jsonwebtoken.sign({ id: user._id }, process.env["KEY"], {
    expiresIn: "30 day",
  });
  res.cookie("token", token);
  const userObj = user.toObject();
  delete userObj["password"];
  delete userObj["__v"];
  //Sending Response
  return res.json({
    status: true,
    msg: "login succsesfully",
    user: userObj,
    accsesToken: token,
  });
};

module.exports = {
  singup,
  login,
};
