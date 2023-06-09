// step 260 : cerate role route

const { RoleController } = require("../../http/controllers/admin/RBAC/role.controller");
const {stringToArray} = require("../../http/middlewares/stringToArray");
const router = require("express").Router();

// step 283:
router.get("/all", RoleController.getAllRoles);

// step 287 :
// هر وقت در بادی یه ارایه داشتی باید از متد تبدیل استرینگ ها به ارایه استفاده کنی
router.post("/create" ,stringToArray("permissions"), RoleController.createRole);

// step 296 :
router.delete("/delete/:field" , RoleController.deleteRole)

// step 301 :
router.patch("/edit/:roleID" ,stringToArray("permissions"), RoleController.editRoleByID)

module.exports = {
    Role_AdminApiRoutes :router
}