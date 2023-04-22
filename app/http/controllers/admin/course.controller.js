const createHttpError = require("http-errors");
const { CourseModel } = require("../../../models/course");
const { createCourseSchema } = require("../../validators/admin/course.schema");
const Controller = require("../controller");
const { StatusCodes } = require("http-status-codes");
const path = require("path");

class CourseController extends Controller {
  // step 155 :
  async getAllCourses(req, res, next) {
    try {
      const { search } = req.query;
      let courses; // baiad let bashe k betonim  meghdardehi konim
      // در صورتیکه یه متنی وارد کرده باشه میره تو دیتا بیس بر اساس اون جستجو میکنه
      if (search)
        courses = await CourseModel.find({ $text: { $search: search } }).sort({
          _id: -1,
        });
      // sort ba id -1 iani akharin record aval neshon dade mishe
      // در غیر اینصورت
      else courses = await CourseModel.find({}).sort({ _id: -1 });
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

  // step 161 :
  async createCourse(req, res, next) {
    try {
      await createCourseSchema.validateAsync(req.body);
      const {
        // const bodyImage = req.file; // نمایش عکس های آپلود شده که چون در بادی هست اینو دیگه نمیخوایم
        discount,
        price,
        text,
        short_text,
        title,
        tags,
        type,
        fileUploadPath,
        filename,
        category,
      } = req.body;
      const taecher = req.user._id; // req ham body dare ham req.user ham req.file ham req.files 
      const image = path.join(fileUploadPath, filename).replace(/\\/g, "/");

      // ذخیره در دیتابیس
      const course = await CourseModel.create({
        discount,
        price,
        text,
        short_text,
        title,
        tags,
        type,
        image,
        category,
        status : "notStarted",
        taecher   
      });
      if(!course?._id) throw createHttpError.InternalServerError("ایجاد دوره ناموفق بود."); // اگر دوره در دیتا بیس صحیح ثبت بشه پس یک ایدی میده بهش دیتابیسی که ما با اون چک میکنیم ببینیم واقعا ثبت شده یا نه
      // در غیر اینصورت یعنی صحیحی در دیتابیس نشسته است 
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        isSuccess: true,
        message: "دوره با موفقیت ایجاد شد",
        data: {
          course,
        },
        error: null,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = {
  CourseController: new CourseController(),
};
