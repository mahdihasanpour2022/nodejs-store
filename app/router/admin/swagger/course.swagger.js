// step 163 :

/**
 * @swagger
 *  components:
 *      schemas:
 *          Course_Types:
 *              type: string
 *              enum:
 *                  -   free
 *                  -   cash
 *                  -   special
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          Create_Course:
 *              type: object
 *              required:
 *                  -   title
 *                  -   text
 *                  -   short_text
 *                  -   tags
 *                  -   price
 *                  -   category
 *                  -   discount
 *                  -   image
 *                  -   type
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of course
 *                  text:
 *                      type: string
 *                      description: the text of course
 *                  short_text:
 *                      type: string
 *                      description: the summary of text of course
 *                  tags:
 *                      type: array
 *                      description: tags of courses
 *                  category:
 *                      type: string
 *                      example: 6443bb7f4103b12b7c977865
 *                      description: the id of Category for foreignField in course
 *                  price:
 *                      type: number
 *                      description: price of course
 *                  discount:
 *                      type: number
 *                      description: discount of course (number)
 *                  image:
 *                      type: string
 *                      format: binary
 *                  type:
 *                      $ref: '#/components/schemas/Course_Types'
 */

// step 164 :

/**
 * @swagger
 * /admin/courses/create:
 *  post:
 *      tags: [ course(AdminPanel) ]
 *      summary: craete new course
 *      requestBody:
 *          required: true
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      $ref: '#/components/schemas/Create_Course'
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

// step 157 : create route swagger for course
// step 159 : create parameters for seraching

/**
 * @swagger
 * /admin/courses/all:
 *  get:
 *      tags: [ course(AdminPanel) ]
 *      summary: get all courses
 *      parameters:
 *          -   in: query
 *              name: search
 *              type: string
 *              description: write entire word for search in title , text , short_text (course)
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

// step 168 :

/**
 * @swagger
 * /admin/courses/{id}:
 *  get:
 *      tags: [ course(AdminPanel) ]
 *      summary: get one course
 *      description: find course by ID
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
