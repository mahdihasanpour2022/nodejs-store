
//step 127 : نام اسکیما همیشه پاسکال باشه
//  اگر در پراپرتی ها مثلا تگ رو در مدل اسکیما بصورت تایپ ارایه گذاشتی اینجا در پراپرتی تگ ها هم تایپش رو باید بزاری ارایه

// banary = یعنی همون فایل که برای عکس چون حداکثر 10 تا عکس رو میتونه در قالب آرایه ارسال کنه واسه محصولش


/**
 * @swagger
 *  components:
 *      schemas:
 *          Product_Types:
 *              type: string
 *              enum:
 *                  -   physical
 *                  -   virtual
 */

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
 *                  -   type
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
 *                  type:
 *                      $ref: '#/components/schemas/Product_Types'
 *                  images:
 *                      type: array
 *                      description: images of product
 *                      items:
 *                          type: string
 *                          format: binary
 *                  width:
 *                      type: number
 *                      description: the width of product packet
 *                      example: 0
 *                  height:
 *                      type: number
 *                      description: the height of product packet
 *                      example: 0
 *                  length:
 *                      type: number
 *                      description: the length of product packet
 *                      example: 0
 *                  weight:
 *                      type: number
 *                      description: the weight of product packet
 *                      example: 0
 */

// step 151 : این واسه ادیت پروداکته که چند تا از فیلدهاش مثل ساخت محصول الزامی (ریکوایر) نباشه
// اگر میخوای همه موارد قابل ادیت نباشه اونایی که نمیخوای قابل ادیت باشن رو از قسمت پراپرتیز بردار  

/**
 * @swagger
 *  components:
 *      schemas:
 *          Edit_Product:
 *              type: object
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
 *                      example: 0
 *                  height:
 *                      type: number
 *                      description: the height of product packet
 *                      example: 0
 *                  length:
 *                      type: number
 *                      description: the length of product packet
 *                      example: 0
 *                  weight:
 *                      type: number
 *                      description: the weight of product packet
 *                      example: 0
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

// step 141 :

/**
 * 
 * @swagger
 * /admin/products/remove/{id}:
 *  delete:
 *      tags: [ product(AdminPanel) ]
 *      summary: delete all products
 *      parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *              descripion: productId of product
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


//step 135 : requestBody  vase get nazar vase post patch ,...  faghat bzar

// step 145 : اضافه کردن پارامتر سرچ بر اساس  متن (تکست)در کویری درخواستی که سواگر یا فرانت میخواد برای ما(بک اند) بفرسته


/**
 * @swagger
 * /admin/products/all:
 *  get:
 *      tags: [ product(AdminPanel) ]
 *      summary: get all products
 *      parameters:
 *          -   in: query
 *              name: search
 *              type: string
 *              description: write entire word for search in title , text , short_text (product)
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


// step 150 :

/**
 * @swagger
 * /admin/products/edit/{id}:
 *  patch:
 *      tags: [ product(AdminPanel) ]
 *      summary: edit product with id
 *      parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *              description: product id for edit
 *              require: true 
 *      requestBody:
 *          required: true
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      $ref: '#/components/schemas/Edit_Product'
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

// step 138 :


/**
 * @swagger
 * /admin/products/{id}:
 *  get:
 *      tags: [ product(AdminPanel) ]
 *      summary: get one products
 *      description: find product by ID 
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
