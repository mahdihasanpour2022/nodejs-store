//  step 137 : validate har jaie mitone estefade beshe chon public hast
const Joi = require("@hapi/joi");
const { MONGO_ID_PATTERN } = require("../../utils/constants");
const createHttpError = require("http-errors");

//آبجکت حاوی مقادیری مثل آیدی  رو میدیم به جویی ولیدیت میکنه میریزه تو این
const ObjectValidator = Joi.object({
  id: Joi.string()
    .pattern(MONGO_ID_PATTERN)
    .error(
      new Error(new createHttpError.BadRequest("ایدی شناسه وارد شده صحیح نیست"))
      // har jaie new createHttpError javab nadad bezaresh to new Error 
    ),
});

module.exports = { ObjectValidator };
