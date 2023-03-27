const {
  UserAuthController,
} = require("../../http/controllers/user/auth/authController");

// step 19 :
const router = require("express").Router();

// step 24 : write this base on yaml language

/**
 * @swagger
 * tags:
 *  name: user-authentication
 *  description :  اندپوینت های احراز هویت کاربر 
 */

/**
 * @swagger
 * /user/login:
 *  post:
 *      summary: auth user login endpoints 
 *      tags: [user-authentication]
 *      description :  (otp) گرفتن رمز یکبار مصرف
 *      parameters:
 *          -   in: formData
 *              name: mobile
 *              description: fa-IRI phonenumber
 *              example: (09*********)
 *              type: string
 *              required: true
 *      responses:
 *          200:
 *              description: success
 *          400:
 *              description: bad request
 *          401:
 *              description: unauthorization
 *          404: 
 *              description: not Found
 *          500: 
 *              description: internal server error
 */


router.post("/login", UserAuthController.getOtp);

//name router pascal bashe
module.exports = {
  UserAuthRoutes: router,
};
