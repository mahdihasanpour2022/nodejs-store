// step 242 :
const Controller = require("../../controller");
const { UserModel } = require("../../../../models/users");
const { StatusCodes } = require("http-status-codes");
const {
  deleteInvalidPropertyInObject,
} = require("../../../../utils/deleteInvalidPropertyInObject");
const createHttpError = require("http-errors");

class UserController extends Controller {
  // step 243 :
  async getAllUsers(req, res, next) {
    try {
      const { search } = req.query; // har chizi ro dar req haie az noie get dar query frontend ya swagger ersal kone ma dar req.query migirim va agar dar path ersal kone dar req.params migirim ;

      const dataBaseQuery = {}; // یه آبجکت خالی میسازیم
      if (search) dataBaseQuery["$text"] = { $search: search }; // میگیم اگر کاربر چیزی رو در کوئری جستجو کرد بیا و در این متغیر آبجکت یه کی قرار بده که بصورت متن باشه با نام سرچ
      // از دیتابیس دیتاها رو بگیره
      const users = await UserModel.find(dataBaseQuery);
      // در ریسپانس ارسال کنه
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        isSuccess: true,
        message: "لیست همه کاربران با موفقیت گرفته شد",
        data: {
          users,
        },
        error: null,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // step 251 : id ro dar params midim baraie edit va ba req.query va text search shode ro dar query midim va ba req.params
  // ama inja user k login kone dar req.user datash hast ma b jaie req.query az hamon migirim
  async editUserProfile(req, res, next) {
    try {
      // const {id} = req.params;
      let editedData = req.body;
      const BlackList = [
        "mobile",
        "otp",
        "bills",
        "discount",
        "Roles",
        "courses",
      ]; //برای اینکه بگی چه چیزهایی رو نمیخوای در بادی اگر هم فرانت فرستاد نباشه باید در مدل یوزر ببینی و اوناییکه نمیخوای رو اینجا بنویسی
      deleteInvalidPropertyInObject(editedData, BlackList);
      const userID = req.user._id;
      //   console.log("req.user :", req.user); // ino hatman bebin req to khodesh tamame data user login shodaro dare
      //   console.log("editedData :", editedData);
      //way 1
      //   editedData.id = req.user._id;
      //   editedData.mobile = req.user.mobile;
      // or way 2
      editedData = { ...editedData, id: req.user._id, mobile: req.user.mobile };
      // تغییر در دیتابیس
      const updateUserProfileResult = await UserModel.updateOne(
        { _ID: userID },
        { $set: editedData }
      ); // on useri k _id barabare userID hast peyda kon badesh barash in chiza ro set kon
      if (!updateUserProfileResult.modifiedCount)
        throw new createHttpError.InternalServerError(
          "بروز رسانی پروفایل کاربر ناموفق بود"
        );
      // ارسال جواب به بک اند
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        isSuccess: true,
        message: "پروفایل کاربر با موفقیت بروزرسانی شد",
        data: {
          user: editedData,
        },
        error: null,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

// step 309 :
async getUserProfile(req, res, next) {
  try {
    const user = req.user;
    return res.status(StatusCodes.OK).json({
      statusCode: StatusCodes.OK,
      isSuccess: true,
      message: "پروفایل کاربر با موفقیت گرفته شد",
      data: {
        user,
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
  UserController: new UserController(),
};
