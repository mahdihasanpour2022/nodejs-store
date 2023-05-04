// step 305 :

const createHttpError = require("http-errors");
const { PermissionModel } = require("../../models/permissions");
const { RoleModel } = require("../../models/role");
const { PERMISSIONS } = require("../../utils/constants");

// ye closure ast k baiad bad az verify access token bashe iani agar ehraze hoviat shod hala rolesho bebinim chie
function checkPermission(requiredPermissions = []) {
  return async function (req, res, next) {
    try {
      const allPermissions = requiredPermissions.flat(2); // flat baes mishe k age to array shoma array bod va to on array ham ye array dge bod iani array to array shode bod ,mohtviate hamie in array haro bardare array haro pak kone va to ye array berize in 2 ham iani ta 2 array to dar to kar kone
      const user = req.user;
      // console.log("user:", user);
      // console.log("allPermissions:", allPermissions);
      //  ما اینجا میفهمیم که رل کاربر کدوم رل در بین رلهای موجود در دیتابیس هست حالا
      const role = await RoleModel.findOne({ title: user.Role }); // بریم در دیتابیس ببینیم کدوم نقش تایتلش بربره رل این کاربر هست
      // console.log("role:", role);
      //  ما اینجا میفهمیم که دسترسیهای کاربر که ارایس کدوم دسترسی در بین دسترسیهای موجود در دیتابیس هست حالا یعنی میگیم این کاربر الان به این سطوح ها در دیتابیس دسترسی داره
      const permissions = await PermissionModel.find({
        _id: { $in: role.permissions },
      }); //  میگه برو در دیتابیس ببین کدوم پرمیشن ایدیش برابره ایدی پرمیشن های این رلی که پیدا کردیمه
      // console.log("permissions:", permissions);
      // حالا که ارایه دسترسی ها رو داریم روش مپ میزنیم عنوان دسترسی ها رو ارایه میکنیم
      const userPermission = permissions.map((permission) => permission.title);
      // console.log("userPermission:", userPermission);
      // mikhaim bbinim k aya array userPermission hamie mvarede requiredPermissions ro to khodesh dare => true ya false mide
      // اگر همه موارد موجود در  ارایه دسترسی های لازم در ارایه دسترسی های کاربر باشه ترو میده اگه حتی یه دونش نباشه نتیجه فالسه
      const hasPermission = allPermissions.every((permission) =>
        userPermission.includes(permission)
      );
      // console.log("hasPermission :", hasPermission);
      if(userPermission.includes(PERMISSIONS.SUPERADMIN)) return next(); // یعنی اگه دسترسی آل رو داشت به همه چی دسترسی داره پس همینجا تموم کن داستان چک کردنو شخص دسترسی کامل داره حاجی
      // اگر ارایه دسترسی های لازم خالی بود یعنی اصلا به نقش خاصی برای دیدن این روت نیاز نیست همه میتونن دسترسی داشته باشن یا ارایه دسترسی های لازم پره ولی کاربر اجازه دسترسی رو داره نکست کن
      if (allPermissions.length == 0 || hasPermission) return next(); // next kon iani ejazie edame dare vared sho
      // در غیر اینصورت خطای ممنون برای شما میده
      throw createHttpError.Forbidden(
        "شما نمیتوانید به این سطح دسترسی داشته باشید "
      ); // Forbidden iani hamon 403 iani mahdodiate dastrasi
    } catch (error) {
      next(error);
    }
  };
}

module.exports = {
  checkPermission,
};
