// step 258 : cerate RBAC folder androle.controller.js
const Controller = require("../../controller");
const { RoleModel } = require("../../../../models/role");
const { StatusCodes } = require("http-status-codes");

class RoleController extends Controller {

    // step 282 :
  async getAllRoles(req, res, next) {
    try {
      //بعد ازاینکه پیدا کردی بیا پاپیولیت کن روی مسیر پرمیشن ها
      // چون در مدل رول ها ما به پرمیشن ها رف پرمیشن دادیم اینجا میشه پاپیولیت بزنیما دقیقا باید همون کلمه باشه
      const roles = await RoleModel.find({}).populate([{ path: "permissions" }]);
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
}

module.exports = {
  RoleController: new RoleController(),
};

// async an(req, res, next) {
//     try {
//         const roles = await RoleModel.find({});
//         return res.status(StatusCodes.OK).json({
//             statusCode: StatusCodes.OK,
//         isSuccess: true,
//         message: "گرفتن لیست نقش ها با موفقیت انجام شد.",
//         data: {},
//         error: null,
//         })
//     } catch (error) {
//       console.log(error);
//       next(error);
//     }
//   }
