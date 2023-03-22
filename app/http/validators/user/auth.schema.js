//step 17 : @hapi/joi az schema estefade mikone vase validation
//name moteghaiiere ro pascal bnvis
const Joi = require("@hapi/joi");

// tartibe in methodaie tosh mesle string , ... ha mohemme
// be komake error(new Error(""))  mitoni farsi error bdi
// joi mobile validator nadare pas baiad ba pattern tosh regex benevisi

const authSchema = Joi.object({
  email: Joi.string()
    .lowercase()
    .trim()
    .email()
    .required()
    .error(new Error("ایمیل وارد شده صحیح نیست")),
  password: Joi.string()
    .min(6)
    .max(16)
    .trim()
    .required()
    .error(new Error("پسورد ,ارد شده باید بین 6 تا 16 رقم باشد")),
  mobile: Joi.string()
    .length(11)
    .pattern(/^09[0-9]{9}/)
    .error(new Error("موبایل صحیح نیست")),
});

module.exports = {
  authSchema,
};
