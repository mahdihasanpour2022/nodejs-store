const createHttpError = require("http-errors");
const JWT = require("jsonwebtoken");
const { UserModel } = require("../models/users");
const { SECRET_KEY } = require("./constants");

// step 25 :
function randomNumberGenerator() {
  return +Math.floor(Math.random() * 90000)
    .toString()
    .slice(0, 5);
}

// step 33 : yarn add jsonwebtoken k userId RO MIGIRE va user ro dar db find mikone va datasho bar midare ta token bsaze barash
function CreateJWTToken(userId) {
  
  // way 01 : with async await
  // return new Promise( (resolve, reject) => {
  // const user = UserModel.findById({ userId });

  // way 02 : without async await
  return new Promise((resolve, reject) => {
    const user = UserModel.findById({ userId });

    const payload = {
      mobile: user.mobile,
      userID: user._id,
    };
    const options = { expiresIn: "1h" };

    // JWT.sign({payload} , SECRET_KEY , {options} , (err , token)=>{ callback function })
    JWT.sign(payload, SECRET_KEY, options, (err, token) => {
      if (err)
        reject(
          createHttpError.InternalServerError(
            "خطای سمت سرور برای ساخت توکن رخ داده است."
          )
        );
      resolve(token);
    });
  });
}

module.exports = {
  randomNumberGenerator,
  CreateJWTToken,
};
