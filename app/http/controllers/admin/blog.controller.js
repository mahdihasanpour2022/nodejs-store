// step 89 : create controller for blog

const Controller = require("../controller");

class BlogController extends Controller {

  async creaeteBlog(req, res, next) {
    try {

    } catch (error) {
      next(error);
    }
  };

  async getOneBlogById(req, res, next) {
    try {

    } catch (error) {
      next(error);
    }
  };
// step 90 :
  async getListOfBlogs(req, res, next) {
    try {
      return res.status(200).json({
        data : {
          statusCode :200 ,
          blogs : []
        },
        error : null
      })
    } catch (error) {
      next(error);
    }
  };

  async getCommentsOfBlogs(req, res, next) {
    try {

    } catch (error) {
      next(error);
    }
  };

  async deleteById(req, res, next) {
    try {

    } catch (error) {
      next(error);
    }
  };

  async updateBlogById(req, res, next) {
    try {

    } catch (error) {
      next(error);
    }
  };

  async creaeteBlog(req, res, next) {
    try {

    } catch (error) {
      next(error);
    }
  };

};

module.exports = {
  BlogController : new BlogController()
}
