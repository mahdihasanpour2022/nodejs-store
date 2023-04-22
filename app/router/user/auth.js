const {UserAuthController} = require("../../http/controllers/user/auth/authController");
const router = require("express").Router();

// step 19 :
router.post("/get-otp", UserAuthController.getOtp);

// step 36 :
router.post("/check-otp", UserAuthController.checkOTP);

// step 41 : create route for refresh-token
router.post("/refresh-token", UserAuthController.refreshToken);

//name router pascal bashe
module.exports = {
  UserAuthRoutes: router,
};
