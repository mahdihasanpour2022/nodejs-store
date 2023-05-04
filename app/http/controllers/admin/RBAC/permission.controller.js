// step 259 :
const Controller = require("../../controller");
const { PermissionModel } = require("../../../../models/permissions");
const { StatusCodes } = require("http-status-codes");

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

}

module.exports = {
  PermissionController: new PermissionController(),
};
