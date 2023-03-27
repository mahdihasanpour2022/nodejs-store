// step 44 : 

const createHttpError = require("http-errors");
const JWT = require("jsonwebtoken");
const { UserModel } = require("../models/users");

const { REFRESH_TOKEN_SECRET_KEY } = require("./constants");

function verifyRefreshToken(refreshtoken) {

  return new Promise((resolve, reject) => {

    JWT.verify(refreshtoken, REFRESH_TOKEN_SECRET_KEY, async (err, payload) => {
      if (err) reject(createHttpError.Unauthorized(" وارد1 حساب کاربری خود شوید."));
      const { mobile } = payload || {};
      const user = await UserModel.findOne({ mobile }, { password: 0, otp: 0 });
      if (!user) reject(createHttpError.Unauthorized("حساب کاربری یافت نشد"));
      resolve(mobile);
    });

  });

}

module.exports = {
  verifyRefreshToken,
};
