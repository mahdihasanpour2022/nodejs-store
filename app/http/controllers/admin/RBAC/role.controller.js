// step 258 : cerate RBAC folder androle.controller.js
const Controller = require("../../controller");
const { RoleModel } = require("../../../../models/role");
const { StatusCodes } = require("http-status-codes");
const createHttpError = require("http-errors");
const { createRoleSchema } = require("../../../validators/admin/RBAC.schema");
const { default: mongoose } = require("mongoose");
const { copyObject } = require("../../../../utils/copyObject");
const {
  deleteInvalidPropertyInObject,
} = require("../../../../utils/deleteInvalidPropertyInObject");

class RoleController extends Controller {
  // step 282 :
  async getAllRoles(req, res, next) {
    try {
      //بعد ازاینکه پیدا کردی بیا پاپیولیت کن روی مسیر پرمیشن ها
      // چون در مدل رول ها ما به پرمیشن ها رف پرمیشن دادیم اینجا میشه پاپیولیت بزنیما دقیقا باید همون کلمه باشه
      // const roles = await RoleModel.find({}).populate([{ path: "permissions" }]);
      const roles = await RoleModel.find({});
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        isSuccess: true,
        message: "گرفتن لیست نقش ها با موفقیت انجام شد.",
        data: { roles },
        error: null,
      });
    } catch (error) {
      // console.log("error getAllRoles :", error);
      next(error);
    }
  }

  // step 286 :
  async createRole(req, res, next) {
    try {
      // console.log("req.body",req.body)
      const { title, permissions, description } =
        await createRoleSchema.validateAsync(req.body); // موارد درون  بادی باید ولیدیت بشن بعدش عنوان از داخلش بیاد بیرون

      // console.log("title, permissions :", title, permissions, description);
      await this.findRoleWithTitle(title); // بره در دیتابیس بگرده ببینه رولی با این عنوان وجود داره اگر داشت ارور بده و اینجا متوقف بشه ادامه نده بره خط های بعد
      // اگر در دیتابیس رولی با این عنوان نبود پس میریم برای ساختش در دیتابیس
      const role = await RoleModel.create({ title, permissions, description });
      if (!role)
        throw new createHttpError.InternalServerError("ایجاد نقش ناموفق بود");
      return res.status(StatusCodes.CREATED).json({
        statusCode: StatusCodes.CREATED,
        isSuccess: true,
        message: "نقش  با موفقیت ساخته شد",
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

  // step 295: delete kardaen ye role ba id ya tile k dar path gharar mide va ma dar req.params migirm
  async deleteRole(req, res, next) {
    try {
      const { field } = req.params;
      const role = await this.findRoleWithIdOrTitle(field);
      // حذف در دیتابیس
      const deleteRoleResult = await RoleModel.deleteOne({ _id: role.id }); // {_id : field } ghalate chon momkene title bashe na id
      if (!deleteRoleResult.deletedCount)
        throw new createHttpError.InternalServerError("حذف نقش ناموفق بود");
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        isSuccess: true,
        message: "نقش  با موفقیت حذف شد.",
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

  // step 300 :
  async editRoleByID(req, res, next) {
    try {
      const { roleID } = req.params;
      const findedRole = await this.findRoleWithIdOrTitle(roleID);
      const bodyData = copyObject(req.body); // vase inke parse beshe json bede
      const validateBodyData = deleteInvalidPropertyInObject(bodyData, []); // niazi blacklist nist hamin k field haie khali va falsy ro hazf kone kafie

      // console.log("roleID:", roleID); //6453ba46d1fe823c0c1adb04
      // console.log("findedRole._id:", findedRole._id); //new ObjectId("6453ba46d1fe823c0c1adb04")

      // اگر در دیتابیس رولی با این عنوان بود پس میریم برای اصلاحش در دیتابیس
      const updateRoleResult = await RoleModel.updateOne(
        { _id: findedRole._id }, //inam mishe test kardam doroste { _id:roleID }
        { $set: validateBodyData }
      ); // chon validateBodyData khodesh obj hast dge {} nemikhad
      if (!updateRoleResult)
        throw new createHttpError.InternalServerError(
          "بروزرسانی نقش ناموفق بود"
        );
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        isSuccess: true,
        message: "  نقش  با موفقیت بروزرسانی شد.",
        data: {
          findedRole, //  در ادیت و حذف چون داره در دیتابیس تغییر اتفاق میفته دیتا رو حتما حتما خالی بر گردون چون این چیزی که داری در دیتا میدی قدیمیه بدرد فرانت هم نمیخوره
        },
        error: null,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // step 294 :
  async findRoleWithIdOrTitle(field) {
    // way 1 :
    // // aval baiad check konim bebinim id hast ya title
    // let findQuery ; // let mizarim k beshe meghdar nadashte bashe
    // // check kardane in k aya field ye objectid iaz noie mongoose hast ya kheir
    // if(mongoose.isValidObjectId(field)) findQuery = {_id :field }
    // // agar ye id bar asase id haie mongoose nabod pas title hast
    // else findQuery = {title : field};
    // // agar na id bod na text iani khalie pas
    // if(!findQuery) throw new createHttpError.InternalServerError("عنوان یا ایدی مربوط به نقش ارسال نشده است");

    // way 2 (better  turnary operator):
    if (!field)
      throw new createHttpError.InternalServerError(
        "عنوان یا ایدی مربوط به نقش ارسال نشده است"
      );
    let findQuery = mongoose.isValidObjectId(field)
      ? { _id: field }
      : { title: field };
    const findedRole = await RoleModel.findOne(findQuery); // k in findQuery ya {_id :field } hast ya {title : field}
    if (!findedRole)
      throw new createHttpError.InternalServerError(
        "نقشی با این ایدی یا عنوان پیدا نشد"
      );
    return findedRole;
  }
}

module.exports = {
  RoleController: new RoleController(),
};
