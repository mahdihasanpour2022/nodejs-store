// step 155 : create course controller

const { CourseModel } = require("../../../models/course");
const Controller = require("../controller");
const { StatusCodes } = require("http-status-codes");

class CourseController extends Controller {
  async getAllCourses(req, res, next) {
    try {
      const {search} = req.query ;
      let courses; // baiad let bashe k betonim  meghdardehi konim
      // در صورتیکه یه متنی وارد کرده باشه میره تو دیتا بیس بر اساس اون جستجو میکنه
      if(search) courses = await CourseModel.find({$text : { $search : search}}).sort({ _id: -1 }); // sort ba id -1 iani akharin record aval neshon dade mishe
      // در غیر اینصورت
      else courses = await CourseModel.find({}).sort({_id : -1});
      return res.status(StatusCodes.OK).json({
        isSuccess: true,
        statusCode: StatusCodes.OK,
        message: "لیست تمام دوره ها با موفقیت گرفته شد.",
        data: {
          courses,
        },
        error: null,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  CourseController: new CourseController(),
};
