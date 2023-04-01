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
 * /user/get-otp:
 *  post:
 *      summary: auth user get-otp endpoints
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

router.post("/get-otp", UserAuthController.getOtp);

// step 37 : dar yaml name baiad balatar az hame bashe va : ro dar akhare key ha bzar mesle tsgs

/**
 * @swagger
 * /user/check-otp:
 *      post:
 *          tags: [user-authentication]
 *          summary: check-otp-value in controller
 *          description: check otp with decode-mobile and expires date
 *          parameters:
 *          -   name: mobile
 *              description: fa-IRI phonenumber
 *              in: formData
 *              example: (09*********)
 *              type: string
 *              required: true
 *          -   name: code
 *              description: enter sms code recived
 *              in: formData
 *              required: true
 *              type: string
 *          responses:
 *              200:
 *                 description: success
 *              400:
 *                 description: bad request
 *              401:
 *                 description: unauthorization
 *              404:
 *                 description: not Found
 *              500:
 *                 description: internal server error
 */



// step 36 :
router.post("/check-otp", UserAuthController.checkOTP);


// step 46 : albate inja behtare to formData ersal bshe na body

/**
 * @swagger
 *  /user/refresh-token:
 *      post:
 *          tags: [user-authentication]
 *          summary: send refresh token for get new accessToken and refreshToken
 *          description:  refresh token
 *          parameters: 
 *          -     in: body
 *                name: refreshtoken
 *                example: {refreshtoken : your refreshtoken here...}
 *                requires: true
 *                type : string
 *          responses: 
 *                200:
 *                   description: Success
 *                400:
 *                   description: BadRequest
 *                401:
 *                   description: Unauthorized
 *                404:
 *                   description: Not Found
 *                500:
 *                   description: Internal Server Error
 */


// step 41 : create route for refresh-token
router.post('/refresh-token' , UserAuthController.refreshToken)


//name router pascal bashe
module.exports = {
  UserAuthRoutes: router,
};
