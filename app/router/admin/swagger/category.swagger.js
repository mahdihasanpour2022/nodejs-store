// step 176 : مثل قدم 174 و 175 که برای پروداکت دیفاینیشن یعنی الگوی ریسپانس برای فرانت نوشتی برای این هم بنویس کافیه تو پوشه مدل ببینی هر کتگوری چه آپشن هایی داره و بنویسی

// step 119 : // shema hato ijad mikoni aval name schema bad type esh bad onaie k required hast  va b hamin tartib
// faghat vase patch va post ma schema minevisim

/**
 * @swagger
 *  components:
 *      schemas:
 *          CreateCategory:
 *              type: object
 *              required:
 *                  -   title
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of Category
 *                  parent:
 *                      type: string
 *                      description: the parent of Category
 *          UpdateCategory:
 *              type: object
 *              required:
 *                  -   title
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of Category
 */

// step 60 :

/**
 * @swagger
 * tag: category(AdminPanel)
 * /admin/category/create:
 *  post:
 *      summary: craete new category
 *      tags: [category(AdminPanel)]
 *      requestBody:
 *          required: true
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateCategory'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateCategory'
 *      responses:
 *          201:
 *              description: success
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

// step 71:

/**
 * @swagger
 * tag: category(AdminPanel)
 * /admin/category/all:
 *  get:
 *      summary: get all categories
 *      tags: [category(AdminPanel)]
 *      responses:
 *          200:
 *              description: success
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

// step 65 :

/**
 * @swagger
 * tag: category(AdminPanel)
 * /admin/category/parents:
 *  get:
 *      summary: get all parent of category or category head
 *      tags: [category(AdminPanel)]
 *      responses:
 *          200:
 *              description: success
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

// step 68 :
/**
 * @swagger
 * tag: category(AdminPanel)
 * /admin/category/children/{parent}:
 *  get:
 *      summary: get all children of parents category
 *      tags: [category(AdminPanel)]
 *      parameters:
 *          -   in: path
 *              name: parent
 *              type: string
 *              required: true
 *      responses:
 *          200:
 *              description: success
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

// step 76 :

/**
 * @swagger
 * tag: category(AdminPanel)
 * /admin/category/remove/{id}:
 *  delete:
 *      summary: delete category with object-id
 *      tags: [category(AdminPanel)]
 *      parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *              required: true
 *      responses:
 *          202:
 *              description: success
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

// step 84 :

/**
 * @swagger
 * tag: category(AdminPanel)
 * /admin/category/list-of-all:
 *  get:
 *      summary: get all categories whitout populate and nested structure
 *      tags: [category(AdminPanel)]
 *      responses:
 *          200:
 *              description: success
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

// step 88:

/**
 * @swagger
 * tag: category(AdminPanel)
 * /admin/category/update/{id}:
 *  patch:
 *      summary: update title of category
 *      tags: [category(AdminPanel)]
 *      requestBody:
 *          required: true
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/UpdateCategory'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UpdateCategory'
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

// step 78 :

/**
 * @swagger
 * tag: category(AdminPanel)
 * /admin/category/{id}:
 *  get:
 *      summary: find category with object id
 *      tags: [category(AdminPanel)]
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
