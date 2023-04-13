// step 44 : 

const createHttpError = require("http-errors");
const JWT = require("jsonwebtoken");
const { UserModel } = require("../models/users");
const { REFRESH_TOKEN_SECRET_KEY } = require("./constants");
const redisClient = require("./init_redis");

function verifyRefreshToken(refreshtoken) {
  return new Promise((resolve, reject) => {

    JWT.verify(refreshtoken, REFRESH_TOKEN_SECRET_KEY, async (err, payload) => { 
      if (err) reject(createHttpError.Unauthorized(" وارد1 حساب کاربری خود شوید."));
      const { mobile } = payload || {};
      const user = await UserModel.findOne({ mobile }, { password: 0, otp: 0 });
      if (!user) reject(createHttpError.Unauthorized("حساب کاربری یافت نشد"));

      // step 52 : aval baiad bgirim refresh tokeni k to redis zakhire shode va moghaiese konim ba refresh tokeni k to 
      // const redisRefreshToken = await redisClient.get(String(user?._id));
      const redisRefreshToken = await redisClient.get(String(user?._id || "key_default"));
      if(!redisRefreshToken) reject( createHttpError.Unauthorized("ورود مجدد به حساب کابری نشد.") );
      if( refreshtoken === redisRefreshToken ) return resolve(mobile);
      reject( createHttpError.Unauthorized("ورود مجدد به حساب کابری انجام نشد.") );
    });
  });
}

module.exports = {
  verifyRefreshToken,
};
