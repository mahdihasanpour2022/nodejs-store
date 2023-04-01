// step 58 : validation parametrhaie categori
const Joi = require("@hapi/joi");
const { MONGO_ID_PATTERN } = require("../../../utils/constants");

// google kon baraie regex for objectId va dar constant gharar bede    ==>  allow("") ejaze mide khali befreste
// khali bodane title ro badan erroresho benvis
// parent iani ye id k dar mongo zakhire mishe b name objectId k 
const createCategorySchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(30)
    .error(new Error("عنوان دسته بندی صحیح نیست")),
  parent: Joi.string()
    .pattern(MONGO_ID_PATTERN)
    .allow("")
    .error(new Error("شناسه والد وارد شده صحیح نیست")),
});

module.exports = {
  createCategorySchema,
};
