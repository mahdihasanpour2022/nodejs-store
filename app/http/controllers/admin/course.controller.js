// step 155 : create course controller

const { CourseModel } = require("../../../models/course");
const Controller = require("../controller");

class CourseController extends Controller {
  async getAllCourses(req, res, next) {
    try {
      // const courses = await CourseModel.find({});
      return res.json({});
    } catch (error) {
      next(error);
    }
  }
};

module.exports = {
  CourseController : new CourseController()
};
