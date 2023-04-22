// step 152 : courses route 
const {
  CourseController,
} = require("../../http/controllers/admin/course.controller");
const router = require("express").Router();
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

module.exports = {
  Course_AdminApiRoutes: router,
};
