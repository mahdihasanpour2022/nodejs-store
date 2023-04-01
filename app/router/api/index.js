// step 9 :
const router = require('express').Router();
const homeController = require('../../http/controllers/api/home.controller');
const { verifyAccessToken } = require('../../http/middlewares/verifyAccessToken');
// step 23 : write this base on yaml language

/**
 * @swagger
 * tags:
 *  name: index-Page
 *  description :  اندپوینت های صفحه اصلی 
 */

/**
 * @swagger
 * tag: index-Page
 * /:
 *  get:
 *      summary: index of routes 
 *      tags: [index-Page]
 *      description : get all need data for index page
 *      parameters:
 *          -   in: header
 *              name: accesstoken
 *              description: enter accessToken for auth
 *              example: Bearer your token
 *              type: string
 *              required: true
 *              default : Bearer 
 *      responses:
 *          200:
 *              description: success
 *              schema: 
 *                  type: string
 *                  example : Index Page Store
 *          404: 
 *              description: not Found
 */

// step 39 : add verifyAccessToken hala dar swagger test kon '/'
router.get("/" ,verifyAccessToken, homeController.indexPage );

//name router pascal bashe
module.exports = {
  HomeRoutes : router
};
