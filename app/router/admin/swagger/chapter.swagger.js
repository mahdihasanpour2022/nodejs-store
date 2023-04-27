
// ------------------------------------------------------------------  Create Chapter swagger

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


// step 182 : Create ChapterDefinetion

/**
 * @swagger
 *  definitions:
 *      CreateChapter_Definetion:
 *          type: object
 *          properties:
 *              statusCode: 
 *                  type: integer
 *                  example: 201
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

// step 183 : b jaie summaary bia va description benevis giatare

/**
 * @swagger
 * /admin/chapters/create-chapter:
 *  put:
 *      tags: [ chapter(AdminPanel) ]
 *      summary: craete new chapter
 *      description: میتوانید برای دوره مورد نظرتان یک فصل ایجاد کنید
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
 *          201:
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

// ------------------------------------------------------------------  get all chapters swagger

// step 191 : GetAllChapters_Definetion 
// هر بار که سواگری رو تغییر میدی باید یه بار اینو بزنی => yarn start
// dar CreateChapter_Definetion ma ba raveshe 1 neveshtim dar inja dar ghesmate chapters ba raveshe 2 . har 2 tash ro balad bash ama raveshe 2 rahattare

/**
 * @swagger
 *  definitions:
 *      GetAllChapters_Definetion:
 *          type: object
 *          properties:
 *              statusCode: 
 *                  type: integer
 *                  example: 200
 *              isSuccess: 
 *                  type: boolean
 *                  example: true
 *              message: 
 *                  type: string
 *                  example: "فصل های مربوط به دوره مورد نظر با موفقیت گرفته شد"
 *              data:
 *                  type: object
 *                  properties:
 *                      course:
 *                          type: object
 *                          properties:
 *                              id:
 *                                  type: string
 *                                  description: course id
 *                              title:
 *                                  type: string
 *                                  description: title of course
 *                              chapters:
 *                                  type: array
 *                                  items:
 *                                  example: [{title : "",text: "" , id : "" ,episodes : [{}] }]
 *              error:
 *                  type: string
 *                  example: null
*/


// step 192 : وقتی ایدی رئ در پارام میده یعنی یوارال پس نیازی به ریکویست بادی نداره که پارامترهایی که کاربر باید وارد کنه رو بتونیم نشون بدیم
// requset body nadare chon chizi dar form body ersal nemikone front end balke faghat ye d k dar path mide

/**
 * @swagger
 * /admin/chapters/all/{courseID}:
 *  get:
 *      tags: [ chapter(AdminPanel) ]
 *      summary: get all chapters of course
 *      parameters:
 *          -   in: path
 *              name: courseID
 *              type: string
 *              required: true
 *              description: write course id like (6443d56a793404199ddb0e39)
 *      responses:
 *          200:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/GetAllChapters_Definetion'
 *          400:
 *              description: Bad Request
 *          401:
 *              description: unauthorized
 *          404:
 *              description: not Found
 *          500:
 *              description: internal server error
 */


// ------------------------------------------------------------------  delete one chapter by id swagger

// step 196 : inja data ro mitoni ye obj khali bedi iani {}


/**
 * @swagger
 *  definitions:
 *      DeleteOneChapter_Definetion:
 *          type: object
 *          properties:
 *              statusCode: 
 *                  type: integer
 *                  example: 200
 *              isSuccess: 
 *                  type: boolean
 *                  example: true
 *              message: 
 *                  type: string
 *                  example: "فصل مربوطه با موفقیت حذف شد"
 *              data:
 *                  type: object
 *                  properties:
 *                      course:
 *                          type: object
 *                          properties:
 *                              _id:
 *                                  type: string
 *                              chapters:
 *                                  type: array
 *                                  example: [{title : "",text: "" , id : "" ,episodes : [{}] }]
 *              error:
 *                  type: string
 *                  example: null
*/

// step 197 :

/**
 * @swagger
 * /admin/chapters/delete/{chapterID}:
 *  patch:
 *      tags: [ chapter(AdminPanel) ]
 *      summary: delete one chapter in course
 *      parameters:
 *          -   in: path
 *              name: chapterID
 *              type: string
 *              required: true
 *              description: write chapterID 
 *      responses:
 *          200:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/DeleteOneChapter_Definetion'
 *          400:
 *              description: Bad Request
 *          401:
 *              description: unauthorized
 *          404:
 *              description: not Found
 *          500:
 *              description: internal server error
 */


// ------------------------------------------------------------------  update one chapter by id swagger


// step 200 :

/**
 * @swagger
 *  components:
 *      schemas:
 *          Update_Chapter:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: chapter 1
 *                  text:
 *                      type: string
 *                      description: write text here ...
 */

// step 201 :inja data ro lozomi nadare k bargardoni mitoni data ro ye obj khali bdi iani {}


/**
 * @swagger
 *  definitions:
 *      UpdateOneChapter_Definetion:
 *          type: object
 *          properties:
 *              statusCode: 
 *                  type: integer
 *                  example: 201
 *              isSuccess: 
 *                  type: boolean
 *                  example: true
 *              message: 
 *                  type: string
 *                  example: "فصل با موفقیت به دوره اضافه شد"
 *              data:
 *                  type: object
 *                  example: {}
 *              error:
 *                  type: string
 *                  example: null
*/

// step 202 : 
// vaghti dar requestBody dar content har doie application/x-www-form-urlencoded mizari iani mesle form bashe designesh va application/json iani mesle ye json iani array ya obj betoni ersal koni
// kolan vaghti dar body dari mifresti chizio dar requestBody swagger har doie inha ro bzar albate faghat application/json bzari ok tare amma har dosho bzari behtare


/**
 * @swagger
 * /admin/chapters/edit/{chapterID}:
 *  patch:
 *      tags: [ chapter(AdminPanel) ]
 *      summary: edit one chapter in course
 *      description: ادیت یک فصل از دوره را میتولنید اینجا انجام دهید
 *      parameters:
 *          -   in: path
 *              name: chapterID
 *              type: string
 *              required: true
 *              description: write chapterID
 *      requestBody:
 *          required: true
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/Update_Chapter'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Update_Chapter'
 *      responses:
 *          200:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/UpdateOneChapter_Definetion'
 *          400:
 *              description: Bad Request
 *          401:
 *              description: unauthorized
 *          404:
 *              description: not Found
 *          500:
 *              description: internal server error
 */
