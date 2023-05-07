// ------------------------------------------------------------------  get all user swagger

// step 248 :

/**
 * @swagger
 *  definitions:
 *      GET_All_User_Definetion:
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
 *                  example: "لیست همه کاربران با موفقیت گرفته شد"
 *              data:
 *                  type: object
 *                  properties:
 *                      users:
 *                          example: [{_id: "",mobile: "",otp: {code: "",expiresIn: 0},bills: [],discount: 0,Role: "",courses: [],createdAt: "",updatedAt: "",__v: 0,id: ""}]
 *              error:
 *                  type: string
 *                  example: null
 */

// step 249 : get ha chon chizi nemiferestan pas request body nadaran

/**
 * @swagger
 * /admin/users/all:
 *  get:
 *      tags: [ users(AdminPanel) ]
 *      summary: get all users
 *      parameters:
 *          -   in: query
 *              name: search
 *              type: string
 *              description: write entire word for search in last_name,first_name,user_name,email,mobile (users)
 *      responses:
 *          200:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/GET_All_User_Definetion'
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

// ------------------------------------------------------------------  get user profile swagger

// step 310 :
/**
 * @swagger
 *  definitions:
 *      GET_User_profile_Definetion:
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
 *                  example: "لیست همه کاربران با موفقیت گرفته شد"
 *              data:
 *                  type: object
 *                  properties:
 *                      user:
 *                          type: object
 *                          example: {_id: "",mobile: "",otp: {code: "",expiresIn: 0},bills: [],discount: 0,Role: "",courses: [],createdAt: "",updatedAt: "",__v: 0,id: ""}
 *              error:
 *                  type: string
 *                  example: null
 */

// step 311 :

/**
 * @swagger
 * /admin/users/profile:
 *  get:
 *      tags: [ users(AdminPanel) ]
 *      summary: get user profile
 *      responses:
 *          200:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/GET_User_profile_Definetion'
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

// ------------------------------------------------------------------  update user profile swagger

// step 253 :Update_User schemas

/**
 * @swagger
 *  components:
 *      schemas:
 *          Update_User_Profile:
 *              type: object
 *              properties:
 *                  first_name:
 *                      type: string
 *                      description: the firstname of user
 *                  last_name:
 *                      type: string
 *                      description: hasanpour
 *                  user_name:
 *                      type: string
 *                      description: mahdihasanpour
 *                  email:
 *                      type: string
 *                      example: mahdihasanpour2022@gmail.com
 */

// step 254 :

/**
 * @swagger
 *  definitions:
 *      Update_User_Profile_Definetion:
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
 *                  example: "لیست همه کاربران با موفقیت گرفته شد"
 *              data:
 *                  type: object
 *                  properties:
 *                      user:
 *                          type: object
 *                          properties:
 *                              _id:
 *                                  type: string
 *                              first_name:
 *                                  type: string
 *                              last_name:
 *                                  type: string
 *                              user_name:
 *                                  type: string
 *                              email:
 *                                  type: string
 *                                  example: examplw@gmail.com
 *                              mobile:
 *                                  type: string
 *              error:
 *                  type: string
 *                  example: null
 */

// step 255:

/**
 * @swagger
 * /admin/users/edit-profile:
 *  patch:
 *      tags: [ users(AdminPanel) ]
 *      summary: update profile of user
 *      requestBody:
 *          required: true
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/Update_User_Profile'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Update_User_Profile'
 *      responses:
 *          200:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/Update_User_Profile_Definetion'
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
