const {UserAuthController} = require("../../http/controllers/user/auth/authController");

// step 19 :
const router = require("express").Router();

// step 118 :  ba in kar dar akhare swagger dar browser schema marbote ezafe mishe

/**
 * @swagger
 *  components:
 *      schemas:
 *          GetOTP:
 *              type: object
 *              required:
 *                  -   mobile
 *              properties:
 *                  mobile:
 *                      type: string
 *                      description: the user mobile for signup/signin
 *          CheckOTP:
 *              type: object
 *              required:
 *                  -   mobile
 *                  -   code
 *              properties:
 *                  mobile:
 *                      type: string
 *                      description:  user mobile and code otp for signup/signin
 *                  code:
 *                      type: integer
 *                      description: reviced code from getOTP
 *          RefreshToken:
 *              type: object
 *              required:
 *                  -   refreshtoken
 *              properties:
 *                  refreshtoken:
 *                      type: string
 *                      description: enter refreshtoken for get fresh token and refreshtoken
 */


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
 *      requestBody:
 *          required: true
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/GetOTP'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/GetOTP'
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

// step 37 : dar yaml name baiad balatar az hame bashe va : ro dar akhare key ha bzar mesle tsgs => tag summary va ... bauad dar ye fasele az chap bashan

/**
 * @swagger
 * /user/check-otp:
 *  post:
 *      tags: [user-authentication]
 *      summary: check-otp-value in controller
 *      description: check otp with decode-mobile and expires date
 *      requestBody:
 *          required: true
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/CheckOTP'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/CheckOTP'
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



// step 36 :
router.post("/check-otp", UserAuthController.checkOTP);


// step 46 : albate inja behtare to formData ersal bshe na body

/**
 * @swagger
 *  /user/refresh-token:
 *    post:
 *      tags: [user-authentication]
 *      summary: send refresh token for get new accessToken and refreshToken
 *      description:  refresh token
 *      requestBody:
 *          required: true
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/RefreshToken'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/RefreshToken'
 *      responses: 
 *          200:
 *              description: Success
 *          400:
 *              description: BadRequest
 *          401:
 *              description: Unauthorized
 *          404:
 *              description: Not Found
 *          500:
 *              description: Internal Server Error
 */


// step 41 : create route for refresh-token
router.post('/refresh-token' , UserAuthController.refreshToken)


//name router pascal bashe
module.exports = {
  UserAuthRoutes: router,
};
