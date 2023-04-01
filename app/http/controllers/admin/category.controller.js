// step 57 : create controller for category

const createHttpError = require("http-errors");
const { CategoryModel } = require("../../../models/categories");
const {
  createCategorySchema,
} = require("../../validators/admin/category.schema");
const Controller = require("../controller");

class CategoryController extends Controller {

  async createCategory(req, res, next) {
    try {
      await createCategorySchema.validateAsync(req.body);

      // hamonaie k dar model schema body behesh dadim
      const { title, parent } = req.body;
      const category = await CategoryModel.create({ title, parent });
      if (!category)
        throw createHttpError.InternalServerError("خطای داخل سرور");
      return res.status(201).json({
        data: {
          statusCode: 201,
          message: "دسته بندی با موفقیت افزوده شد.",
        },
        error: null,
      });
    } catch (error) {
      next(error);
    }
  }

  removeCategory(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  editCategory(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  getAllCategory(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  getCategoryById(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  getAllParentsCategory(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  getChildCategory(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  CategoryController: new CategoryController(),
};
