const { CourseController } = require("../../http/controllers/admin/course.controller");

// step 152 : create route for courses
const router = require("express").Router();


// step 157 :


/**
 * @swagger
 * /admin/courses/all:
 *  get:
 *      tags: [ course(AdminPanel) ]
 *      summary: get all courses
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
