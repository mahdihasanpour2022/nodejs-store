// step 261 : cerate Permission route

const { PermissionController } = require("../../http/controllers/admin/RBAC/permission.controller");

const router = require("express").Router();


// step 289 :
router.get( "/all", PermissionController.getAllPermissions );

module.exports = {
    Permission_AdminApiRoutes : router
}