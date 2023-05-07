// ------------------------------------------------------------------  Create episode swagger

//step 208 :
//این سه قدم 179 و 180 و 181 رو با دقت ببینی میفهمی چجوری باید سواگر بنویسی کلا همین سه قدم برای هر روت تکرار میشه
// به قسمت تایپ دقت کن برای حالتیکه موارد رو میخوای از تو لیست انتخاب کنه کاربر در سواگر عالیه
// دقت کن ویدئو که میخوای آپلود کنه بگیری تایپش باید استرینگ باشه و فرمتش باینری

/**
 * @swagger
 *  components:
 *      schemas:
 *          Create_episode:
 *              type: object
 *              required:
 *                  -   courseID
 *                  -   chapterID
 *                  -   title
 *                  -   text
 *                  -   type
 *                  -   video
 *              properties:
 *                  courseID:
 *                      type: string
 *                      description: the course id
 *                  chapterID:
 *                      type: string
 *                      description: the chapter id
 *                  title:
 *                      type: string
 *                      description: the title of episode
 *                  text:
 *                      type: string
 *                      description: the text of episode
 *                  type:
 *                      type: string
 *                      description: the type of episode
 *                      enum:
 *                          -   lock
 *                          -   unlock
 *                  video:
 *                      type: string
 *                      description: the video of episode
 *                      format: binary
 */

// step 209 : Create Chapter Definetion
// اینو بزار وقتی در سواگر تست کردی ریسپانس رو دید از روی ریسپانس بنویسش راحت تر میشه نوشتنش

/**
 * @swagger
 *  definitions:
 *      CreateEpisode_Definetion:
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
 *                  example: "اپیزود با موفقیت به فصل اضافه شد"
 *              data:
 *                  type: object
 *                  properties:
 *                      episode:
 *                          type: object
 *                          example: {title: "",text: "",type: "",time: "",videoAddress: ""}
 *              error:
 *                  type: string
 *                  example: null
 */

//step 210  :
// b jaie summaary bia va description benevis giatare
// id ro dar halate create har chizi dar parameters k male path hast nade dar body bede iani requestBody
// agar dar body faghat string va array va number ,... dari dar requestBody dar content application/x-www-form-urlencoded va application/json ro bezar
// ama agar dar body image ya file ya video dari dar requestBody dar content faghat multipart/form-data bezar

/**
 * @swagger
 * /admin/episodes/create:
 *  post:
 *      tags: [ episode(AdminPanel) ]
 *      summary: craete new episode
 *      description: میتوانید برای فصل مورد نظر یک اپیزود ایجاد کنید
 *      requestBody:
 *          required: true
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      $ref: '#/components/schemas/Create_episode'
 *      responses:
 *          201:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/CreateEpisode_Definetion'
 *          400:
 *              description: Bad Request
 *          401:
 *              description: unauthorized
 *          404:
 *              description: not Found
 *          500:
 *              description: internal server error
 */

// ------------------------------------------------------------------  delete episode swagger

// step 219 :

/**
 * @swagger
 *  definitions:
 *      DeleteOneEpisode_Definetion:
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
 *                  example: "اپیزود با موفقیت از فصل دوره حذف شد"
 *              data:
 *                  type: object
 *                  example: {}
 *              error:
 *                  type: string
 *                  example: null
 */

// step 220 : vase delete chon body chizi gharar nist befresti requestBody nadare

/**
 * @swagger
 * /admin/episodes/delete/{episodeID}:
 *  delete:
 *      tags: [ episode(AdminPanel) ]
 *      summary: delete one episode
 *      description: میتوانید اپیزود مورد نظرتان را از فصل دوره حذف نمایید.
 *      parameters:
 *          -   in: path
 *              name: episodeID
 *              type: string
 *              required: true
 *              description: write episodeID
 *      responses:
 *          201:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/DeleteOneEpisode_Definetion'
 *          400:
 *              description: Bad Request
 *          401:
 *              description: unauthorized
 *          404:
 *              description: not Found
 *          500:
 *              description: internal server error
 */

// ------------------------------------------------------------------  edit(update) episode swagger

// step 223 :

/**
 * @swagger
 *  components:
 *      schemas:
 *          Update_episode:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of episode
 *                      example: episode title
 *                  text:
 *                      type: string
 *                      description: the text of episode
 *                      example: episode text
 *                  type:
 *                      type: string
 *                      description: the type of episode
 *                      enum:
 *                          -   lock
 *                          -   unlock
 *                  video:
 *                      type: string
 *                      description: the video of episode
 *                      format: binary
 */

// step 224 :

/**
 * @swagger
 *  definitions:
 *      UpdateEpisode_Definetion:
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
 *                  example: "اپیزود با موفقیت ادیت شد"
 *              data:
 *                  type: object
 *                  properties:
 *                      episode:
 *                          type: object
 *                          example: {title: "",text: "",type: "",time: "",videoAddress: ""}
 *              error:
 *                  type: string
 *                  example: null
 */

// step 225 :

/**
 * @swagger
 * /admin/episodes/edit/{episodeID}:
 *  patch:
 *      tags: [ episode(AdminPanel) ]
 *      summary: update episode
 *      description: از این قسمت اپیزود مربوط به فصل دوره را ویرایش نمایید
 *      parameters:
 *          -   in: path
 *              name: episodeID
 *              type: string
 *              required: true
 *              description: write episodeID
 *              example: 644b9236f503b1cb33f621ae
 *      requestBody:
 *          required: true
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      $ref: '#/components/schemas/Update_episode'
 *      responses:
 *          200:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/UpdateEpisode_Definetion'
 *          400:
 *              description: Bad Request
 *          401:
 *              description: unauthorized
 *          404:
 *              description: not Found
 *          500:
 *              description: internal server error
 */
