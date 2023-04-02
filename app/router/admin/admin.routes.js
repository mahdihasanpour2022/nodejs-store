const { BlogAdminApiRoutes } = require("./blog");
const { CategoryRoutes } = require("./category");

const router = require("express").Router();

//step 62 :inja bashe vase hame route haie admin bshe azash estefade kone va baraie hamie routes ha tag ijad kon

/**
 * @swagger
 * tags:
 *  -    name: admin-panel
 *       description : actions for admins (add , remove , edit , ...)
 *  -    name: category(AdminPanel)
 *       description : all method for category section
 *  -    name: prisma(Api)
 *       description : create some api with prisma and postgreSQL category section
 *  -    name: blog(AdminPanel)
 *       description : made blog mangement admin panel
 */

// step 61 :
router.use("/category", CategoryRoutes);

// step 94 :
router.use("/blogs", BlogAdminApiRoutes);

module.exports = {
  adminRoutes: router,
};
