// step 259 :
const Controller = require("../../controller");
const { PermissionModel } = require("../../../../models/permissions");
const { StatusCodes } = require("http-status-codes");
const { copyObject } = require("../../../../utils/copyObject");
const {deleteInvalidPropertyInObject} = require("../../../../utils/deleteInvalidPropertyInObject");
const {
  createPermissionSchema,
} = require("../../../validators/admin/RBAC.schema");
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
  // دسترسی که بسازیم یه ایدی میده یعنی این دسترسی مثلا برای بلاگ هست و بعد که رول ساختیم در قسمت دسترسی رول این ایدی رو میدیم به رول که شخص با اون رول به این قسمت بلاگ دسترسی داشته باشه
  async createPermission(req, res, next) {
    try {
      const { title, description } = await createPermissionSchema.validateAsync(
        req.body
      );
      await this.findPermissionWithTitle(title); // بره در دیتابیس بگرده ببینه رولی با این عنوان وجود داره اگر داشت ارور بده و اینجا متوقف بشه ادامه نده بره خط های بعد
      const permission = await PermissionModel.create({ title, description });
      if (!permission)
        throw new createHttpError.InternalServerError(
          "ایجاد سطح دسترسی ناموفق بود"
        );
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
  async findPermissionWithTitle(title) {
    const findedPermission = await PermissionModel.findOne({ title: title }); // dar es6 ma vaghti key  va value barabare yekisho minevisim
    if (findedPermission)
      throw new createHttpError.BadRequest(
        "سطح دسترسی(پرمیشن) مورد نظر قبلا ثبت شده است"
      );
    return findedPermission;
  }

  // step 298 :
  async deletePermissionByID(req, res, next) {
    try {
      const { permissionID } = req.params;
      const findedPermission = await this.findPermissionByID(permissionID);

      console.log("permissionID:", permissionID);
      console.log("permission id:", findedPermission.id);

      const deletePermissionResult = await PermissionModel.deleteOne({
        _id: permissionID,
      });
      if (!deletePermissionResult.deletedCount)
        throw new createHttpError.InternalServerError("حذف دسترسی ناموفق بود");
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        isSuccess: true,
        message: "سطح دسترسی(پرمیشن) با موفقیت حذف شد.",
        data: {
          findedPermission,
        },
        error: null,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // step 302 :
  async editPermissionByID(req, res, next) {
    try {
      const { permissionID } = req.params;
       await this.findPermissionByID(permissionID);
      const bodyData = copyObject(req.body); // vase inke parse beshe json bede
      const validateBodyData = deleteInvalidPropertyInObject(bodyData, []); // niazi blacklist nist hamin k field haie khali va falsy ro hazf kone kafie

      // اگر در دیتابیس دسترسی با این عنوان بود پس میریم برای اصلاحش در دیتابیس
      const updatePermissionResult = await PermissionModel.updateOne(
        { _id: permissionID },
        { $set: validateBodyData }
      ); // chon validateBodyData khodesh obj hast dge {} nemikhad
      if (!updatePermissionResult)
        throw new createHttpError.InternalServerError(
          "بروزرسانی دسترسی ناموفق بود"
        );
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        isSuccess: true,
        message: "  سطح دسترسی  با موفقیت بروزرسانی شد.",
        data: {}, //step 304 : در ادیت و حذف چون داره در دیتابیس تغییر اتفاق میفته دیتا رو حتما حتما خالی بر گردون چون اگر چیزی در دیتا بدی قدیمیه بدرد فرانت هم نمیخوره
        error: null,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // step 297 :
  async findPermissionByID(permissionID) {
    const permission = await PermissionModel.findOne({ _id: permissionID });
    if (!permission)
      throw new createHttpError.NotFound(
        "سطح دسترسی(پرمیشن) مورد نظر یافت نشد"
      );
    return permission;
  }
}

module.exports = {
  PermissionController: new PermissionController(),
};
