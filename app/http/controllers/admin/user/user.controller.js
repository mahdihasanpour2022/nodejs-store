// step 242 :
const Controller = require("../../controller");
const { UserModel } = require("../../../../models/users");
const { StatusCodes } = require("http-status-codes");

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
        message: "لیست همه ماربران با موفقیت گرفته شد",
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
}
module.exports = {
  UserController: new UserController(),
};
