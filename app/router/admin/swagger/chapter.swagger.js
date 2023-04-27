
//step 181 :
//این سه قدم 179 و 180 و 181 رو با دقت ببینی میفهمی چجوری باید سواگر بنویسی کلا همین سه قدم برای هر روت تکرار میشه


/**
 * @swagger
 *  components:
 *      schemas:
 *          Create_Chapter:
 *              type: object
 *              required:
 *                  -   id
 *                  -   title
 *              properties:
 *                  id:
 *                      type: string
 *                      description: write course id 
 *                  title:
 *                      type: string
 *                      description: chapter 1
 *                  text:
 *                      type: string
 *                      description: write text here ...
 */


// step 182 :

/**
 * @swagger
 *  definitions:
 *      CreateChapter_Definetion:
 *          type: object
 *          properties:
 *              statusCode: 
 *                  type: integer
 *                  example: 20x
 *              isSuccess: 
 *                  type: boolean
 *                  example: true
 *              message: 
 *                  type: string
 *                  example: "فصل با موفقیت به دوره اضافه شد"
 *              data:
 *                  type: object
 *              error:
 *                  type: string
 *                  example: null
*/

// step 183 :

/**
 * @swagger
 * /admin/chapters/create-chapter:
 *  put:
 *      tags: [ chapter(AdminPanel) ]
 *      summary: craete new chapter
 *      requestBody:
 *          required: true
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/Create_Chapter'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Create_Chapter'
 *      responses:
 *          200:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/CreateChapter_Definetion'
 *          400:
 *              description: Bad Request
 *          401:
 *              description: unauthorized
 *          404:
 *              description: not Found
 *          500:
 *              description: internal server error
 */
