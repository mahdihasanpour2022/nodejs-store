const {
  ProductController,
} = require("../../http/controllers/admin/product.controller");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const { uploadFile } = require("../../utils/multer");

// step 126 : create route for product
const router = require("express").Router();

//step 127 : نام اسکیما همیشه پاسکال باشه
//  اگر در پراپرتی ها مثلا تگ رو در مدل اسکیما بصورت تایپ ارایه گذاشتی اینجا در پراپرتی تگ ها هم تایپش رو باید بزاری ارایه

// banary = یعنی همون فایل که برای عکس چون حداکثر 10 تا عکس رو میتونه در قالب آرایه ارسال کنه واسه محصولش
/**
 * @swagger
 *  components:
 *      schemas:
 *          Product:
 *              type: object
 *              required:
 *                  -   title
 *                  -   text
 *                  -   short_text
 *                  -   tags
 *                  -   price
 *                  -   category
 *                  -   count
 *                  -   discount
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of product
 *                  text:
 *                      type: string
 *                      description: the text of product
 *                  short_text:
 *                      type: string
 *                      description: the summary of text of product
 *                  tags:
 *                      type: array
 *                      description: tags of products
 *                  category:
 *                      type: string
 *                      description: the id of Category for foreignField in product
 *                  price:
 *                      type: number
 *                      description: price of product
 *                  count:
 *                      type: number
 *                      description: count of product
 *                  discount:
 *                      type: number
 *                      description: discount of product
 *                  images:
 *                      type: array
 *                      description: images of product
 *                      items:
 *                          type: string
 *                          format: binary
 *                  width:
 *                      type: number
 *                      description: the width of product packet
 *                  height:
 *                      type: number
 *                      description: the height of product packet
 *                  length:
 *                      type: number
 *                      description: the length of product packet
 *                  weight:
 *                      type: number
 *                      description: the weight of product packet
 */

//step 130 : وقتی میخوای فرم ارسال کنی چند تا پراپرتی تو فرمته و فایل مثل عکس همراهشه پس کانتنت رو بزار مالتیپارت فرم دیتا

/**
 * @swagger
 * /admin/products/create:
 *  post:
 *      tags: [ product(AdminPanel) ]
 *      summary: craete new product
 *      requestBody:
 *          required: true
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      $ref: '#/components/schemas/Product'
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

// وقتی میخوای عکس بفرستی برای بک اند از این فانکشن آپلود فایل که نوشتی استفاده کن همیشه
router.post(
  "/create",
  uploadFile.array("images" , 10), // 10 iani maxCount iani hadeaksar 10 ta ax mitone upload kone
  stringToArray("tags"),
  ProductController.createProduct
);
// router.patch("/", ProductController);
// router.delete("/", ProductController);
// router.get("/", ProductController);
// router.get("/", ProductController);

//step 135 : requestBody  vase get nazar vase post patch ,...  faghat bzar

/**
 * @swagger
 * /admin/products/all:
 *  get:
 *      tags: [ product(AdminPanel) ]
 *      summary: get all products
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


//step 134 :
router.get("/all", ProductController.getAllProducts) 



module.exports = {
  Product_AdminApiRoutes: router,
};
