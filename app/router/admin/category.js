const router = require("express").Router();
const {
  CategoryController,
} = require("../../http/controllers/admin/category.controller");

// step 59 :
router.post("/create", CategoryController.createCategory);

// step 72:
router.get("/all", CategoryController.getAllCategory);

// step 64 :
router.get("/parents", CategoryController.getAllParentsCategory);

// step 69 :
router.get(
  "/children/:parent",
  CategoryController.getChildrenOfParentsCategory
);

// step 75 :
router.delete("/remove/:id", CategoryController.removeCategory);

// step 83 : in baiad balatar az marhalie 77 bashe chon onke param dare baiad akharin khat bashe
router.get("/list-of-all", CategoryController.getAllCategoriesWithoutPopulate);

// step 87 : chon faghat ye parameter title ro darim avaz mikonim baiad patch bashe na put
router.patch("/update/:id", CategoryController.updateCategoryTitle);

// step 77 :
router.get("/:id", CategoryController.getCategoryById);

// hamishe esme router ha pascal bashe
module.exports = {
  Category_AdminApiRoutes: router,
};
