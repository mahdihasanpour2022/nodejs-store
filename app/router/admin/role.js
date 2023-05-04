// step 260 : cerate role route

const { RoleController } = require("../../http/controllers/admin/RBAC/role.controller");

const router = require("express").Router();

// step 283:
router.get("/all", RoleController.getAllRoles)

module.exports = {
    Role_AdminApiRoutes :router
}