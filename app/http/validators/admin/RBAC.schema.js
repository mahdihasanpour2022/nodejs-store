// step 285 :
const Joi = require("@hapi/joi");
const { MONGO_ID_PATTERN } = require("../../../utils/constants");

// nokte permissions: Joi.allow() ==> vaghti b ye mored migi allow iani joi nemikhad validatesh kone faghat bzare bedone validate shodan kenare baghie bere
const createRoleSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(30)
    .error(new Error("عنوان نقش (رول) صحیح نیست")),
  permissions: Joi.array().items(Joi.string().pattern(MONGO_ID_PATTERN)).error(new Error("سطوح دسترسی های ارسال شده (پرمیشن) صحیح نیست")), //  یعنی یه ارایه میاد که توش استرینگهاییه که از این قانون تبعیت میکنه// permissions: Joi.array().items(Joi.string()).error(new Error("سطوح دسترسی های ارسال شده (پرمیشن) صحیح نیست")) //  یعنی یه ارایه میاد که توش استرینگهاییه که از این قانون تبعیت میکنه
               
});

// step 290 :
const createPermissionSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(30)
    .error(new Error("عنوان سطح دسترسی (پرمیشن) صحیح نیست")),
  description: Joi.string()
    .min(0)
    .max(100)
    .error(new Error("توضیحات سطح دسترسی صحیح نیست")), //  یعنی یه ارایه میاد که توش استرینگهاییه که از این قانون تبعیت میکنه
});

module.exports = {
  createRoleSchema,
  createPermissionSchema,
};
