// step 89 : create controller for blog
const path = require("path");
const { createBlogSchema } = require("../../validators/admin/blog.schema");
const Controller = require("../controller");
const { deleteFileInPublic } = require("../../../utils/deleteFileInPublic");
const { BlogModel } = require("../../../models/blogs");
class BlogController extends Controller {
  // step 101 :
  async createBlog(req, res, next) {
    try {
      // be schema k sakhti migi biad body k to req hast ro async validate kone pas
      const blogDateBody = await createBlogSchema.validateAsync(req.body);
      // b manzore ijade masire kamel
      //masiri k dar multer be req.body ezafe kardim b name fileUploadPath ro ba name image upload shode karbar ezafe mikonim
      // replace baese hazfe // az adres mishe ye bar log bgir bdone replace va image ro bbin
      req.body.image = path
        .join(blogDateBody.fileUploadPath, blogDateBody.filename)
        .replace(/\\/g, "/");
      // req.body.image = req.body.image.replace(/\\/g,"/")

      // step 102 :  zakhirie blog dar db
      const { title, text, short_text, category, tags } = blogDateBody; // b joz image k az haminja migirim chon taghier jarde
      const image = req.body.image;
      // chon faghat login shode ha haghe sakhte blog daran pas inja author ro khode backend id user mizare
      // console.log("req.user:",req.user);
      const auther = req.user._id;
      const blog = await BlogModel.create({
        title,
        text,
        short_text,
        category,
        tags,
        image,
        auther,
      });

      // hala javab vase frontEND mifrestim
      return res.status(201).json({
        statusCode: 201,
        isSuccess: true,
        data: {
          message: "بلاگ با موفقیت ایجاد شد.",
          blog,
        },
        error: null,
      }); // agar to { } nabashe mige "message": "Cannot convert object to primitive value"
    } catch (error) {
      deleteFileInPublic(req.body.image); // in vase ine k agar b error khordim , to public image sakhte shode ro hazf kone
      next(error);
    }
  }

  async getOneBlogById(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  // step 90 :
  async getListOfBlogs(req, res, next) {
    try {
      // baiad berim az to db begardim va peida konim chon hamaro mikhaim aggregate mikonim array bede har kodom match shod ba in $match ma
      const blogs = await BlogModel.aggregate([
        { $match: {} },
        // in lookup va unwind vase users chon dar from neveshtim users
        {
          $lookup: {
            from: "users",
            foreignField: "author", // behtare b jaie "author" bashe "_id"
            localField: "author", // iani bebin to blogs haie k to db hast author (k id sho neshon mide) kodomashon ba _id user haie k dar users dar db hast yekie ba onvane as author ezafe kon b property author dakhele blog
            as: "author",
          },
        },
        {
          $unwind: "$author", // baes mishe k property author dar blog responsemonno b sorate obj iani {} namaiesh bede na array iani []
        },
        // in lookup va unwind vase categorie
        {
          $lookup: {
            from: "categories",
            foreignField: "_id", // iani dar db ghesmate categories bebin id kodom category ba id ba _id category k in ja dar blogs hast yekie begireshon biareshon bzar b onvane as inja
            localField: "category", 
            as: "category", 
          },
        },
        {
          $unwind: "$category", // baes mishe k property category dar blog responsemonno b sorate obj iani {} namaiesh bede na array iani []
        },
        {
          //way 1 (behtare) :  inja har chi benevisi dar responsemon dar property author namaieshes nemide
          $project: {
            "author.Roles": 0,
            "author.otp": 0,
            "author.bills": 0,
            "author.discount": 0,
            "author.__v": 0,
            "category.__v": 0, // iani to category ham agar __v bod , neshon nade
          },
        },
        //way 2 :  inja har chi benevisi dar responsemon dar property author faghat ina ro neshon mide chon 1 hastan
        // {
        // agar masalan first name ya last name ro neshon nadad iani front end az karbar nagerefte chon require nabode
        // nemishe yeki 0 bashe yeki 1 (ya hame 0 haro az way bala bezar k nabinishon ya hame onaie k faghat mikhay bebini ro 1 bezar)
        // $project: {
        //   "author._id": 1,
        //   "author.mobile": 1,
        //   "author.first_name": 1,
        //   "author.last_name": 1,
        //   "author.user_name": 1,
        // },
        // },
      ]);
      return res.status(200).json({
        statusCode: 200,
        isSuccess: true,
        data: {
          blogs,
        },
        error: null,
      });
    } catch (error) {
      next(error);
    }
  }

  async getCommentsOfBlogs(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  async deleteById(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  async updateBlogById(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  async creaeteBlog(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  AdminBlogController: new BlogController(),
};
