// step 264 : create permission.swagger.js

// ------------------------------------------------------------------ Create permission swagger

// step 272 :

/**
 * @swagger
 *  components:
 *      schemas:
 *          Create_permission:
 *              type: object
 *              required:
 *                  -   title
 *                  -   description
 *              properties:
 *                  title:
 *                      type: string
 *                      enum:
 *                          -   all
 *                          -   user
 *                          -   category
 *                          -   products
 *                          -   blogs
 *                          -   courses
 *                      description: write CAPITAL only
 *                  description:
 *                      type: string
 *                      description: the description of permission
 */

// step 273 : Create_Permission_Definetion

/**
 * @swagger
 *  definitions:
 *      Create_Permission_Definetion:
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
 *                  example: "پرمیشن با موفقیت ایجاد شد"
 *              data:
 *                  type: object
 *                  example: {}
 *              error:
 *                  type: string
 *                  example: null
 */

// step 274 : permission swagger

/**
 * @swagger
 * /admin/permissions/create:
 *  post:
 *      tags: [ RBAC(AdminPanel) ]
 *      summary: craete new permission
 *      description: از این بخش میتوانید پرمیشن مورد نظر را تعیین نمایید
 *      requestBody:
 *          required: true
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/Create_permission'
 *      responses:
 *          201:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/Create_Permission_Definetion'
 *          400:
 *              description: Bad Request
 *          401:
 *              description: unauthorized
 *          404:
 *              description: not Found
 *          500:
 *              description: internal server error
 */

// ------------------------------------------------------------------ edit permission swagger

// step 275 : edit  va update kolan require nadare

/**
 * @swagger
 *  components:
 *      schemas:
 *          Update_permission:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of permission
 *                  description:
 *                      type: string
 *                      description: the description of permission
 */

// step 276 : Update_Permission_Definetion

/**
 * @swagger
 *  definitions:
 *      Update_Permission_Definetion:
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
 *                  example: "پرمیشن با موفقیت بروز رسانی شد"
 *              data:
 *                  type: object
 *                  example: {}
 *              error:
 *                  type: string
 *                  example: null
 */

// step 277 : permission swagger

/**
 * @swagger
 * /admin/permissions/edit/{permissionID}:
 *  patch:
 *      tags: [ RBAC(AdminPanel) ]
 *      summary: update permission
 *      description: از این بخش میتوانید پرمیشن مورد نظر را ادیت نمایید
 *      parameters:
 *          -   in: path
 *              name: permissionID
 *              type: string
 *              required: true
 *      requestBody:
 *          required: true
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/Update_permission'
 *      responses:
 *          200:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/Update_Permission_Definetion'
 *          400:
 *              description: Bad Request
 *          401:
 *              description: unauthorized
 *          404:
 *              description: not Found
 *          500:
 *              description: internal server error
 */

// ------------------------------------------------------------------ get permission swagger

// step 278 : get_all_permission_Definetion
// اگر میخوای ببینی در پراپرتی چی بنویسی کافیه بری تو مدل پرمیشن ها ببینی

/**
 * @swagger
 *  definitions:
 *      get_all_permission_Definetion:
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
 *                  example: "پرمیشن ها با موفقیت دریافت شد"
 *              data:
 *                  type: object
 *                  properties:
 *                      permissions:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                 _id:
 *                                     type: string
 *                                     example: ""
 *                                 title:
 *                                     type: string
 *                                     example: ""
 *                                 descriptions:
 *                                     type: string
 *                                     example: ""
 *              error:
 *                  type: string
 *                  example: null
 */

// step 279 : permission swagger

/**
 * @swagger
 * /admin/permissions/all:
 *  get:
 *      tags: [ RBAC(AdminPanel) ]
 *      summary: get all permission
 *      description: از این بخش میتوانید همه پرمیشن را دریافت نمایید
 *      responses:
 *          200:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/get_all_permission_Definetion'
 *          400:
 *              description: Bad Request
 *          401:
 *              description: unauthorized
 *          404:
 *              description: not Found
 *          500:
 *              description: internal server error
 */

// ------------------------------------------------------------------ delete permission swagger
// step 280 :

/**
 * @swagger
 *  definitions:
 *      Delete_permission_Definetion:
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
 *                  example: "پرمیشن با موفقیت حذف شد"
 *              data:
 *                  type: object
 *                  example: {}
 *              error:
 *                  type: string
 *                  example: null
 */

// step 281 : delete request body nadare

/**
 * @swagger
 * /admin/permissions/delete/{permissionID}:
 *  delete:
 *      tags: [ RBAC(AdminPanel) ]
 *      summary: delete permission
 *      description: از این بخش میتوانید پرمیشن مورد نظر را حذف نمایید
 *      parameters:
 *          -   in: path
 *              name: permissionID
 *              type: string
 *              required: true
 *      responses:
 *          200:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/Delete_permission_Definetion'
 *          400:
 *              description: Bad Request
 *          401:
 *              description: unauthorized
 *          404:
 *              description: not Found
 *          500:
 *              description: internal server error
 */
