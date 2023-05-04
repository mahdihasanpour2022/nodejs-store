// ------------------------------------------------------------------ Create role swagger
// step 263 va 264 : برای اینکه بفهمی در پراپرتی چی باید باشه برو به مدل رول و ببین کدوم الزامیه ریکوایر

/**
 * @swagger
 *  components:
 *      schemas:
 *          Create_role:
 *              type: object
 *              required:
 *                  -   title
 *                  -   description
 *                  -   permissions
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of role
 *                      enum:
 *                          -   SUPERADMIN
 *                          -   ADMIN
 *                          -   USER
 *                          -   CONTENT_MANAGER
 *                          -   TEACHER
 *                          -   SUPPLIER
 *                  description:
 *                      type: string
 *                      description: the description of role
 *                  permissions:
 *                      type: array
 *                      description: send permissionID
*/

// step 265 : Create_role_Definetion

/**
 * @swagger
 *  definitions:
 *      Create_role_Definetion:
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
 *                  example: "نقش با موفقیت ایجاد شد"
 *              data:
 *                  type: object
 *                  properties:
 *                      role:
 *                          type: object
 *                          properties: 
 *                              title:
 *                                  type: string
 *                                  example: ""
 *                              description:
 *                                  type: string
 *                                  example: ""
 *                              permissions:
 *                                  type: array
 *                                  example: [] 
 *              error:
 *                  type: string
 *                  example: null
*/


// step 266 : role swagger


/**
 * @swagger
 * /admin/roles/create:
 *  post:
 *      tags: [ RBAC(AdminPanel) ]
 *      summary: craete new role
 *      description: از این بخش میتوانید نقش مورد نظر را تعیین نمایید
 *      requestBody:
 *          required: true
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/Create_role'
 *      responses:
 *          201:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/Create_role_Definetion'
 *          400:
 *              description: Bad Request
 *          401:
 *              description: unauthorized
 *          404:
 *              description: not Found
 *          500:
 *              description: internal server error
 */

// ------------------------------------------------------------------ edit role swagger


// step 267 : edit  va update kolan requirenadare


/**
 * @swagger
 *  components:
 *      schemas:
 *          Update_role:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of role
 *                      enum:
 *                          -   USER
 *                          -   ADMIN
 *                          -   WRITER
 *                          -   TEACHER
 *                          -   SUPPLIER
 *                  description:
 *                      type: string
 *                      description: the description of role 
 *                  permissions:
 *                      type: array
 *                      description: send permissionID
*/

// step 268 : Update_role_Definetion

/**
 * @swagger
 *  definitions:
 *      Update_role_Definetion:
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
 *                  example: "نقش با موفقیت بروز رسانی شد"
 *              data:
 *                  type: object
 *                  example: {}
 *              error:
 *                  type: string
 *                  example: null
*/


// step 269 : role swagger


/**
 * @swagger
 * /admin/roles/edit/{roleID}:
 *  patch:
 *      tags: [ RBAC(AdminPanel) ]
 *      summary: update role
 *      description: از این بخش میتوانید نقش مورد نظر را ادیت نمایید
 *      parameters: 
 *          -   in: path 
 *              name: roleID 
 *              type: string 
 *              required: true 
 *      requestBody:
 *          required: true
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/Update_role'
 *      responses:
 *          200:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/Update_role_Definetion'
 *          400:
 *              description: Bad Request
 *          401:
 *              description: unauthorized
 *          404:
 *              description: not Found
 *          500:
 *              description: internal server error
 */

// ------------------------------------------------------------------ get all role swagger

// step 270 : get_all_role_Definetion
// اگر میخوای ببینی در پراپرتی چی بنویسی کافیه بری تو مدل رول ها ببینی

/**
 * @swagger
 *  definitions:
 *      get_all_role_Definetion:
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
 *                  example: "نقش ها با موفقیت دریافت شد"
 *              data:
 *                  type: object
 *                  properties:
 *                      role:
 *                          type: object
 *                          properties:
 *                              _id:
 *                                  type: string
 *                                  example: "" 
 *                              title:
 *                                  type: string
 *                                  example: "" 
 *                              description:
 *                                  type: string
 *                                  example: "" 
 *                              permissions:
 *                                  type: array
 *                                  items:
 *                                      type: object
 *                                      properties:
 *                                         _id:
 *                                             type: string
 *                                             example: "" 
 *                                         title:
 *                                             type: string
 *                                             example: "" 
 *                                         descriptions:
 *                                             type: string
 *                                             example: ""
 *              error:
 *                  type: string
 *                  example: null
*/


// step 269 : role swagger


/**
 * @swagger
 * /admin/roles/all:
 *  get:
 *      tags: [ RBAC(AdminPanel) ]
 *      summary: get all role
 *      description: از این بخش میتوانید همه نقشها را دریافت نمایید
 *      responses:
 *          200:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/get_all_role_Definetion'
 *          400:
 *              description: Bad Request
 *          401:
 *              description: unauthorized
 *          404:
 *              description: not Found
 *          500:
 *              description: internal server error
 */

// ------------------------------------------------------------------ delete role swagger
// step 270 :  

/**
 * @swagger
 *  definitions:
 *      Delete_role_Definetion:
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
 *                  example: "نقش با موفقیت حذف شد"
 *              data:
 *                  type: object
 *                  properties:
 *                      role:
 *                          type: object
 *                          properties: 
 *                              title:
 *                                  type: string
 *                                  example: ""
 *                              description:
 *                                  type: string
 *                                  example: ""
 *                              permissions:
 *                                  type: array
 *                                  example: [] 
 *              error:
 *                  type: string
 *                  example: null
*/

// step 271 : delete request body nadare va dar path field ersal mishe na id iani inja kameltar gozashte k front ham betone baraie hazf id bede ham text

/**
 * @swagger
 * /admin/roles/delete/{field}:
 *  delete:
 *      tags: [ RBAC(AdminPanel) ]
 *      summary: delete role
 *      description: از این بخش میتوانید نقش مورد نظر را حذف نمایید
 *      parameters: 
 *          -   in: path 
 *              name: field 
 *              type: string 
 *              required: true 
 *              description: send id or title of role for delete that
 *      responses:
 *          200:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/Delete_role_Definetion'
 *          400:
 *              description: Bad Request
 *          401:
 *              description: unauthorized
 *          404:
 *              description: not Found
 *          500:
 *              description: internal server error
 */


