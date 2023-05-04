// step 258 : cerate RBAC folder androle.controller.js
const Controller = require("../../controller");
const { RoleModel } = require("../../../../models/role");
const { StatusCodes } = require("http-status-codes");
const createHttpError = require("http-errors");
const { createRoleSchema } = require("../../../validators/admin/RBAC.schema");

class RoleController extends Controller {
  // step 282 :
  async getAllRoles(req, res, next) {
    try {
      //بعد ازاینکه پیدا کردی بیا پاپیولیت کن روی مسیر پرمیشن ها
      // چون در مدل رول ها ما به پرمیشن ها رف پرمیشن دادیم اینجا میشه پاپیولیت بزنیما دقیقا باید همون کلمه باشه
      const roles = await RoleModel.find({}).populate([
        { path: "permissions" },
      ]);
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        isSuccess: true,
        message: "گرفتن لیست نقش ها با موفقیت انجام شد.",
        data: { roles },
        error: null,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // step 286 :
  async createRole(req, res, next) {
    try {
      const { title, permissions } = await createRoleSchema.validateAsync(
        req.body
      ); // موارد درون  بادی باید ولیدیت بشن بعدش عنوان از داخلش بیاد بیرون

      await this.findRoleWithTitle(title); // بره در دیتابیس بگرده ببینه رولی با این عنوان وجود داره اگر داشت ارور بده و اینجا متوقف بشه ادامه نده بره خط های بعد
      // اگر در دیتابیس رولی با این عنوان نبود پس میریم برای ساختش در دیتابیس
      const role = await RoleModel.create({ title, permissions });
      if (!role)
        throw new createHttpError.InternalServerError("ایجاد نقش ناموفق بود");
      return res.status(StatusCodes.CREATED).json({
        statusCode: StatusCodes.CREATED,
        isSuccess: true,
        message: "  نقش  با موفقیت ساخته شد.",
        data: {
          role,
        },
        error: null,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // step 284 :
  async findRoleWithTitle(title) {
    const findedRole = await RoleModel.findOne({ title: title });
    // اگر قبلا رولی با عنوان در دیتابیس ذخیره شده باشه نباید اجازه بده دوباره مشابهش ساخته بشه
    if (findedRole)
      throw new createHttpError.BadRequest(
        "نقش یا رول مورد نظر قبلا ثبت شده است"
      );
    return findedRole;
  }
}

module.exports = {
  RoleController: new RoleController(),
};

