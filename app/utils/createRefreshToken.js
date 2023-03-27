// step 43 :
const createHttpError = require("http-errors");
const JWT = require("jsonwebtoken");
const { UserModel } = require("../models/users");
const {  REFRESH_TOKEN_SECRET_KEY } = require("./constants");


function createRefreshToken(userId){

  return new Promise(async (resolve, reject) => {
    const user =await UserModel.findById(userId); // dar {userId} nade
    // userID: user._id, // id momkene az nazare amniati moshkel saz beshe dar payload nade
    const payload = {
      mobile: user.mobile,
    };
    const options = { expiresIn: "1y" }; // iani 1 saal

    // JWT.sign({payload} , SECRET_KEY , {options}, { algorithm: 'RS256' } ,{ expiresIn: '1h' } , (err , token)=>{ callback function })
    JWT.sign( payload , REFRESH_TOKEN_SECRET_KEY, options, (err, token) => {
      if (err) {
        reject(
          createHttpError.InternalServerError(
            "خطای سمت سرور برای ساخت رفرش توکن رخ داده است."
          )
        );
      }
      resolve(token);
    });
  });

};

module.exports = {
  createRefreshToken
}