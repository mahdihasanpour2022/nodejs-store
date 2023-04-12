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
      const image = req.body.image ;
      const blog = await BlogModel.create({ title, text, short_text, category, tags , image });

      // hala javab vase frontEND mifrestim
      return res.json({blog}); // agar to { } nabashe mige "message": "Cannot convert object to primitive value"
    } catch (error) {
      deleteFileInPublic(req.body.image) ; // in vase ine k agar b error khordim , to public image sakhte shode ro hazf kone
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
      return res.status(200).json({
        data: {
          statusCode: 200,
          blogs: [],
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
