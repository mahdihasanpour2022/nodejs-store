const { CategoryRoutes } = require("./category");

//// step 61 :
const router = require("express").Router();

//step 62 :inja bashe vase hame route haie admin bshe azash estefade kone

/**
 * @swagger
 * tags:
 *  -    name: admin-panel
 *       description : actions for admins (add , remove , edit , ...)
 *  -    name: category(AdminPanel)
 *       description : all method for category section 
 */

router.use("/category", CategoryRoutes);


module.exports = {
  adminRoutes: router,
};
