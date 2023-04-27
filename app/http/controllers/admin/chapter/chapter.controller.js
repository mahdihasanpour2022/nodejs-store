const { StatusCodes } = require("http-status-codes");
const createHttpError = require("http-errors");
const { CourseModel } = require("../../../../models/course");
// const { AbstractCourseController } = require("../course/course.controller");
const Controller = require("../../controller");
const { CourseController } = require("../course/course.controller");

// way 1 :
// inaja ChapterController az controller asli extend nemishe balke chon zir majmoie class courseConreoller hast pas baiad dar courseConreoller ye abstract besazim k inja in calss chapter az on extend beshe va masalan az function haie k da courseConreoller hast mesle findCourseByID betonim inja estefade konim
// iani dr in ravesh dge niazi nist findCourseByID ro inja benevisim az courseController extend beshe tamame function va method haie on to ro dare
// class ChapterController extends AbstractCourseController {

// way 2 :
// iani dr in ravesh dge niazi nist findCourseByID ro inja benevisim ya az courseController extend konim tanha kafie import konim course controller ro va az method findCourseByID estefade konim

class ChapterController extends Controller {
  //step 177: اضافه کردن چپتر درون یک دوره
  async createChapter(req, res, next) {
    try {
      const { id, title, text } = req.body;

      // way 1 :
      // const course = await this.findCourseByID(id);// وقتی اینجا نتیجه رو میزاری تو یه کانست داره حافظه الکی اشغال میشه پس بهتره فقط بعنوان اینکه میگرده ببینه ایدی درسته و دوره هم با این ایدی در دیتابیس وجود داره ، از این فانکشن استفاده کنی چون ایدی ورودیش با ایدی دوره ای که پیدا کرده یکیه
      // const saveChapterResult = await CourseModel.updateOne({_id : course._id} , {$push : {chapters : {title , text , episo0des : []}} });// $push mizare to array push koni hamon mavardie k dar chapter course schema model gharar shode az karbar bgiri

      // way 2 :
      await CourseController.findCourseByID(id);

      const saveChapterResult = await CourseModel.updateOne(
        { _id: id },
        { $push: { chapters: { title, text, episodes: [] } } }
      ); // $push mizare to array push koni hamon mavardie k dar chapter course schema model gharar shode az karbar bgiri
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
      // console.log(error);
      next(error);
    }
  }

  // step 188 :
  // ترتیب کار کلا این شکلیه که اینجا متد رو در کنترلر مینویسییم و بعد در روت مربوطه اش وارد میکنیم و بعد سواگرش رو مینویسیم
  async getAllChaptersOfCourse(req, res, next) {
    try {
      const {courseID} = req.params;
      const course = await this.findChaptersOfCourse(courseID);
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        isSuccess: true,
        message: `همه فصل های مربوط به دوره با ایدی ${courseID} با موفقیت گرفته شد.`,
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

  // step 193 : 
  async findOneChapter(id){
    // google kon how can i find nested document in mongodb => k bebini baraie gashtan dakhele ye obj dar db che kar kardan baghie
    const chapter = await CourseModel.findOne({ "chapters._id" : id} , {"chapters.$": 1 }); // vaghti to obj midi id ro iani dar db bere to dele course bagarde va tosh bebin kodom chapter idiash barabare hamin id hast va dar edamash chapters.$ iani boro tosh begard donbale chapters
if(!chapter) throw createHttpError.NotFound("فصلی با این شناسه ایدی وجود ندارد.")
return chapter; 
  }

  // step 189 :
  async findChaptersOfCourse(courseID) {

    const chapters = await CourseModel.findOne({ _id: courseID },{ chapters: 1 , title : 1}); // in iani faghat chapters va title ro b ma bede
    // در صورتیکه دوره چپتری تداشته باشه یه ارایه خالی بر میگردونه پس باید بگیم اگر خالی بود ، همون خالیه رو بر نگردونه ارور بده که چپتری برای این دوره وجود نداره
    if (!chapters)
      throw createHttpError.NotFound("دوره ای با این ایدی (شناسه) یافت نشد");
    // در غیر اینصورت دوره رو ریترن کنه
    return chapters;

  }
}

module.exports = {
  ChapterController: new ChapterController(),
};
