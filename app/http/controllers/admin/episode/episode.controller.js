const {
  createEpisodeSchema,
} = require("../../../validators/admin/episode.schema");
const Controller = require("../../controller");
const { default: getVideoDurationInSeconds } = require("get-video-duration"); // hatman ba default varedesh kon gheire in kar nemikone
const path = require("path");
const { getTime } = require("../../../../utils/getTime");
const { CourseModel } = require("../../../../models/course");
const createHttpError = require("http-errors");
const { StatusCodes } = require("http-status-codes");
const {
  deleteInvalidPropertyInObject,
} = require("../../../../utils/deleteInvalidPropertyInObject");
const { ObjectValidator } = require("../../../validators/public.validator");
const { copyObject } = require("../../../../utils/copyObject");

class EpisodeController extends Controller {
  // step 204 : create episode controller
  async createEpisode(req, res, next) {
    try {
      // باید اعتبار سنجی کنه جویی هپی مقادیری رو که فرانت فرستاده
      //این ها مواردی هست که اپیزود اسکیما که در پوشه ولیدیشن هست داره برای ما بر میگردونه
      const {
        title,
        text,
        type,
        courseID,
        chapterID,
        filename,
        fileUploadPath,
      } = await createEpisodeSchema.validateAsync(req.body); // برای متدهایی که در کنترلر چپتر  گذاشته عرفان یوسفی یادش رفته اسکیما برای ولیدیشن قرار بده

      // console.log("fileUploadPath :", fileUploadPath);

      // step 211 : yarn add get-video-duration
      const videoAddress = path
        .join(fileUploadPath, filename)
        .replace(/\\/g, "/");
      // console.log("videoAddress : ", videoAddress); // mishe masalan in uploads/blogs/2023/3/27/1682625934018.mp4

      // in local
      const videoURL = `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${videoAddress}`;
      // in liara1
      // const videoURL = `${}/${videoAddress}`; // nemidonam
      // console.log("videoURL : ", videoURL); // mishe masalan in  http://localhost:3000/uploads/blogs/2023/3/27/1682625934018.mp4

      // tabdil video b time video bar hasbe sanie
      const seconds = await getVideoDurationInSeconds(videoURL); // in packaje az noie async hast pas await mikhad
      // console.log("seconds : ", seconds); // mishe masalan in 201.16
      // step 212 :
      const time = getTime(seconds);
      // console.log("time : ", time); // masalan ishe "00:03:21"
      const episode = {
        title,
        text,
        type,
        time,
        videoAddress,
      };
      // ذخیره در دیتابیس
      const createEpisodeResult = await CourseModel.updateOne(
        { _id: courseID, "chapters._id": chapterID },
        {
          // boro to db va bebin id kodom course barabare in courseID hast va boro tosh bebin to chaptere on course kodom objecte chapter idish barabare in chapteID hast va in karharo bokon
          $push: {
            "chapters.$.episodes": episode, // in chapters.$episodes  iani neshon dahandie on chapterie k peida shode k episodo be array episodes dakhelesh ezafe konim iani dar db injorie course>chapters>chapter>episodes be db negah koni motevajeh mishi
          },
        }
      );
      if (!createEpisodeResult.modifiedCount)
        throw new createHttpError.InternalServerError(
          "اضافه شدن اپیزود(ویدئو) به فصل دوره ناموفق بود"
        );
      // حالا که در دیتابیس نشسته دیتامون پس به فرانت ریسپانس جواب رو میدیم

      console.log("createEpisodeResult:", createEpisodeResult);

      return res.status(StatusCodes.CREATED).json({
        statusCode: StatusCodes.CREATED,
        isSuccess: true,
        message: "اپیزود با موفقیت به فصل دوره اضافه شد.",
        data: {
          episode, // میتونی دیتا رو هم خالی بفرستی کلا فقط برای درخواست های گت ما در دیتا باید نتیجه بدیم
        },
        error: null,
      });
    } catch (error) {
      console.log("error:", error);
      next(error);
    }
  }

  // step 217.1 :
  async deleteEpisodeById(req, res, next) {
    try {
      const { id: episodeID } = await ObjectValidator.validateAsync({
        id: req.params.episodeID,
      }); // chon dar createEpisodeSchema id nist ba in deleteInvalidPropertyInObject validatesh mikonim
      await this.findEpisodeInDB(episodeID);
      // حذف از دیتابیس
      const deleteEpisodeResult = await CourseModel.updateOne(
        {
          // chon episode va chapter dar course hastand pas baraie hazfeshon course daron db baiad update beshe na delete agar bezari deleteOne kolan course pak mishe pas az patch estefae kon  va updateOne
          "chapters.episodes._id": episodeID,
        }, // boro to course va chapterse to course va episodese to chapter bebin kodomeshon idish eine ine
        {
          $pull: {
            "chapters.$.episodes": {
              // chapters.$ iani on chapters k peyda kardi va dar obj haie tosh array b name episodes dare
              _id: episodeID, //  k to in episodes ye episode hast k idish ba episodeID barabare ro dar nazar begir  va az onja pull kon hazf bshe
            },
          },
        }
      );
      if (deleteEpisodeResult.modifiedCount == 0)
        throw new createHttpError.InternalServerError("حذف اپیزود ناموفق بود");
      // در صورت تغییر در دیتابیس با موفقیت به فرانت جواب ریسپانس بده
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.CREATED,
        isSuccess: true,
        message: "اپیزود با موفقیت از فصل دوره حذف شد.",
        data: {},
        error: null,
      });
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }

  async updateOneEpisodeById(req, res, next) {
    try {
      const { episodeID } = req.params;
      const episode = await this.getOneEpisode(episodeID);
      const { filename, fileUploadPath } = req.body;
      let blackListFields = ["_id"];
      if (filename && fileUploadPath) {
        const fileAddress = path.join(fileUploadPath, filename);
        req.body.videoAddress = fileAddress.replace(/\\/g, "/");
        const videoURL = `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${req.body.videoAddress}`;
        const seconds = await getVideoDurationInSeconds(videoURL);
        req.body.time = getTime(seconds);
        blackListFields.push("filename");
        blackListFields.push("fileUploadPath");
      } else {
        blackListFields.push("time");
        blackListFields.push("videoAddress");
      }
      const data = req.body;
      deleteInvalidPropertyInObject(data, blackListFields);
      const newEpisode = {
        ...episode,
        ...data,
      };
      const editEpisodeResult = await CourseModel.updateOne(
        {
          "chapters.episodes._id": episodeID,
        },
        {
          $set: {
            "chapters.$.episodes": newEpisode,
          },
        }
      );
      if (!editEpisodeResult.modifiedCount)
        throw new createHttpError.InternalServerError(
          "ویرایش اپیزود انجام نشد"
        );
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        data: {
          message: "ویرایش اپیزود با موفقیت انجام شد",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getOneEpisode(episodeID) {
    const course = await CourseModel.findOne(
      { "chapters.episodes._id": episodeID },
      {
        // "chapters.$.episodes": 1
        "chapters.episodes.$": 1,
      }
    );
    if (!course) throw new createHttpError.NotFound("اپیزودی یافت نشد");
    const episode = await course?.chapters?.[0]?.episodes?.[0];
    if (!episode) throw new createHttpError.NotFound("اپیزودی یافت نشد");
    return copyObject(episode);
  }
}
module.exports = {
  EpisodeController: new EpisodeController(),
};
