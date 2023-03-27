// step 9 :
const router = require('express').Router();
const homeController = require('../../http/controllers/api/home.controller');
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
 *              name: access-token
 *              example: Bearer YourToken...
 *      responses:
 *          200:
 *              description: success
 *              schema: 
 *                  type: string
 *                  example : Index Page Store
 *          404: 
 *              description: not Found
 */


router.get("/" , homeController.indexPage );

//name router pascal bashe
module.exports = {
  HomeRoutes : router
};
