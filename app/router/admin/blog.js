// step 91 :
const { AdminBlogController} = require("../../http/controllers/admin/blog.controller");
const { uploadFile } = require("../../utils/multer");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const router = require("express").Router();

// step 122 :

/**
 * @swagger
 *  components:
 *      schemas:
 *          Blog:
 *              type: object
 *              required:
 *                  -   title
 *                  -   text
 *                  -   short_text
 *                  -   image
 *                  -   category
 *                  -   tags
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of blog
 *                  text:
 *                      type: string
 *                      description: the text of blog
 *                  short_text:
 *                      type: string
 *                      description: the summary of text of blog
 *                  image:
 *                      type: file
 *                      description: index pictures of blogs
 *                  category:
 *                      type: string
 *                      description: the id of Category for foreignField in blog
 *                  tags:
 *                      type: string
 *                      description: the list of tags for example ( tag1#tag2)
 */



// step 96 : agar har masiri ro to parametersesh token ro require kone faghat vase login shodeha namaiesh mide

/**
 * @swagger
 * tag: blog(AdminPanel)
 * /admin/blogs/create:
 *      post:
 *          tags: [blog(AdminPanel)]
 *          summary: create blog document
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Blog'
 *          responses:
 *              200:
 *                  description: success - blog created
 *              400:
 *                  description: Bad Request
 *              401:
 *                  description: unauthorized
 *              404:
 *                  description: not Found
 *              500:
 *                  description: internal server error
*/

// step 95 :  // middleware k sakhtimo mizarim sare rahesh
router.post("/create",uploadFile.single("image") ,stringToArray("tags"),AdminBlogController.createBlog);

// step 115 :
/**
 * @swagger
 * tag: blog(AdminPanel)
 * /admin/blogs/update/{id}:
 *  patch:
 *      tags: [blog(AdminPanel)]
 *      summary: update blog by tag
 *      consumes:
 *           - multipart/form-data
 *      parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *              required: true
 *          -   in: formData
 *              name: title
 *              type: string
 *              required: false
 *          -   in: formData
 *              name: text
 *              type: string
 *              required: false
 *          -   in: formData
 *              name: short_text
 *              type: string
 *              required: false
 *          -   in: formData
 *              name: image
 *              type: file
 *              required: false
 *          -   in: formData
 *              name: category
 *              description: enter category ID
 *              type: string
 *              required: false
 *          -   in: formData
 *              name: tags
 *              example: .#tag1#tag2#tag3#tag4 || string || undefined
 *              type: string
 *              required: false
 *      responses:
 *          200:
 *              description: success - blog created
 *          400:
 *              description: Bad Request
 *          401:
 *              description: unauthorized
 *          404:
 *              description: not Found
 *          500:
 *              description: internal server error
*/

// step 114 :  // middleware k sakhtimo mizarim sare rahesh
router.patch("/update/:id",uploadFile.single("image") ,stringToArray("tags"),AdminBlogController.updateBlogById);

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
 *          400:
 *              description: Bad Request
 *          401:
 *              description: unauthorized
 *          403:
 *              description: Forbidden
 *          404:
 *              description: not Found
 *          500:
 *              description: internal server error
*/

// step 92 :

router.get("/", AdminBlogController.getListOfBlogs);

// step 109 :

/**
 * @swagger
 * tag: blog(AdminPanel)
 * /admin/blogs/{id}:
 *  get:
 *      tags: [blog(AdminPanel)]
 *      summary: get blog by id and populate with this field
 *      parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *              required: true
 *      responses:
 *          200:
 *              description: success - get array of blogs
 *          400:
 *              description: Bad Request
 *          401:
 *              description: unauthorized
 *          404:
 *              description: not Found
 *          500:
 *              description: internal server error
*/

// step 108 : INI K PARAM ID DARE BAIAD AKHARIN khat bashe
router.get("/:id" , AdminBlogController.getOneBlogById );

// step 112 :

/**
 * @swagger
 * tag: blog(AdminPanel)
 * /admin/blogs/{id}:
 *  delete:
 *      tags: [blog(AdminPanel)]
 *      summary: delete blog by id 
 *      parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *              required: true
 *      responses:
 *          200:
 *              description: success - get array of blogs
 *          400:
 *              description: Bad Request
 *          401:
 *              description: unauthorized
 *          404:
 *              description: not Found
 *          500:
 *              description: internal server error
 */
// step 111 :
 router.delete("/:id" , AdminBlogController.deleteBlogById)

module.exports = {
  Blog_AdminApiRoutes: router,
};
