// step 89 : create controller for blog
const path = require("path");
const { createBlogSchema } = require("../../../validators/admin/blog.schema");
const Controller = require("../../controller");
const { deleteFileInPublic } = require("../../../../utils/deleteFileInPublic");
const { BlogModel } = require("../../../../models/blogs");
const createHttpError = require("http-errors");
const { StatusCodes } = require("http-status-codes");

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
      return res.status(StatusCodes.CREATED).json({
        statusCode: StatusCodes.CREATED,
        isSuccess: true,
        message: "بلاگ با موفقیت ایجاد شد.",
        data: {
          blog,
        },
        error: null,
      }); // agar to { } nabashe mige "message": "Cannot convert object to primitive value"
    } catch (error) {
      deleteFileInPublic(req.body.image); // in vase ine k agar b error khordim , to public image sakhte shode ro hazf kone
      next(error);
    }
  }

  // step 107 :
  async getOneBlogById(req, res, next) {
    try {
      const { id } = req.params; // chon id ro dar path url dadim baiad ba req.params bgirim na req.body
      const blog = await this.findBlog(id); // dge inja hatman javab dare chon findBlog agar peida nakarde bod return mikard pas nemikhad if(!blog) ro anjam bdi
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        isSuccess: true,
        message: "بلاگ با موفقیت یافت شد.",
        data: {
          blog,
        },
        error: null,
      });
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
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
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

  // step 110 :
  async deleteBlogById(req, res, next) {
    try {
      const { id } = req.params;
      // way 1 : faghat mizarimesh k check kone agar nabod error bede to const nemirizim
      // await this.findBlog(id);
      // const result = await BlogModel.deleteOne({_id : id});
      // way 2 :
      const blog = await this.findBlog(id);
      const result = await BlogModel.deleteOne({ _id: blog._id });
      if (result.deletedCount == 0)
        throw createHttpError.InternalServerError("حذف بلاگ نا موفق است");
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        isSuccess: true,
        message: "بلاگ با موفقیت حذف شد",
        data: {},
        error: null,
      });
    } catch (error) {
      next(error);
    }
  }
  //step 113 :
  async updateBlogById(req, res, next) {
    try {
      const { id } = req.params;
      await this.findBlog(id); // k age dar db nabod error bede
      // schema k sakhti nemikhad body ro validate kone chon require nistan
      // const blogDateBody = await createBlogSchema.validateAsync(req.body);

      //masiri k dar multer be req.body ezafe kardim b name fileUploadPath ro ba name image upload shode karbar ezafe mikonim
      // replace baese hazfe // az adres mishe ye bar log bgir bdone replace va image ro bbin
      // req.body.image = req.body.image.replace(/\\/g,"/")
      if (req?.body?.fileUploadPath && req?.body?.filename) {
        req.body.image = path
          .join(req.body.fileUploadPath, req.body.filename)
          .replace(/\\/g, "/");
      }
      const data = req.body; // chon require nistan parameter haie update momkene khali biad k delete mikonimesh k responsemon shologh nashe
      // hala k ba createBlogSchema nemitonim validate konim khodemon validate mikonim inja
      let nullishData = ["", " ", 0, "0", null, undefined];
      // const auther = req.user._id;  // ino nazar chon dge author ya nevisandie blog ro avaz nemikonim
      // b manzore ijade masire kamel
      let blackListFields = [
        "likes",
        "dislikes",
        "bookmarks",
        "comments",
        "author",
      ]; // ma nabaiad bezarrim az front end masalan bookmarko ersal bshe
      Object.keys(data).forEach((key) => {
        // validation black list ma k age
        if (blackListFields.includes(key)) delete data[key];
        // validation string
        if (typeof data[key] == "string") data[key] = data[key].trim(); // faselehasho hazf mikonim va dobare to khodesh zakhirash mikonim
        // validation array
        if (Array.isArray(data[key]) && data[key].length > 0)
          data[key] = data[key].map((item) => item.trim()); // age array bod itemhasho trim kone k fasele aval akharesh hazf bshe
        if (nullishData.includes(data[key])) delete data[key];
      });
      console.log("data:", data);
      // step 102 :  zakhirie blog dar db
      // chon faghat login shode ha haghe sakhte blog daran pas inja author ro khode backend id user mizare
      // console.log("req.user:",req.user);
      const updateBlogResult = await BlogModel.updateOne(
        { _id: id },
        { $set: data }
      ); // $set iani in data ro bezar jaie ghabli update bshe
      // hala javab vase frontEND mifrestim
      if (!updateBlogResult.modifiedCount)
        throw createHttpError.InternalServerError("آپدیت بلاگ نامو فق بود");
      // agar update dorost ejra bshe modifiedCount bozorgtar az 0 mishe masaln 1
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        isSuccess: true,
        data: {
          message: "بلاگ با موفقیت اصلاح شد.",
        },
        error: null,
      }); // agar to { } nabashe mige "message": "Cannot convert object to primitive value"
    } catch (error) {
      deleteFileInPublic(req?.body?.image); // in vase ine k agar b error khordim , to public image sakhte shode ro hazf kone
      next(error);
    }
  }

  // step 106 :
  async findBlog(id) {
    // list path haie k hast ro log migirim aval bebinim chi dare
    // const paths = await BlogModel.findOne(query).getPopulatedPaths();
    // console.log(paths)
    const blog = await BlogModel.findById(id).populate([
      { path: "category", select: { title: 1 } }, // select iani inaro to res neshon nade
      {
        path: "user",
        select: ["mobile", "first_name", "last_name", "user_name"],
      },
    ]); // populate ye query dare b name path k bahesh peida kone
    if (!blog) throw createHttpError.NotExtended("بلاگ یافته نشد.");
    delete blog.category.children; // hazfe children az to category k dar blog hast
    return blog; // agar bod pas return konash
  }
}

module.exports = {
  AdminBlogController: new BlogController(),
};
