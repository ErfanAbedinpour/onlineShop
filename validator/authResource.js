//This Module most Check Input
const joi = require("joi");

//This is Check Singup Input
const singUp = joi.object({
  userName: joi.string().min(3).required(),
  method: joi.string().required().valid("phone", "email"),

  identified: joi.when("method", {
    is: "email",
    then: joi.string().email().required(),
  }),
  identified: joi
    .string()
    .min(9)
    .when("method", { is: "phone", then: joi.required() }),
  password: joi.string().min(8).required(),
  confirmPassword: joi.ref("password"),
});

//Login Input Validator
const login = joi.object({
  method: joi.string().required(),
  identified: joi.when("method", {
    is: "phone",
    then: joi.string().min(9).max(11).required(),
  }),

  identified: joi.when("method", {
    is: "email",
    then: joi.string().email().required(),
  }),
  password: joi.string().required(),
});

const changePassword = joi.object({
  password: joi.string().min(8).required(),
  confirmPassword: joi.ref("password"),
});

module.exports = {
  singUp,
  login,
  changePassword,
};
