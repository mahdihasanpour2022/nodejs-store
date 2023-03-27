// step 38 : jwt check kardane accessToken
// more detail in  ==>  https://www.npmjs.com/package/jsonwebtoken

const createHttpError = require("http-errors");
const JWT = require("jsonwebtoken");
const { UserModel } = require("../../models/users");
const { ACCESS_TOKEN_SECRET_KEY } = require("../../utils/constants");

function verifyAccessToken(req, res, next) {
  //req iani chizi k az swagger ya az clintside front mifreste
  // const headers = req.headers;
  // Bearer token ba split(" ") part 2 mishe token iani [1]
  // va baiad Bearer dashte bashe iani frontend kar befreste
  // const token = headers?.accessToken?.split(" ")?.[1];
  // console.log(req.headers) // inja table gereftam famidam k accesstoken ba t kochike
  const [Bearer, token] = req.headers?.accesstoken?.split(" ") || [];

  // if (token && ['Bearer','Bearer'].includes(Bearer?.toLowerCase())) {
  if (!!token && !!(Bearer?.toLowerCase() === "bearer")) {
    // JWT.verfiy(token , ACCESS_TOKEN_SECRET_KEY , (err , payload)=>{ call back function })
    JWT.verify(token, ACCESS_TOKEN_SECRET_KEY, async (err, payload) => {
      if (err)
        return next(
          createHttpError.Unauthorized(" وارد1 حساب کاربری خود شوید.")
        );
      const { mobile } = payload || {};
      const user = await UserModel.findOne({ mobile }, { password: 0, otp: 0 });
      // if(!user) throw createHttpError.Unauthorized("حساب کاربری یافت نشد"); // throw nakon cors error mide , next kon
      if (!user) next(createHttpError.Unauthorized("حساب کاربری یافت نشد"));
      req.user = user;
      // inja baiad return konim k az function kharej bshe va nare khate badi
      return next();
    });
  } else
    return next(createHttpError.Unauthorized(" وارد2 حساب کاربری خود شوید."));
}

module.exports = {
  verifyAccessToken,
};
