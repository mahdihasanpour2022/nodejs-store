// step 57 : create controller for category

// const { default: mongoose } = require("mongoose"); // mongoose ro injori require nakon
const createHttpError = require("http-errors");
const { CategoryModel } = require("../../../models/categories");
const {
  createCategorySchema,
  updateCategorySchema,
} = require("../../validators/admin/category.schema");
const Controller = require("../controller");
const mongoose = require("mongoose");

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
  // step 74 : $or iani k id khosh va parentesh barabare in id hast ro hazf kon
  async removeCategory(req, res, next) {
    try {
      const { id } = req.params;
      const category = await this.checkExistCategory(id);
      const deleteResult = await CategoryModel.deleteMany({
        $or: [{ _id: category._id }, { parent: category._id }],
      });
      if (deleteResult.deletedCount == 0)
        throw createHttpError.InternalServerError("حذف دسته بندی انجاام نشد.");
      // 202 iani ba movafaghiat hazf shod  ========>  201 iani ba movafaghiat sakhte shod
      return res.status(202).json({
        data: {
          sttausCode: 202,
          message: "حذف دسته بندی با موفقیت حذف شد",
        },
        error: null,
      });
    } catch (error) {
      next(error);
    }
  }
  // step 85 :
  async updateCategoryTitle(req, res, next) {
    try {
      const { id } = req.params;
      const { title } = req.body;
      const category = await this.checkExistCategory(id);
      if (!category)
        throw createHttpError.InternalServerError("خطای داخل سرور");
      // on body k ersal mishe ro baiad validation kone
      await updateCategorySchema.validateAsync(req.body);
      const resultOfUpdate = await CategoryModel.updateOne(
        { _id: id },
        { $set: {title} } // agar $set : {in mohtviat baiad dar obj bashe } vagarna in error ro mide : Invalid atomic update value for $set. Expected an object, received string
      );
      //  agar update shode bashe => === nazar
      if (resultOfUpdate.modifiedCount == 0)
        throw createHttpError.InternalServerError(
          "بروز رسانی و آپدیت دسته بندی انجام نشد."
        );
      // 202 iani Accepted response
      return res.status(202).json({
        data: {
          statusCode: 200,
          message: "بروز رسانی با موفقیت انجام شد.",
        },
        error: null,
      });
    } catch (error) {
      next(error);
    }
  }
  // step 70:
  async getAllCategory(req, res, next) {
    try {
      // aggregate mire boro begard donbale ona k id daran va dakhele khodeshon y chizi daran b name parent k ba id barabare va natijaro dakhele children berize ye array mide
      // on akharesh ba $project migi kodoma ro az res hazf kone
      // startWith mige az kodom mikhay shoro koni
      // connectFromField mige az chi mikhay connect bzani
      // connectToField mige b chi mikhay connecte bzani iani b chi conectet berese
      // maxDepth ta chandta zir majmoie dashte bashe
      //  depthField ye adad bar asase hamon adade maxDepth mide b frontend k betone zir majmoie felan ro bgiere

      // const categories = await CategoryModel.aggregate([
      //   {
      //     $graphLookup: {
      //       from: "categories",
      //       startWith: "$_id",
      //       connectFromField: "_id",
      //       connectToField: "parent",
      //       maxDepth: 5,
      //       depthField: "depth",
      //       as: "children",
      //     },
      //   },
      //   {
      //     $project: {
      //       __v: 0,
      //       "children.__v": 0,
      //       "children.parent": 0,
      //     },
      //   },
      //   {
      //     $match: {
      //       parent: undefined,
      //     },
      //   },
      // ]);

      // __v : 0  iani ino b man neshon nade
      const categories = await CategoryModel.find(
        { parent: undefined },
        { __v: 0 }
      );

      return res.status(200).json({
        data: {
          statusCode: 200,
          categories,
        },
        error: null,
      });
    } catch (error) {
      next(error);
    }
  }

  // step 79:  $match iani boro begard to categori ha bebin kodom id k dare dar mongoose shon match mishe ba id k to path url hast
  async getCategoryById(req, res, next) {
    try {
      const { id } = req.params;
      const category = await CategoryModel.aggregate([
        {
          $match: { _id: new mongoose.Types.ObjectId(id) },
        },
        {
          $lookup: {
            from: "categories",
            localField: "_id",
            foreignField: "parent",
            as: "children",
          },
        },
        {
          $project: {
            __v: 0,
            "children.__v": 0,
            "children.parent": 0,
          },
        },
      ]);

      return res.status(200).json({
        data: {
          category,
        },
        error: null,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // step 66 :
  async getAllParentsCategory(req, res, next) {
    try {
      // baraie peida kardane onaie k parenteshon undefined hast => find baiad bashe chon yeki nist
      // __v : 0 iani dar object haie k darone array k ba find migire __v hazf kon
      const parents = await CategoryModel.find(
        { parent: undefined },
        { __v: 0 }
      );
      return res.status(200).json({
        data: {
          statusCode: 200,
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
      const children = await CategoryModel.find(
        { parent },
        { __v: 0, parent: 0 }
      );
      return res.status(200).json({
        data: {
          statusCode: 200,
          children,
        },
        error: null,
      });
    } catch (error) {
      next(error);
    }
  }

  // step 82 :
  async getAllCategoriesWithoutPopulate(req, res, next) {
    try {
      const categories = await CategoryModel.aggregate([
        { $match: {} }, // vaghti match khali bashe hamaro migire
      ]);
      return res.status(200).json({
        data: {
          statusCode: 200,
          categories,
        },
        error: null,
      });
    } catch (error) {
      next(error);
    }
  }

  // step 73 :
  async checkExistCategory(id) {
    const category = await CategoryModel.findById(id);
    // har ja k throw koni , edamash dge ejra namishe
    if (!category) throw createHttpError.NotFound("دسته بندی یافت نسد.");
    return category;
  }
}

module.exports = {
  CategoryController: new CategoryController(),
};
