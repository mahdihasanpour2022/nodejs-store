const {
  ProductController,
} = require("../../http/controllers/admin/product/product.controller");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const { uploadFile } = require("../../utils/multer");
const router = require("express").Router();

// step 126 : route for product
// وقتی میخوای عکس بفرستی برای بک اند از این فانکشن آپلود فایل که نوشتی استفاده کن همیشه
 // 10 iani maxCount iani hadeaksar 10 ta ax mitone upload kone
router.post("/create",uploadFile.array("images" , 10),stringToArray("tags", "colors"),ProductController.createProduct);

// step 141 : yarn add @types/hapi__joi  and yarn add @types/http-errors
// step 140 :
router.delete("/remove/:id" , ProductController.deleteProduct);

//step 134 :
router.get("/all", ProductController.getAllProducts) 

//step 149:
router.patch("/edit/:id" , 
uploadFile.array("images" , 10), // 10 iani maxCount iani hadeaksar 10 ta ax mitone upload kone
stringToArray("tags", "colors"),
ProductController.editProduct )

// step: 137 :
router.get("/:id" , ProductController.getOneProduct)


module.exports = {
  Product_AdminApiRoutes: router,
};
