// step 125 : add controller for product
// tartibe sakht ine => schema model => controller => router
const { ProductModel } = require("../../../models/products");
const {
  createProductSchema,
} = require("../../validators/admin/product.schema");
const { deleteFileInPublic } = require("../../../utils/deleteFileInPublic");
const { path } = require("path");
const Controller = require("../controller");
const { listOfImagesFromReq } = require("../../../utils/listOfImagesFromReq");
const { ObjectValidator } = require("../../validators/public.validator");
const createHttpError = require("http-errors");

//  همه مواردیکه در مدل میسازی رو در روت پروداکت باید از فرانت بگیری که اینجا تو بادی باشه که بدی به پروداکت اسکیما که اعتبار سنجی کنه و تو بتونی با خیال راحت در دیتا بیس ذخیره کنی  و همچنینی در ریسپانس خودت بفرستی واسه بک اند

class ProductController extends Controller {
  async createProduct(req, res, next) {
    try {
      // console.log("req.file :",req.file); // یه عکس فرستاده باشه میره تو
      // console.log("req.files :",req.files); // چند تا عکس باشه تو بادی نمیره میره تو فایلز
      // return console.log("ProductController-->req.body :",req.body)
      const images = listOfImagesFromReq(
        req?.files || [],
        req?.body?.fileUploadPath
      );
      //  اعتبار سنجی موارد ارسال شده فرانت در بادی
      const productBody = await createProductSchema.validateAsync(req.body);

      const {
        title,
        text,
        short_text,
        category,
        tags,
        count,
        discount,
        price,
        width,
        height,
        length,
        weight,
      } = productBody;
      const supplier = req.user._id;

      // باید اگر فرانت نفریتاد مقدارشو براش دیفالت 0 بزاریم اما اگر نه مقدار داشت همون مقداررو در نظر بگیره
      // let features = {} , type = "physical" ; // اضافه کردن به یه آبجکت
      let features = {};
      let type = "physical"; // پیش فرض نوع محص.ل فیزیکی است اما اگر طول و عرض نده کاربر یعنی مجازی میزاریم
      if ( width || height || length || weight ) {
        // اگر یکی از این ویژگی ها رو وارد کرده باشه یعنی کالا فیزیکیه در غیر اینصورت مجازیه
        if (!width) features.width = 0
        else features.width = width;
        if (!height) features.height = 0;
        else features.height = height;
        if (!length) features.length = 0;
        else features.length = length;
        if (!weight) features.weight = 0;
        else features.weight = weight;
      } else {
        type = "virtual";
      }
      // حالا در دیتا بیس باید ذخیره بشه
      
      const product = await ProductModel.create({
        title,
        text,
        short_text,
        category,
        tags,
        count,
        discount,
        price,
        images,
        supplier,
        type,
        features
      });
      // console.log("product : ", product);
      // ارسال رسپانس به فرانت
      return res.status(201).json({
        statusCode: 201,
        isSuccess: true,
        message: "ثبت محصول با موفقیت انجام شد.",
        data: {
          product,
        },
        error: null,
      });
    } catch (error) {
      deleteFileInPublic(req.body.image); // in vase ine k agar b error khordim , to public image sakhte shode ro hazf kone
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

  // step: 136 :
  async getOneProduct(req, res, next) {
    try {
      const { id } = req.params;
      const product = await this.findProductByID(id);
      return res.status(200).json({
        statusCode: 200,
        isSuccess: true,
        data: {
          product,
        },
        error: null,
      });
    } catch (error) {
      next(error);
    }
  }

  //step 133 :
  async getAllProducts(req, res, next) {
    try {
      const products = await ProductModel.find({});
      res.status(200).json({
        statusCode: 200,
        isSuccess: true,
        message: "لیست محصولات با موفقیت  گرفته شد",
        data: {
          products,
        },
        error: null,
      });
    } catch (error) {
      next(error);
    }
  }

  //  step 137 :  common function for find product in db
  async findProductByID(productID) {
    // chon az in mikhaim dar baghie function haie bala k try catch daran estefade konim pas dge vasash try nemizarim chon try to try mishe
    const { id } = await ObjectValidator.validateAsync({ id: productID }); // chon ObjectValidator az noie async hast pas moghie call kardanesh migim await
    const product = await ProductModel.findById(id); // ID RO TO {} nade
    if (!product) throw createHttpError.NotFound("محصولی با این آیدی یافت نشد"); // har moghe dar db gashti peida nakard baiad not found bdi
    return product; // در غیر اینصورت پروداکتی که پیدا کردی رو ریترن کن
  }
}

module.exports = {
  ProductController: new ProductController(),
};
