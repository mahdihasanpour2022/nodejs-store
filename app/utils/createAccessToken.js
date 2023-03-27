const createHttpError = require("http-errors");
const JWT = require("jsonwebtoken");
const { UserModel } = require("../models/users");
const { ACCESS_TOKEN_SECRET_KEY } = require("./constants");

// step 33 : yarn add jsonwebtoken k userId RO MIGIRE va user ro dar db find mikone va datasho bar midare ta payload ro hash kone va tabdil b token beshe
function CreateAccessToken(userId) {
  return new Promise(async (resolve, reject) => {
    const user =await UserModel.findById(userId); // dar {userId} nade
    // userID: user._id, // id momkene az nazare amniati moshkel saz beshe dar payload nade
    const payload = {
      mobile: user.mobile,
    };
    const options = { expiresIn: "1h" };

    // JWT.sign({payload} , SECRET_KEY , {options}, { algorithm: 'RS256' } ,{ expiresIn: '1h' } , (err , token)=>{ callback function })
    JWT.sign( payload , ACCESS_TOKEN_SECRET_KEY, options, (err, token) => {
      if (err) {
        reject(
          createHttpError.InternalServerError(
            "خطای سمت سرور برای ساخت توکن رخ داده است."
          )
        );
      }
      resolve(token);
    });
  });
}

module.exports = {
  CreateAccessToken,
};
