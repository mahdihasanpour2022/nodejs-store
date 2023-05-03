const { UserController } = require("../../http/controllers/admin/user/user.controller");

// step 244 :
const router =require("express").Router();

// step 245 :
router.get("/all", UserController.getAllUsers)

// step 252 :
router.patch("/edit-profile" , UserController.editUserProfile)

module.exports = {
    User_AdminApiRoutes : router
}
