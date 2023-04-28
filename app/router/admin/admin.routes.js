const { Blog_AdminApiRoutes } = require("./blog");
const { Category_AdminApiRoutes } = require("./category");
const { Chapter_AdminApiRoutes } = require("./chapter");
const { Course_AdminApiRoutes } = require("./course");
const { Episode_AdminApiRoutes } = require("./episode");
const { Product_AdminApiRoutes } = require("./product");

const router = require("express").Router();

// step 129 :
router.use("/products", Product_AdminApiRoutes);

// step 61 :
router.use("/category", Category_AdminApiRoutes);

//step 62 :inja bashe vase hame route haie admin bshe azash estefade kone va baraie hamie routes ha tag ijad kon
router.use("/blogs", Blog_AdminApiRoutes);

// step 153 :
router.use("/courses" , Course_AdminApiRoutes);

//step 179 :
router.use("/chapters" , Chapter_AdminApiRoutes );

// step 207 :
router.use("/episodes" , Episode_AdminApiRoutes);

module.exports = {
  adminRoutes: router,
};
