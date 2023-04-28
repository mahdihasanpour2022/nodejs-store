// step 152 : courses route
const router = require("express").Router();
const {CourseController} = require("../../http/controllers/admin/course/course.controller");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const { uploadFile } = require("../../utils/multer");


// step 162 :
router.post(
  "/create",
  uploadFile.single("image"), // 10 iani maxCount iani hadeaksar 10 ta ax mitone upload kone
  stringToArray("tags"),
  CourseController.createCourse
);

// step 156 :
router.get("/all", CourseController.getAllCourses); // get all courses

// step 167 :
router.get("/:id", CourseController.getCourseByID);

// // step 232 :
router.patch("/edit/:courseID" ,uploadFile.single("image"), CourseController.updateCourseById); // in mitone b jaie courseID hamon id base ama agar gozashti courseID pas to controller hamino migiri va to swagger ham b hamin nam baiad ersal koni

module.exports = {
  Course_AdminApiRoutes: router,
};
