// ------------------------------------------------------------------  Create blog swagger

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
 *          summary: create blog
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Blog'
 *          responses:
 *              200:
 *                  description: success - blog created
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/PublicDefinetion'
 *              400:
 *                  description: Bad Request
 *              401:
 *                  description: unauthorized
 *              404:
 *                  description: not Found
 *              500:
 *                  description: internal server error
 */


// ------------------------------------------------------------------  update blog swagger


/**
 * @swagger
 *  components:
 *      schemas:
 *          Update_Blog:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of category
 *                  short_text:
 *                      type: string
 *                      description: the summary of text of blog
 *                  text:
 *                      type: string
 *                      description: the text of blog
 *                  tags:
 *                      type: string
 *                      description: the list of tags for example(tag1#tag2#tag_foo)
 *                  category:
 *                      type: string
 *                      description: the id of category for foreinField in blog
 *                  image:
 *                      type: file
 *                      description: the index picture of blog
 */

// step 115 :
/**
 * @swagger
 * tag: blog(AdminPanel)
 * /admin/blogs/update/{id}:
 *  patch:
 *      tags: [blog(AdminPanel)]
 *      summary: update blog by tag
 *      consumes: 
 *          -   multipart/form-data
 *      parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *              required: true
 *              description: blog id
 *      requestBody:
 *          required: true
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      $ref: '#/components/schemas/Update_Blog'
 *      responses:
 *          200:
 *              description: success - blog created
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/PublicDefinetion'
 *          400:
 *              description: Bad Request
 *          401:
 *              description: unauthorized
 *          404:
 *              description: not Found
 *          500:
 *              description: internal server error
 */

// ------------------------------------------------------------------  get all blogs swagger


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
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/PublicDefinetion'
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


// ------------------------------------------------------------------  get blog by id swagger

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
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/PublicDefinetion'
 *          400:
 *              description: Bad Request
 *          401:
 *              description: unauthorized
 *          404:
 *              description: not Found
 *          500:
 *              description: internal server error
 */

// ------------------------------------------------------------------  delete blog by id swagger

// step 112 :

/**
 * @swagger
 * tag: blog(AdminPanel)
 * /admin/blogs/delete/{id}:
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
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/PublicDefinetion'
 *          400:
 *              description: Bad Request
 *          401:
 *              description: unauthorized
 *          404:
 *              description: not Found
 *          500:
 *              description: internal server error
 */
