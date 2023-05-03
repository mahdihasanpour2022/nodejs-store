const { UserController } = require("../../http/controllers/admin/user/user.controller");

// step 244 :
const router =require("express").Router();

// step 245 :
router.get("/all", UserController.getAllUsers)

module.exports = {
    User_AdminApiRoutes : router
}
