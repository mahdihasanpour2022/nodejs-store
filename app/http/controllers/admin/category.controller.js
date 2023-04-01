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
  // step 66 :
  async getAllParentsCategory(req, res, next) {
    try {
      // baraie peida kardane onaie k parenteshon undefined hast => find baiad bashe chon yeki nist
      // __v : 0 iani dar object haie k darone array k ba find migire __v hazf kon 
      const parents = await CategoryModel.find({ parent: undefined }, {__v : 0} );
      return res.status(200).json({
        data: {
          parents,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  // step 67 :
  async getChildrenOfParentsCategory(req, res, next) {
    try {
      const { parent } = req.params;
      // dar akharesh har chi benevisi dar res neshon  dade nemishe masalan __v : 0
      const children = await CategoryModel.find({ parent } , {__v : 0 ,parent : 0 } );
      return res.status(200).json({
        data: {
          children,
        },
        error: null,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  CategoryController: new CategoryController(),
};
