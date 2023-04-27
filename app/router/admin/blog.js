// step 91 :
const {AdminBlogController} = require("../../http/controllers/admin/blog/blog.controller");
const { uploadFile } = require("../../utils/multer");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const router = require("express").Router();

// step 95 :  // middleware k sakhtimo mizarim sare rahesh
router.post(
  "/create",
  uploadFile.single("image"),
  stringToArray("tags"),
  AdminBlogController.createBlog
);

// step 114 :  // middleware k sakhtimo mizarim sare rahesh
router.patch(
  "/update/:id",
  uploadFile.single("image"),
  stringToArray("tags"),
  AdminBlogController.updateBlogById
);

// step 92 :
router.get("/", AdminBlogController.getListOfBlogs);

// step 108 : INI K PARAM ID DARE BAIAD AKHARIN khat bashe
router.get("/:id", AdminBlogController.getOneBlogById);

// step 111 :
router.delete("/:id", AdminBlogController.deleteBlogById);

module.exports = {
  Blog_AdminApiRoutes: router,
};
