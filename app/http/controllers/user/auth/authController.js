// step 18 :
const createHttpError = require("http-errors");
const { UserModel } = require("../../../../models/users");
const { USER_ROLES, EXPIRES_IN } = require("../../../../utils/constants");
const { randomNumberGenerator } = require("../../../../utils/helperFunctions");
const { authSchema } = require("../../../validators/user/auth.schema");
const Controller = require("../../controller");

class UserAuthController extends Controller {
// inja miad req.body ro migire badesh check mikone bebine ghablan kasi ba in mobile hast dar db agar nabod yeki jadid bsaze  agar bod update user 
// faaal mishe check mikone k otp khali nabase k updateOne kone dar db agar khali bod otp delete mikone
// dar nahaiat save user iagar user dar db bode ghablan update mishe agar nabode sakhte mishe
// va dar getOtp agar javabe saveUser true bode bashe getOtp movaffagh va agar false bashe vororde namovaffagh

  async getOtp(req, res, next) {
    try {
      await authSchema.validateAsync(req.body);
      const { mobile } = req.body;
      // step 26 : create otp
      const code = randomNumberGenerator();
      const result = await this.saveUser(mobile, code);
      // if(!result) throw createHttpError.BadRequest("ورود شما ناموفق بود") //...or
      if (!result) throw createHttpError.Unauthorized("ورود شما ناموفق بود");
      return res.status(200).send({
        data: {
          statusCode: 200,
          message: "کد اعتبار سنجی با موفقیت برای شما ارسال شد.",
          code,
          mobile,
        },
        error : null
      });
    } catch (error) {
      next(createHttpError.BadRequest(error.message));
    }
  }

  //step 27 :
  async saveUser(mobile, code) {
    let otp = {
      code,
      expiresIn: EXPIRES_IN,
    };
    const result = await this.checkExistUser(mobile);

    if (result) {
      return await this.updateUser(mobile, { otp });
    }
    return !!(await UserModel.create({
      mobile,
      otp,
      Roles: [USER_ROLES],
    }));
  }

  // step 28 : check karadane inke mobile hast ya na
  async checkExistUser(mobile) {
    const result = await UserModel.findOne({ mobile });
    return !!result;
  }

  // step 29 ;
  async updateUser(mobile, objectData = {}) {
    // req.body validation
    Object.keys(objectData).forEach((key) => {
      if (["", " ", 0, null, undefined, "0", NaN].includes(objectData[key]))
        delete objectData[key];
    });
    const updateResult = await UserModel.updateOne(
      { mobile },
      { $set: objectData }
    );
    return !!updateResult.modifiedCount;
  }
}

module.exports = {
  UserAuthController: new UserAuthController(),
};
