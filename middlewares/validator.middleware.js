const validator = (schema) => {
  //Validator middlewares To Check Input is Correct if not Retuen Error
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      const err = error.message.split('"').join("").trim();
      //Retuen Current Error And Redirect To Current Page
      return res.json({
        status: false,
        msg: err,
      });
    }
  };
};

module.exports = validator;
