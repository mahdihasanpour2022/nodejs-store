const { UserController } = require("../../http/controllers/admin/user/user.controller");
const { checkPermission } = require("../../http/middlewares/checkPermission");
const { PERMISSIONS } = require("../../utils/constants");

// step 244 :
const router =require("express").Router();

// step 245 : این مهمه یعنی 
// step 307 : add checkPermission for overwrite 
//این مهمه یعنی درسته ما در قسمت ادمین روت گفتیم مثلا ادمین و سوپر ادمین و یوزر به قسمت یوزر دسترسی داشته باشند اما برای گرفتن لیست همه کاربران حتما باید تگ آل داشته باشه یعنی این درخواست رو فقط ادمین و سوپر ادمین میتونن کال کنن نه مثلا یوزر 

router.get("/all",checkPermission(PERMISSIONS.ADMIN) , UserController.getAllUsers)

// step 252 :
router.patch("/edit-profile" , UserController.editUserProfile)

// step 308 :
router.get("/profile" , UserController.getUserProfile)


module.exports = {
    User_AdminApiRoutes : router
}
