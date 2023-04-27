// step 206 :

const Joi = require("@hapi/joi");
const createHttpError = require("http-errors");
const { MONGO_ID_PATTERN } = require("../../../utils/constants");
// b jaie regex mitoni benevisi pattern ama regex behtare

// be model course deghat kon faghat 4 ta mored dare amma inja chnata ezafetar dare dar vaghe inha mavaredi hastan k karbar baiad befreste 
const createEpisodeSchema = Joi.object({
  title: Joi.string().min(3).max(30).error(createHttpError.BadRequest("عنوان ارسال شده باید بین 3 تا 30 کرکتر باشد")),
  text: Joi.string().error(createHttpError.BadRequest("متن ارسال شده صحیح نیست")),
  type : Joi.string().regex(/(lock|unlock)/i), // flag g baese error mishe nazar

  courseID : Joi.string().regex(MONGO_ID_PATTERN).error(createHttpError.BadRequest("شناسه دوره مورد نظر صحیح نمی باشد")),
  chapterID : Joi.string().regex(MONGO_ID_PATTERN).error(createHttpError.BadRequest("شناسه فصل مورد نظر صحیح نمی باشد")),

  filename: Joi.string().regex(/(\.mp4|\.mpg|\.mov|\.mkv|\.avi)$/).error(createHttpError.BadRequest("فرمت ویدئو ارسال شده صحیح نیست")),
  fileUploadPath : Joi.allow(),
});

module.exports = {
    createEpisodeSchema,
};
 