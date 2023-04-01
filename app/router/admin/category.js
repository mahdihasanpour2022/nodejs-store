// step 59 :
const router = require("express").Router();
const {
  CategoryController,
} = require("../../http/controllers/admin/category.controller");

// step 60 :


/**
 * @swagger
 * tag: admin-panel
 * /admin/category/create:
 *  post:
 *      summary: craete new category title
 *      tags: [admin-panel]
 *      parameters:
 *          -   in: formData
 *              name: title
 *              type: string
 *              required: true
 *          -   in: formData
 *              name: parent
 *              type: string
 *              required: false
 *      responses:
 *          201:
 *              description: success
 *          400: 
 *              description: Bad Request
 *          401: 
 *              description: unauthorized
 *          404: 
 *              description: not Found
 *          500: 
 *              description: internal server error
 */



router.post("/create", CategoryController.createCategory);

// hamishe esme router ha pascal bashe
module.exports = {
  CategoryRoutes: router,
};
