
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


// step 59 :
router.post("/create", CategoryController.createCategory);

// step 65 :

/**
 * @swagger
 * tag: admin-panel
 * /admin/category/parents:
 *  get:
 *      summary: get all parent of category or category head
 *      tags: [admin-panel]
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


// step 64 :
router.get("/parents", CategoryController.getAllParentsCategory);


// step 68 :
/**
 * @swagger
 * tag: admin-panel
 * /admin/category/children/{parent}:
 *  get:
 *      summary: get all children of parents category
 *      tags: [admin-panel]
 *      parameters:
 *          -   in: path
 *              name: parent
 *              type: string
 *              required: true
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

// step 69 :
router.get("/children/:parent" , CategoryController.getChildrenOfParentsCategory)


// step 71:

/**
 * @swagger
 * tag: admin-panel
 * /admin/category/all:
 *  get:
 *      summary: get all categories 
 *      tags: [admin-panel]
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

// step 72:
router.get("/all" , CategoryController.getAllCategory )

// hamishe esme router ha pascal bashe
module.exports = {
  CategoryRoutes: router,
};
