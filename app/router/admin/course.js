// step 152 : courses route
const { CourseController } = require("../../http/controllers/admin/course.controller");
const router = require("express").Router();
const { stringToArray } = require("../../http/middlewares/stringToArray");
const { uploadFile } = require("../../utils/multer");

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


// step 162 :
router.post(
  "/create",
  uploadFile.single("image") , // 10 iani maxCount iani hadeaksar 10 ta ax mitone upload kone
  stringToArray("tags"),
  CourseController.createCourse
);

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


// step 156 :
router.get("/all" , CourseController.getAllCourses ); // get all courses



// router.get(); // get a courses
// router.post(); // create new courses
// router.put(); // create new chapter
// router.put(); // create new episode
// router.delete(); // remove a course
// router.patch(); // edit a course

module.exports = { 
  Course_AdminApiRoutes: router
 };
