const { Blog_AdminApiRoutes } = require("./blog");
const { Category_AdminApiRoutes } = require("./category");
const { Course_AdminApiRoutes } = require("./course");
const { Product_AdminApiRoutes } = require("./product");

const router = require("express").Router();

// step 128 : add  Product(AdminPanel) here
// step 154 :  add course(AdminPanel) here
/**
 * @swagger
 * tags:
 *  -    name: admin-panel
 *       description : actions for admins (add , remove , edit , ...)
 *  -    name: course(AdminPanel)
 *       description : management course routes
 *  -    name: category(AdminPanel)
 *       description : all method for category section
 *  -    name: product(AdminPanel)
 *       description : management Product routes
 *  -    name: blog(AdminPanel)
 *       description : made blog mangement admin panel
 *  -    name: prisma(Api)
 *       description : create some api with prisma and postgreSQL category section
 */

// step 129 :
router.use("/products", Product_AdminApiRoutes);

// step 61 :
router.use("/category", Category_AdminApiRoutes);

//step 62 :inja bashe vase hame route haie admin bshe azash estefade kone va baraie hamie routes ha tag ijad kon
router.use("/blogs", Blog_AdminApiRoutes);

// step 153 :
router.use("/courses" , Course_AdminApiRoutes)

module.exports = {
  adminRoutes: router,
};
