const router = require("express").Router();
const {
  CategoryController,
} = require("../../http/controllers/admin/category.controller");

// step 60 :

/**
 * @swagger
 * tag: category(AdminPanel)
 * /admin/category/create:
 *  post:
 *      summary: craete new category title
 *      tags: [category(AdminPanel)]
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
 * tag: category(AdminPanel)
 * /admin/category/parents:
 *  get:
 *      summary: get all parent of category or category head
 *      tags: [category(AdminPanel)]
 *      responses:
 *          200:
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
 * tag: category(AdminPanel)
 * /admin/category/children/{parent}:
 *  get:
 *      summary: get all children of parents category
 *      tags: [category(AdminPanel)]
 *      parameters:
 *          -   in: path
 *              name: parent
 *              type: string
 *              required: true
 *      responses:
 *          200:
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
router.get(
  "/children/:parent",
  CategoryController.getChildrenOfParentsCategory
);

// step 71:

/**
 * @swagger
 * tag: category(AdminPanel)
 * /admin/category/all:
 *  get:
 *      summary: get all categories
 *      tags: [category(AdminPanel)]
 *      responses:
 *          200:
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
router.get("/all", CategoryController.getAllCategory);

// step 76 :

/**
 * @swagger
 * tag: category(AdminPanel)
 * /admin/category/remove/{id}:
 *  delete:
 *      summary: delete category with object-id
 *      tags: [category(AdminPanel)]
 *      parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *              required: true
 *      responses:
 *          202:
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

// step 75 :
router.delete("/remove/:id", CategoryController.removeCategory);

// step 84 :

/**
 * @swagger
 * tag: category(AdminPanel)
 * /admin/category/list-of-all:
 *  get:
 *      summary: get all categories whitout populate and nested structure
 *      tags: [category(AdminPanel)]
 *      responses:
 *          200:
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

// step 83 : in baiad balatar az marhalie 77 bashe chon onke param dare baiad akharin khat bashe
router.get("/list-of-all", CategoryController.getAllCategoriesWithoutPopulate);


// step 88:

/**
 * @swagger
 * tag: category(AdminPanel)
 * /admin/category/update/{id}:
 *  patch:
 *      summary: update title of category
 *      tags: [category(AdminPanel)]
 *      parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *              required: true
 *          -   in: formData
 *              name: title
 *              type: string
 *              required: true
 *      responses:
 *          200:
 *              description: success
 *          500:
 *              description: internal server error
 */

// step 87 : chon faghat ye parameter title ro darim avaz mikonim baiad patch bashe na put
router.patch("/update/:id", CategoryController.updateCategoryTitle);


// step 78 :

/**
 * @swagger
 * tag: category(AdminPanel)
 * /admin/category/{id}:
 *  get:
 *      summary: find category with object id
 *      tags: [category(AdminPanel)]
 *      parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *              required: true
 *      responses:
 *          200:
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

// step 77 :
router.get("/:id", CategoryController.getCategoryById);

// hamishe esme router ha pascal bashe
module.exports = {
  CategoryRoutes: router,
};
