// step 285 :
const Joi = require("@hapi/joi");
const { MONGO_ID_PATTERN } = require("../../../utils/constants");

// nokte permissions: Joi.allow() ==> vaghti b ye mored migi allow iani joi nemikhad validatesh kone faghat bzare bedone validate shodan kenare baghie bere
const createRoleSchema = Joi.object({
  title: Joi.string().min(3).max(30).error(new Error("عنوان نقش (رول) صحیح نیست")),
  permissions: Joi.array().items(Joi.string().pattern(MONGO_ID_PATTERN)).error(new Error("سطوح دسترسی های ارسال شده (پرمیشن) صحیح نیست")) //  یعنی یه ارایه میاد که توش استرینگهاییه که از این قانون تبعیت میکنه
});

module.exports = {
  createRoleSchema,
};
