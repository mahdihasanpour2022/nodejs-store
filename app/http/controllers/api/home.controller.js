// step 8 :
const createHttpError = require("http-errors");
const { getOtpSchema } = require("../../validators/user/auth.schema");
const Controller = require("../controller");

module.exports = new class HomeController extends Controller {

   indexPage(req, res, next) {
    try {
      // const result =await getOtpSchema.validateAsync(req.body);
      return res.status(200).send("صفحه اصلی را نمایش میدهیم");
    } catch (error) {
      // next(createHttpError.BadRequest(error.message));
      next(error);
    }
  }

};
