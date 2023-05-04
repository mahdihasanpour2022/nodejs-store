// step 261 : cerate Permission route
const { PermissionController } = require("../../http/controllers/admin/RBAC/permission.controller");
const router = require("express").Router();

// step 289 :
router.get( "/all", PermissionController.getAllPermissions );

// step  293 :
router.post("/create" , PermissionController.createPermission)

 // step 299 :
 router.delete("/delete/:permissionID",PermissionController.deletePermissionByID )

// step 303 :
router.patch("/edit/:permissionID", PermissionController.editPermissionByID)

module.exports = {
    Permission_AdminApiRoutes : router
}