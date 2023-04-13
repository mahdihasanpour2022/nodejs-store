// step 91 :
const { AdminBlogController} = require("../../http/controllers/admin/blog.controller");
const { uploadFile } = require("../../utils/multer");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const router = require("express").Router();

// step 109 :

/**
 * @swagger
 * tag: blog(AdminPanel)
 * /admin/blogs/{id}:
 *  get:
 *      tags: [blog(AdminPanel)]
 *      summary: get blog by id and populate with this field
 *      parameters:
 *          -   in: header
 *              name: accesstoken
 *              example: Bearer token
 *              value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTIxNzEwMTcwMCIsImlhdCI6MTY4MTM3MjY2MSwiZXhwIjoxNjgxMzc2MjYxfQ.WxwoAiRX9KypicQfkEqiFJPJ-ifrJOLw2I4MNzWmC3s
 *              type: string
 *              required: true
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

// step 108 :
router.get("/:id" , AdminBlogController.getOneBlogById );

// step 96 : agar har masiri ro to parametersesh token ro require kone faghat vase login shodeha namaiesh mide

/**
 * @swagger
 * tag: blog(AdminPanel)
 * /admin/blogs/create:
 *  post:
 *      tags: [blog(AdminPanel)]
 *      summary: create blog document
 *      consumes:
 *           - multipart/form-data
 *           - application/x-www-form-data-urlencoded
 *      parameters:
 *          -   in: header
 *              name: accesstoken
 *              example: Bearer token
 *              type: string
 *              required: true
 *          -   in: formData
 *              name: title
 *              type: string
 *              required: true
 *          -   in: formData
 *              name: text
 *              type: string
 *              required: true
 *          -   in: formData
 *              name: short_text
 *              type: string
 *              required: true
 *          -   in: formData
 *              name: image
 *              type: file
 *              required: true
 *          -   in: formData
 *              name: category
 *              description: enter category ID
 *              type: string
 *              required: true
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

// step 95 :  // middleware k sakhtimo mizarim sare rahesh
router.post("/create",uploadFile.single("image") ,stringToArray("tags"),AdminBlogController.createBlog);


// step 93 :

/**
 * @swagger
 * tag: blog(AdminPanel)
 * /admin/blogs:
 *  get:
 *      tags: [blog(AdminPanel)]
 *      summary: get all blogs
 *      parameters:
 *          -   in: header
 *              name: accesstoken
 *              example: Bearer token
 *              value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTIxNzEwMTcwMCIsImlhdCI6MTY4MTM3MjY2MSwiZXhwIjoxNjgxMzc2MjYxfQ.WxwoAiRX9KypicQfkEqiFJPJ-ifrJOLw2I4MNzWmC3s
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

// step 92 :

router.get("/", AdminBlogController.getListOfBlogs);




module.exports = {
  BlogAdminApiRoutes: router,
};
