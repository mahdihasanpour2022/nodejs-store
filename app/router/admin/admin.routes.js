
const { Blog_AdminApiRoutes } = require("./blog");
const { Category_AdminApiRoutes } = require("./category");
const { Chapter_AdminApiRoutes } = require("./chapter");
const { Course_AdminApiRoutes } = require("./course");
const { Episode_AdminApiRoutes } = require("./episode");
const { Permission_AdminApiRoutes } = require("./permission");
const { Product_AdminApiRoutes } = require("./product");
const { Role_AdminApiRoutes } = require("./role");
const { User_AdminApiRoutes } = require("./user");
const { checkPermission } = require("../../http/middlewares/checkPermission");
const { PERMISSIONS } = require("../../utils/constants");


const router = require("express").Router();

// step 129 :
router.use("/products",checkPermission([PERMISSIONS.SUPPLIER,PERMISSIONS.CONTENT_MANAGER]), Product_AdminApiRoutes);

// step 61 :
router.use("/category",checkPermission([PERMISSIONS.CONTENT_MANAGER]), Category_AdminApiRoutes);

//step 62 :inja bashe vase hame route haie admin bshe azash estefade kone va baraie hamie routes ha tag ijad kon
router.use("/blogs",checkPermission([PERMISSIONS.TEACHER]), Blog_AdminApiRoutes);

// step 153 :
router.use("/courses" ,checkPermission([PERMISSIONS.TEACHER]), Course_AdminApiRoutes);

//step 179 :
router.use("/chapters" ,checkPermission([PERMISSIONS.TEACHER]), Chapter_AdminApiRoutes );

// step 207 :
router.use("/episodes" ,checkPermission([PERMISSIONS.TEACHER]), Episode_AdminApiRoutes);

// step 246 :
// step 306 :add checkPermission baraie mahdod kardane dastresi
router.use("/users" ,checkPermission([PERMISSIONS.USER]), User_AdminApiRoutes )

// step 265 :
router.use("/roles",checkPermission([PERMISSIONS.ADMIN]),Role_AdminApiRoutes)

// step 266 :
router.use("/permissions",checkPermission([PERMISSIONS.ADMIN]), Permission_AdminApiRoutes)// فقط اونیکه دسترسی آل داره میتونه رل یا دسترسی ها رو ببینه

module.exports = {
  adminRoutes: router,
};
