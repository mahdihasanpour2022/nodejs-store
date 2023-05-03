

// ------------------------------------------------------------------  delete episode swagger


// step 248 :  Get All user Definetion

/**
 * @swagger
 *  definitions:
 *      Get_All_User_Definetion:
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
 *                  example: "لیست همه ماربران با موفقیت گرفته شد"
 *              data:
 *                  type: object
 *                  properties:
 *                      users:
 *                          type: object
 *                          example: {}
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
 *                          $ref: '#/definitions/Get_All_User_Definetion'
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




