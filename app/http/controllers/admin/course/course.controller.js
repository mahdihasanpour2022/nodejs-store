const createHttpError = require("http-errors");
const { CourseModel } = require("../../../../models/course");
const {
  createCourseSchema,
} = require("../../../validators/admin/course.schema");
const Controller = require("../../controller");
const { StatusCodes } = require("http-status-codes");
const path = require("path");
const { default: mongoose } = require("mongoose");
const { copyObject } = require("../../../../utils/copyObject");
const {
  deleteInvalidPropertyInObject,
} = require("../../../../utils/deleteInvalidPropertyInObject");
const { deleteFileInPublic } = require("../../../../utils/deleteFileInPublic");

class CourseController extends Controller {
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

      const image = path.join(fileUploadPath, filename).replace(/\\/g, "/");
      const teacher = req.user._id; // req ham body dare ham req.user ham req.file ham req.files
      //اگر دوره رو رایگان در نظر گرفت معلم و پس نباید براش قیمت بزاره
      if (Number(price) > 0 && type === "free")
        throw createHttpError.BadRequest(
          "برای دوره رایگان نمیتوانید قیمت در نظر بگیرید"
        );

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
        status: "notStarted",
        teacher,
      });
      if (!course?._id)
        throw createHttpError.InternalServerError("ایجاد دوره ناموفق بود."); // اگر دوره در دیتا بیس صحیح ثبت بشه پس یک ایدی میده بهش دیتابیسی که ما با اون چک میکنیم ببینیم واقعا ثبت شده یا نه
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

  // step 155 :
  async getAllCourses(req, res, next) {
    try {
      const { search } = req.query;
      let courses; // baiad let bashe k betonim  meghdardehi konim
      // در صورتیکه یه متنی وارد کرده باشه میره تو دیتا بیس بر اساس اون جستجو میکنه
      if (search)
        courses = await CourseModel.find({ $text: { $search: search } })
          .populate([
            // { path: "category", select: { children: 0, parent: 0 } }, // dar category model goftim har ja roie category populate zadim dar proje bia va children ro bsaz va dar children etelaati ro bede hala miaim populate mizanim ama migim parent va children ro nade
            { path: "category", select: { title: 1 } }, //in iani faghat title ro neshon bede
            {
              path: "teacher",
              select: { first_name: 1, last_name: 1, mobile: 1, email: 1 },
            },
          ])
          .sort({ _id: -1 });
      // sort ba id -1 iani akharin record aval neshon dade mishe
      // در غیر اینصورت
      else
        courses = await CourseModel.find({})
          .populate([
            { path: "category", select: { title: 1 } }, // dar category model goftim har ja roie category populate zadim dar proje bia va children ro bsaz va dar children etelaati ro bede hala miaim populate mizanim ama migim parent va children ro nade
            {
              path: "teacher",
              select: { first_name: 1, last_name: 1, mobile: 1, email: 1 },
            },
          ])
          .sort({ _id: -1 });
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

  // step 231: اینو یادش رفته بود بزاره ته دوره یادش افتاد
  async updateCourseById(req, res, next) {
    try {
      const { courseID } = req.params;
      const { fileUploadPath, filename } = req.body; // axa to body ersal shode na req.file

      const course = await this.findCourseByID(courseID);
      const bodyData = copyObject(req.body); // chon tosh id dare baiad validate beshe

      let blackList = [
        "time",
        "chapters",
        "episodes",
        "likes",
        "dislikes",
        "bookmarks",
        "comments",
        "fileUploadPath",
        "filename",
      ]; // mirim dar course model va to mavaredesh onaie k nemikhaim taghiere konar o inja vared mikonim
      deleteInvalidPropertyInObject(bodyData, blackList);

      if (req.file) {
        // agar axi dar req.file hast baiad pak beshe chon axa dar req.body ro mikhaim beferestin dar db
        bodyData.image = path.join(fileUploadPath, filename); // sakhte adrese kamel
        deleteFileInPublic(course.image); // addreso az public shoro  mikone michasbone besh va agar ghablan bode hamchin chizi hazfesh mikone
      }
      const uypdateCourseResult = await CourseModel.updateOne(
        { _id: courseID },
        {
          $set: bodyData, // baraie edit va update az $set use kon va chon bodyData obj hast pas dar {} nemizarimesh
        }
      );
      if (!uypdateCourseResult.modifiedCount)
        throw new createHttpError.InternalServerError("ادیت دوره ناموفق بود");
      // console.log("uypdateCourseResult:", uypdateCourseResult);
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        isSuccess: true,
        message: "دوره با موفقیت بروز رسانی شد",
        data: {
          course: bodyData,
        },
        error: null,
      });
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }

  // step 238:
  async deleteCourse(req, res, next) {
    try {
      const { courseID } = copyObject(req.params);
      const course = await this.findCourseByID(courseID); // halate validation dare

      console.log("courseID:", courseID); // mishe in      644bc37cc0aa63a4f1a391f0
      console.log("course._id:", course._id); // mishe in  new ObjectId("644bc37cc0aa63a4f1a391f0") // ایدی های دیتابیسی از این نوع استن این شکلین
      //پس چون ایدی در دیتابیس از نوع ایدی مانگوسی است پس هیچ موقع مستقیم ایدی رو نده بلکه ابجکت با ان ایدی رو پیدا کن مثلا دوره هست اینجا و بعد بگو بره بگرده در دیتابیس که اگر ایدیش با ایدی این یکی بود حذف یا ادیت کنه
      const deleteCourseResult = await CourseModel.deleteOne({
        _id: course._id,
      });
      if (deleteCourseResult.modifiedCount == 0)
        throw new createHttpError.InternalServerError("حذف دوره ناموفق بود");
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        isSuccess: true,
        message: "دوره با موفقیت حذف شد",
        data: {
          // course, //  در مواقع حذف بهتره دیتا رو خالی در خروجی بفرستی
        },
        error: null,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // step 166 :
  async getCourseByID(req, res, next) {
    try {
      const { id } = req.params;
      const course = await this.findCourseByID(id);
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        isSuccess: true,
        message: "دوره با موفقیت یافت شد",
        data: {
          course,
        },
        error: null,
      });
    } catch (error) {
      next(error);
    }
  }

  // step 165 : az try va catch nemitoni estefade kone chon masalan req ya next ro b onvane argoman nagerefte
  async findCourseByID(courseID) {
    // باید چک کنه مانگوس ببینه ایدی که یوزر وارد کرده مطابق الگوی ایدی های ذخیره شده در دیتابیس هست یا خیر
    if (!mongoose.isValidObjectId(courseID))
      throw createHttpError.BadRequest("شناسه دوره ارسال شده صحیح نمی باشد. ");
    const course = await CourseModel.findById({ _id: courseID });
    if (!course)
      throw createHttpError.InternalServerError(
        "دوره ای با اسن شناسه (ایدی) پیدا نشد."
      );
    return course;
  }
}

module.exports = {
  // AbstractCourseController : CourseController, // چون کنترلر مربوط به چپتر زیر مجموعه این میخواهیم باشه پس از این کنترلر یک ابسترکت یا همان کلاس مفهومی یا کلاس انتزاعی تهیه میکنیم  ک در کلاس چپتر بتونه استاده بشه
  CourseController: new CourseController(),
};
