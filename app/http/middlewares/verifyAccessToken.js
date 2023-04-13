// step 38 : jwt check kardane accessToken
// more detail in  ==>  https://www.npmjs.com/package/jsonwebtoken

const createHttpError = require("http-errors");
const JWT = require("jsonwebtoken");
const { UserModel } = require("../../models/users");
const { ACCESS_TOKEN_SECRET_KEY } = require("../../utils/constants");

function getToken(headers) {
  //req iani chizi k az swagger ya az clintside front mifreste
  // const headers = req.headers;
  // Bearer token ba split(" ") part 2 mishe token iani [1]
  // va baiad Bearer dashte bashe iani frontend kar befreste
  // const token = headers?.accessToken?.split(" ")?.[1];
  // console.log(req.headers) // inja table gereftam famidam k accesstoken ba t kochike
  const [Bearer, token] = headers?.accesstoken?.split(" ") || [];
  // if (token && ['Bearer','Bearer'].includes(Bearer?.toLowerCase())) {
  if (!!token && !!(Bearer?.toLowerCase() === "bearer")) return token;
  throw createHttpError.Unauthorized(
    "احراز هویت حساب کاربری شما ناموفق بود، لطفا وارد حساب کاربری خود شوید"
  );
}

function verifyAccessToken(req, res, next) {
  try {
    const token = getToken(req.headers);
    // JWT.verfiy(token , ACCESS_TOKEN_SECRET_KEY , (err , payload)=>{ call back function })
    JWT.verify(token, ACCESS_TOKEN_SECRET_KEY, async (err, payload) => {
      try { // dar jwt az try catch use kon
        if (err)
          throw createHttpError.Unauthorized(" وارد1 حساب کاربری خود شوید.");
        const { mobile } = payload || {};
        const user = await UserModel.findOne(
          { mobile },
          { password: 0, otp: 0 } // hazfe in mavared
        );
        // if(!user) throw createHttpError.Unauthorized("حساب کاربری یافت نشد"); // throw nakon cors error mide , next kon
        if (!user) throw createHttpError.Unauthorized("حساب کاربری یافت نشد");
        req.user = user;
        // inja baiad return konim k az function kharej bshe va nare khate badi
        return next();
      } catch (error) {
        next(error);
      }
    });
  } catch (error) {
    next(error);
  }
}

// ye closure ast k baiad bad az verify access token bashe iani agar ehraze hoviat shod hala rolesho bebinim chie
function checkRole(role) {
  return function (req, res, next) {
    try {
      const user = req.user;
      // console.log("user :", user);
      if (user.Roles.includes(role)) return next();
      throw createHttpError.Forbidden(
        "شما نمیتوانید به این سطح دسترسی داشته باشید "
      ); // Forbidden iani hamon 403 iani mahdodiate dastrasi
    } catch (error) {
      next(error);
    }
  };
}

module.exports = {
  verifyAccessToken,
  checkRole,
};
