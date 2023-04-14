// step 125 : add controller for product
// tartibe sakht ine => schema model => controller => router
const Controller = require("../controller");

class ProductController extends Controller {
  createProduct(req, res, next) {
    try {
      return res.json(req.body);
    } catch (error) {
      next(error);
    }
  }

  editProduct(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  deleteProduct(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  getOneProduct(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  getAllProducts(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}
module.exports = {
  ProductController: new ProductController(),
};
