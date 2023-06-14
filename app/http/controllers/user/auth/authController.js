// step 18 :
const createHttpError = require("http-errors");
const { UserModel } = require("../../../../models/users");
const { ROLES } = require("../../../../utils/constants");
const { CreateAccessToken } = require("../../../../utils/createAccessToken");
const { createRefreshToken } = require("../../../../utils/createRefreshToken");
const {
  randomNumberGenerator,
} = require("../../../../utils/randomNumberGenerator");
const { verifyRefreshToken } = require("../../../../utils/verifyRefreshToken");

const {
  getOtpSchema,
  checkOtpSchema,
} = require("../../../validators/user/auth.schema");
const Controller = require("../../controller");
const { ghasedakSendSMS } = require("../../../../utils/ghasedakSendSMS.js");
const { StatusCodes } = require("http-status-codes");

class UserAuthController extends Controller {
  // inja miad req.body ro migire badesh check mikone bebine ghablan kasi ba in mobile hast dar db agar nabod yeki jadid bsaze  agar bod update user
  // faaal mishe check mikone k otp khali nabase k updateOne kone dar db agar khali bod otp delete mikone
  // dar nahaiat save user iagar user dar db bode ghablan update mishe agar nabode sakhte mishe
  // va dar getOtp agar javabe saveUser true bode bashe getOtp movaffagh va agar false bashe vororde namovaffagh

  async getOtp(req, res, next) {
    try {
      await getOtpSchema.validateAsync(req.body);
      const { mobile } = req.body;
      // step 26 : create otp
      const code = randomNumberGenerator();
      //step 25-1 : send sms otp
      if (mobile && code) ghasedakSendSMS(mobile, code);
      const result = await this.saveUser(mobile, code);
      // if(!result) throw createHttpError.BadRequest("ورود شما ناموفق بود") //...or
      if (!result) throw createHttpError.Unauthorized("ورود شما ناموفق بود");
      return res.status(StatusCodes.OK).send({
        statusCode: StatusCodes.OK,
        message: "کد اعتبار سنجی با موفقیت برای شما ارسال شد.",
        data: {
          code,
          mobile,
        },
        error: null,
      });
    } catch (error) {
      next(error);
      return res.json({
        statusCode: StatusCodes.BAD_REQUEST,
        isSuccess: false,
        data: null,
        error,
      });
    }
  }

  //step 27 :
  async saveUser(mobile, code) {
    let otp = {
      code,
      expiresIn: new Date().getTime() + 120000,
    };
    const result = await this.checkExistUser(mobile);

    if (result) {
      return await this.updateUser(mobile, { otp });
    }
    return !!(await UserModel.create({
      mobile,
      otp,
      Role: ROLES.USER, // اینجا برای همه رول پیش فرض یوزر رو ست کردیم
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

  // step 32 : check otp
  async checkOTP(req, res, next) {
    try {
      await checkOtpSchema.validateAsync(req.body);

      const { mobile, code } = req.body;
      const user = await UserModel.findOne({ mobile });

      // check kardane vojode karbari ba in moobile
      if (!user)
        throw createHttpError.NotFound("کاربری با این شماره موبایل یافت نشد..");
      // check kardane code dar otp
      if (user.otp.code != code)
        throw createHttpError.Unauthorized("کد ارسال شده صحیح نمی باشد.");
      // check kardane expiresIn dar otp
      const now = Date.now();
      if (user.otp.exports < now)
        throw createHttpError.Unauthorized("کد شما منقضی شده است.");
      // step 35 : use CreateJWTToken
      const accessToken = await CreateAccessToken(user._id);
      // step 45 :
      const refreshToken = await createRefreshToken(user._id);

      return res.json({
        statusCode: StatusCodes.OK,
        isSuccess: true,
        data: {
          accessToken,
          refreshToken,
          message: "توکن با موفقیت ارسال شد",
        },
        error: null,
      });
    } catch (error) {
      next(error);
      return res.json({
        statusCode: StatusCodes.BAD_REQUEST,
        isSuccess: false,
        data: null,
        error,
      });
    }
  }

  //step 42 :
  async refreshToken(req, res, next) {
    try {
      const { refreshtoken } = req.body;
      const mobile = await verifyRefreshToken(refreshtoken);
      const user = await UserModel.findOne({ mobile });
      if (!user) next(createHttpError.Unauthorized("کاربر یافت نشد."));
      const accessToken = await CreateAccessToken(user._id);
      const newRefreshToken = await createRefreshToken(user._id);
      return res.json({
        statusCode: StatusCodes.OK,
        isSuccess: true,
        data: {
          accessToken,
          refreshToken: newRefreshToken,
          message: "رفرش توکن و توکن جدید با موفقیت ساخته شد.",
        },
        error: null,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = {
  UserAuthController: new UserAuthController(),
};
