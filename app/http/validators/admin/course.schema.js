// step 160 :

const Joi = require("@hapi/joi");
const createHttpError = require("http-errors");
const { MONGO_ID_PATTERN } = require("../../../utils/constants");
// b jaie regex mitoni benevisi pattern ama regex behtare

const createCourseSchema = Joi.object({
  title: Joi.string().min(3).max(30).error(createHttpError.BadRequest("عنوان ارسال شده باید بین 3 تا 30 کرکتر باشد")),
  text: Joi.string().error(createHttpError.BadRequest("متن ارسال شده صحیح نیست")),
  short_text : Joi.string().error(createHttpError.BadRequest("خلاصه متن ارسال شده صحیح نیست")),
  tags : Joi.array().min(0).max(20).error(createHttpError.BadRequest("برچسب نمیتواند بیش از 20 ایتم باشد")) ,
  category : Joi.string().regex(MONGO_ID_PATTERN).error(createHttpError.BadRequest("دسته بندی مورد نظر یافت نشد")) ,
  price : Joi.number().error(createHttpError.BadRequest("قیمت وارد شده صحیح نیست")) ,
  discount : Joi.number().error(createHttpError.BadRequest("تخفیف وارد شده صحیح نیست")) ,
  type : Joi.string().regex(/(free|cash|special)/i), // flag g baese error mishe nazar
  filename: Joi.string().regex(/(\.png|\.jpg|\.webp|\.jpeg|\.gif|\.jfif)$/).error(createHttpError.BadRequest("فرمت تصویر ارسال شده صحیح نیست")),
  fileUploadPath : Joi.allow(),
});

module.exports = {
    createCourseSchema,
};

