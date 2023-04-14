//step 131 :

const Joi = require("@hapi/joi");
const createHttpError = require("http-errors");
const { MONGO_ID_PATTERN } = require("../../../utils/constants");

const createProductSchema = Joi.object({
  title: Joi.string().min(3).max(30).error(createHttpError.BadRequest("عنوان ارسال شده صحیح نیست")),
  text: Joi.string().error(createHttpError.BadRequest("متن ارسال شده صحیح نیست")),
  short_text : Joi.string().error(createHttpError.BadRequest("خلاصه متن ارسال شده صحیح نیست")),

  tags : Joi.array().min(0).max(20).error(createHttpError.BadRequest("برچسب نمیتواند بیش از 20 ایتم باشد")) ,
  category : Joi.string().pattern(MONGO_ID_PATTERN).error(createHttpError.BadRequest("دسته بندی مورد نظر یافت نشد")) ,

  price : Joi.number().error(createHttpError.BadRequest("قیمت وارد شده صحیح نیست")) ,
  count : Joi.number().error(createHttpError.BadRequest("تعداد وارد شده صحیح نیست")) ,
  discount : Joi.number().error(createHttpError.BadRequest("تخفیف وارد شده صحیح نیست")) ,

  width  : Joi.number().allow( null , 0 , "" , " ", "0" ).error(createHttpError.BadRequest("عرض وارد شده صحیح نیست")) ,// allow(موارد ی که میپذیره خالی باشه یا نال باشه و ...)  
  height : Joi.number().allow( null , 0 , "" , " ", "0" ).empty().error(createHttpError.BadRequest("ارتفاع وارد شده صحیح نیست")) ,
  length : Joi.number().allow( null , 0 , "" , " ", "0" ).empty().error(createHttpError.BadRequest("طول وارد شده صحیح نیست")),
  weight : Joi.number().allow( null , 0 , "" , " ", "0" ).empty().error(createHttpError.BadRequest("وزن وارد شده صحیح نیست")),

  filename: Joi.string().pattern(/(\.png|\.jpg|\.webp|\.jpeg|\.gif|\.jfif)$/).error(createHttpError.BadRequest("فرمت تصویر ارسال شده صحیح نیست")),
  fileUploadPath : Joi.allow(),
});

module.exports = {
  createProductSchema,
};

