// step 259 :
const Controller = require("../../controller");
const { PermissionModel } = require("../../../../models/permissions");
const { StatusCodes } = require("http-status-codes");
const { createPermissionSchema } = require("../../../validators/admin/RBAC.schema");
const createHttpError = require("http-errors");

class PermissionController extends Controller {
  // step 288 :
  async getAllPermissions(req, res, next) {
    try {
      const permissions = await PermissionModel.find({});
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.CREATED,
        isSuccess: true,
        message: "سطوح دسترسی با موفقیت گرفته شد",
        data: {
          permissions,
        },
        error: null,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // step 292 :
  async createPermission(req, res, next) {
    try {
      const { title, description } = await createPermissionSchema.validateAsync(req.body);
      await this.findPermissionWithTitle(title); // بره در دیتابیس بگرده ببینه رولی با این عنوان وجود داره اگر داشت ارور بده و اینجا متوقف بشه ادامه نده بره خط های بعد
      const permission = await PermissionModel.create({ title, description });
      if (!permission) throw new createHttpError.InternalServerError("ایجاد سطح دسترسی ناموفق بود");
      return res.status(StatusCodes.CREATED).json({
        statusCode: StatusCodes.CREATED,
        isSuccess: true,
        message: "سطح دسترسی(پرمیشن) با موفقیت ساخته شد.",
        data: {
          permission,
        },
        error: null,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // step 291 :
  async findPermissionWithTitle(title){
    const findedPermission = await PermissionModel.findOne({ title : title }); // dar es6 ma vaghti key  va value barabare yekisho minevisim
    if (findedPermission)throw new createHttpError.BadRequest("سطح دسترسی(پرمیشن) مورد نظر قبلا ثبت شده است");
    return findedPermission;
  }
}

module.exports = {
  PermissionController: new PermissionController(),
};
