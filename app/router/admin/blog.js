// step 91 :
const { BlogController } = require("../../http/controllers/admin/blog.controller");

const router = require("express").Router();

// step 93 :

/**
 * @swagger
 * tag: blog(AdminPanel)
 * /admin/blogs:
 *  get:
 *      tags: [blog(AdminPanel)]
 *      summary: get all blogs
 *      responses:
 *          200:
 *              description: success - get array of blogs
 *          500:
 *              description: internal server error
 */


// step 92 :

router.get( "/" ,BlogController.getListOfBlogs )
module.exports = {
  BlogAdminApiRoutes : router
}