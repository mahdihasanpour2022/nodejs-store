
// ------------------------------------------------------------------  cerate course swagger

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

// step 173 : defination for cerate course

/**
 * @swagger
 *  definitions:
 *      CreateCourse_Definetion:
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
 *                  example: "دوره با موفقیت ایجاد شد"
 *              data:
 *                  type: object
 *                  properties:
 *                      course:
 *                          type: object
 *              error:
 *                  type: string
 *                  example: null
*/

// step 164 : ba requestBody migi k dar body che chizaie front baiad bar asase in form CreateCourse_Definetion bde

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
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/CreateCourse_Definetion'
 *          400:
 *              description: Bad Request
 *          401:
 *              description: unauthorized
 *          404:
 *              description: not Found
 *          500:
 *              description: internal server error
 */

// ------------------------------------------------------------------  get all courses swagger


// step 169 : cearete defination for all courses
// الگوی ریسپانسی که به فرانت میدیم رو اینجا مثلا برای حالت موفقیت آمیز بودن مینویسیم
// یه نمونه ریسپانس در سواگر برای فرانت میزاره که بفهمه جواب این اندپوینت چجوری خواهد امد از بک اند ما
// اینو باید مطابق ریسپانسی که در گرفتن همه دوره ها گذاشتی درست کنی مثل یه ارایه پر از آبجکت

/**
 * @swagger
 *  definitions:
 *      ListOfCourses:
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
 *                  example: "message for this response ..."
 *              data:
 *                  type: object
 *                  properties:
 *                      courses:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                      example: ""
 *                                  title:
 *                                      type: string
 *                                      example: ""
 *                                  text:
 *                                      type: string
 *                                      example: ""
 *                                  short_text:
 *                                      type: string
 *                                      example: ""
 *                                  status:
 *                                      type: string
 *                                      example: "notStarted | completed | holding"
 *                                  time:
 *                                      type: integer
 *                                      example: like this 01:55:36
 *                                  price:
 *                                      type: integer
 *                                      example: 0
 *                                  discount:
 *                                      type: integer
 *                                      example: 0 
 *                                  teacher:
 *                                      type: string
 *                                      example: ""
 *                                  category:
 *                                      type: string
 *                                      example: ""
 *                                  tags:
 *                                      type: array
 *                                      items:
 *                                          type: string
 *                                          example: ""
 *                                  image:
 *                                      type: string
 *                                      example: ""
 *                                  type:
 *                                      type: string
 *                                      example: ""
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
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/ListOfCourses'
 *          400:
 *              description: Bad Request
 *          401:
 *              description: unauthorized
 *          404:
 *              description: not Found
 *          500:
 *              description: internal server error
 * 
 */


// ------------------------------------------------------------------  get one course by id swagger

// step 172 : defination for get course by ID

/**
 * @swagger
 *  definitions:
 *      GetCourseByID_Definetion:
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
 *                  example: "دوره با موفقیت یافت شد"
 *              data:
 *                  type: object
 *                  properties:
 *                      course:
 *                          type: object
 *                          properties:
 *                              _id:
 *                                  type: string
 *                                  example: 6443d170f6421cf733c627d8
 *                              title:
 *                                  type: string
 *                                  example: "title of course"
 *                              text:
 *                                  type: string
 *                                  example: "text of course"
 *                              short_text:
 *                                  type: string
 *                                  example: "summary of course"
 *                              status:
 *                                  type: string
 *                                  example: status of course "notStarted | completed | holding"
 *                              time:
 *                                  type: integer
 *                                  example: 01:55:36
 *                              price:
 *                                  type: integer
 *                                  example: 250000
 *                              discount:
 *                                  type: integer
 *                                  example: 20
 *                              teacher:
 *                                  type: string
 *                                  example: "poya yousefi"
 *                              category:
 *                                  type: string
 *                                  example: category id of course
 *                              tags:
 *                                  type: string
 *                                  example: tags of course
 *                              image:
 *                                  type: string
 *                                  example: image of course
 *                              type:
 *                                  type: string
 *                                  example: type of course
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
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/GetCourseByID_Definetion'
 *          400:
 *              description: Bad Request
 *          401:
 *              description: unauthorized
 *          404:
 *              description: not Found
 *          500:
 *              description: internal server error
 */

// ------------------------------------------------------------------  update course swagger


// step 233 : Update_Course schema


/**
 * @swagger
 *  components:
 *      schemas:
 *          Update_Course:
 *              type: object
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
 *                      example: 644ba37079911d8531bb0600
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

// step 234 : UpdateCourse_Definetion

/**
 * @swagger
 *  definitions:
 *      UpdateCourse_Definetion:
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
 *                  example: "دوره با موفقیت ایجاد شد"
 *              data:
 *                  type: object
 *                  properties:
 *                      course:
 *                          type: object
 *              error:
 *                  type: string
 *                  example: null
*/


// step 235 : courseID kalamie monasebtarie nesbat b id goyatare faghat dar route va course controller ham hamino baiad bedi va begiri

/**
 * @swagger
 * /admin/courses/edit/{courseID}:
 *  patch:
 *      tags: [ course(AdminPanel) ]
 *      summary: update course
 *      parameters:
 *          -   in: path
 *              name: courseID
 *              type: string
 *              required: true
 *              description: write courseID
 *      requestBody:
 *          required: true
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      $ref: '#/components/schemas/Update_Course'
 *      responses:
 *          200:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/UpdateCourse_Definetion'
 *          400:
 *              description: Bad Request
 *          401:
 *              description: unauthorized
 *          404:
 *              description: not Found
 *          500:
 *              description: internal server error
 */

// ------------------------------------------------------------------  delete course swagger

// step 240 : DeleteCourse_Definetion

/**
 * @swagger
 *  definitions:
 *      DeleteCourse_Definetion:
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
 *                  example: "دوره با موفقیت حذف شد"
 *              data:
 *                  type: object
 *                  properties:
 *                      course:
 *                          type: object
 *              error:
 *                  type: string
 *                  example: null
*/

// step 241 :

/**
 * @swagger
 * /admin/courses/delete/{courseID}:
 *  delete:
 *      tags: [ course(AdminPanel) ]
 *      summary: delete course
 *      parameters:
 *          -   in: path
 *              name: courseID
 *              type: string
 *              required: true
 *              description: write courseID
 *      responses:
 *          200:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/DeleteCourse_Definetion'
 *          400:
 *              description: Bad Request
 *          401:
 *              description: unauthorized
 *          404:
 *              description: not Found
 *          500:
 *              description: internal server error
 */