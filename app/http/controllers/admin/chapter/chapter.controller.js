const Controller = require("../../controller");
const { default: mongoose } = require("mongoose");
const { StatusCodes } = require("http-status-codes");
const createHttpError = require("http-errors");
const { CourseModel } = require("../../../../models/course");

class ChapterController extends Controller {
  //step 177: اضافه کردن چپتر درون یک دوره
  async createChapter(req, res, next) {
    try {
      const { id, title, text } = req.body;
      console.log(id, title, text);
      // way 1 :
      // const course = await this.findCourseByID(id);// وقتی اینجا نتیجه رو میزاری تو یه کانست داره حافظه الکی اشغال میشه پس بهتره فقط بعنوان اینکه میگرده ببینه ایدی درسته و دوره هم با این ایدی در دیتابیس وجود داره ، از این فانکشن استفاده کنی چون ایدی ورودیش با ایدی دوره ای که پیدا کرده یکیه
      // const saveChapterResult = await CourseModel.updateOne({_id : course._id} , {$push : {chapters : {title , text , episo0des : []}} });// $push mizare to array push koni hamon mavardie k dar chapter course schema model gharar shode az karbar bgiri

      // way 2 :
      await this.findCourseByID(id);

      const saveChapterResult = await CourseModel.updateOne(
        { _id: id },
        { $push: { chapters: { title, text, episodes: [] } } }
      ); // $push mizare to array push koni hamon mavardie k dar chapter course schema model gharar shode az karbar bgiri
      console.log(saveChapterResult);
      if (saveChapterResult.modifiedCount == 0)
        throw createHttpError.InternalServerError(
          "اضافه شدن فصل به دوره نا موفق بود."
        );
      return res.status(StatusCodes.CREATED).json({
        statusCode: StatusCodes.CREATED,
        isSuccess: true,
        message: "فصل با موفقیت به دوره اضافه شد.",
        data: {},
        error: null,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async findCourseByID(courseID) {
    // try {
      // باید چک کنه مانگوس ببینه ایدی که یوزر وارد کرده مطابق الگوی ایدی های ذخیره شده در دیتابیس هست یا خیر
      if (!mongoose.isValidObjectId(courseID))
        throw createHttpError.BadRequest(
          "شناسه دوره ارسال شده صحیح نمی باشد. "
        );
      const course = await CourseModel.findById({ _id: courseID });
      if (!course)
        throw createHttpError.InternalServerError(
          "دوره ای با این  شناسه (ایدی) پیدا نشد."
        );
      return course;
    // } catch (error) {
    //     next(error);
    // }
  }
}

module.exports = {
  ChapterController: new ChapterController(),
};
