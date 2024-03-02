//This Module most Check Input
const joi = require("joi");

//This is Check Singup Input
const singUp = joi.object({
  userName: joi
    .string()
    .min(3)
    .required()
    .error(new Error("فیلد نام کاربری اجباری میباشد")),
  method: joi.string().required().valid("phone", "email"),

  identified: joi.when("method", {
    is: "email",
    then: joi
      .string()
      .email()
      .required()
      .error(new Error("لطفا ایمیل معتبر وارد کنید")),
  }),
  identified: joi
    .string()
    .min(9)
    .when("method", {
      is: "phone",
      then: joi
        .string()
        .required()
        .regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)
        .error(new Error("شماره تماس معتبر وارد کنید")),
    }),
  password: joi
    .string()
    .min(8)
    .required()
    .error(new Error("پسورد یاید حداقل ۸ کاراکتر باشد")),
  confirmPassword: joi
    .string()
    .valid(joi.ref("password"))
    .error(new Error("پسورد ها با هم مطابقت ندارند"))
    .required(),

  role: joi.string().valid("ADMIN", "USER"),
});

//Login Input Validator
const login = joi.object({
  method: joi.string().required(),
  identified: joi.when("method", {
    is: "phone",
    then: joi
      .string()
      .min(9)
      .max(11)
      .required()
      .regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)
      .error(new Error("لطفا شماره معتبر وارد کنید")),
  }),

  identified: joi.when("method", {
    is: "email",
    then: joi
      .string()
      .email()
      .required()
      .error(new Error("لطفا ایمیل معتبر وارد کنید")),
  }),
  password: joi
    .string()
    .required()
    .min(8)
    .error(new Error("لطفا پسورد را وارد کنید")),
});

const changePassword = joi.object({
  password: joi
    .string()
    .min(8)
    .required()
    .error(new Error("باید حداقل ۸ کاراکتر باشد")),
  confirmPassword: joi
    .string()
    .valid(joi.ref("password"))
    .error(new Error("پسورد ها با هم مطابقت ندارند"))
    .required(),
});

const mailValidator = joi.object({
  userName: joi
    .string()
    .required()
    .error(new Error("لطفا  یک نام معتبر وارد کنید")),
  phone: joi
    .string()
    .regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)
    .error(new Error("لطفا شماره معتبر وارد کنید"))
    .required(),

  text: joi
    .string()
    .max(30)
    .required()
    .error(new Error("لطفا یک پیامی ارسال کنید")),
  email: joi
    .string()
    .email()
    .required()
    .error(new Error("لطفا یک ایمیل وارد کنید")),
});

const ProductAdd = joi.object({
  title: joi
    .string()
    .required()
    .error(new Error("لطفا  یک نام معتبر برای محصول وارد کنید")),
  describe: joi
    .string()
    .regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)
    .error(new Error("لطفا یک توضیح برای محصول بنویسید"))
    .required(),
  price: joi
    .string()
    .max(30)
    .required()
    .error(new Error("محصول بدون قیمت نمیشه ک میشه؟")),
  model: joi
    .string()
    .email()
    .required()
    .error(new Error("به هر حال یک مدلی هم داره دیگ؟")),
});

module.exports = {
  singUp,
  login,
  changePassword,
  mailValidator,
  ProductAdd,
};
