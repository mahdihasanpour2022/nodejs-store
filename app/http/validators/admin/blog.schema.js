// step 97: agar error dad kolan b jaie new Error bzar createHttpError.BadRequest

const Joi = require("@hapi/joi");
const { MONGO_ID_PATTERN } = require("../../../utils/constants");
const createHttpError = require("http-errors");
// file fileUploadPath ro dar multer ezafe kardima (line 27)
// b jaie image minevisim filename chom dar blog.controller.js esmesho gozashtim filename (line 12)
const createBlogSchema = Joi.object({
  title: Joi.string().min(3).max(30).error(createHttpError.BadRequest("عنوان ارسال شده صحیح نیست")),
  text: Joi.string().error(createHttpError.BadRequest("متن ارسال شده صحیح نیست")),
  short_text : Joi.string().error(createHttpError.BadRequest("خلاصه متن ارسال شده صحیح نیست")),
  filename: Joi.string().pattern(/(\.png|\.jpg|\.webp|\.jpeg|\.gif|\.jfif)$/).error(createHttpError.BadRequest("فرمت تصویر ارسال شده صحیح نیست")),
  tags : Joi.array().min(0).max(20).error(createHttpError.BadRequest("برچسب نمیتواند بیش از 20 ایتم باشد")) ,
  category : Joi.string().pattern(MONGO_ID_PATTERN).error(createHttpError.BadRequest("دسته بندی مورد نظر یافت نشد")) ,
  fileUploadPath : Joi.allow(),
});

// step 98 :
const updateBlogSchema = Joi.object({title: Joi.string().min(3).max(30).error(createHttpError.BadRequest("عنوان دسته بندی صحیح نیست"))});

module.exports = {
  createBlogSchema,
  updateBlogSchema
};