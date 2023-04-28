// tartibe sakht ine => schema model => controller => router
const { ProductModel } = require("../../../../models/products");
const {createProductSchema} = require("../../../validators/admin/product.schema");
const { deleteFileInPublic } = require("../../../../utils/deleteFileInPublic");
const { path } = require("path");
const Controller = require("../../controller");
const { listOfImagesFromReq } = require("../../../../utils/listOfImagesFromReq");
const { ObjectValidator } = require("../../../validators/public.validator");
const createHttpError = require("http-errors");
// step 142 : yarn add http-status-codes @types/http-status-codes // هر پکیجی نصب میکنی تایپشم نصب کن
// بجای اینکه هارد کد بنویسی تو ریسپانس که الان 200 یا 404 و ... هست میای و از این پکیج استفاده میکنی واضح تره
// تو این سایت در موردش بخون ==> https://www.npmjs.com/package/http-status-codes
// kafie ro StatusCodes dara functionet shoma F12 bezani hamie mavaredesho neshon dade 201 = CREATE - 200 = OK
const { StatusCodes } = require("http-status-codes");
const { copyObject } = require("../../../../utils/copyObject");
const { setFeatures } = require("../../../../utils/setFeatures");
const { deleteInvalidPropertyInObject } = require("../../../../utils/deleteInvalidPropertyInObject");
//  همه مواردیکه در مدل میسازی رو در روت پروداکت باید از فرانت بگیری که اینجا تو بادی باشه که بدی به پروداکت اسکیما که اعتبار سنجی کنه و تو بتونی با خیال راحت در دیتا بیس ذخیره کنی  و همچنینی در ریسپانس خودت بفرستی واسه بک اند
let ProductBlackList = {
  BOOKMARKS: "bookmarks",
  LIKES: "likes",
  DISLIKES: "dislikes",
  COMMENTS: "comments",
  SUPPLIER: "supplier",
  WEIGHT: "weight",
  WIDTH: "width",
  LENGTH: "length",
  HEIGHT: "height",
  COLORS: "colors",
};
// freeze kardane obj baese readOnly shodan va gheire ghabele taghier shodanesh mishe
Object.freeze(ProductBlackList); // برای اینکه مثل اینام درتایپ اسکریپت بتونیم غیر قابل تغییر کنیم مقادیر این آبجکت رو فریزش میکنیم چون تایپ اسکریپت نصب نکرده داره سعی میکنه که یه آبجکتی شبیه اینام تایپ اسکریپت در جاوا اسکریپت بسازه


class ProductController extends Controller {

  // step 125 :
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
        type
      } = productBody;
      const supplier = req.user._id;

      let features = setFeatures(productBody);
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
        features,
      });
      // console.log("product : ", product);
      // ارسال رسپانس به فرانت
      return res.status(StatusCodes.CREATED).json({
        statusCode: StatusCodes.CREATED,
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

  // step 146:
  async editProduct(req, res, next) {
    try {
      // step 147 :
      let data = copyObject(req.body); // حتی تو سندهای قبلی که ریکویست رو میگیری هم از این استفاده کن این استاد دیر گفت واسه قبلیا هم باید انجام میداد هر جایی ریکویست رو میگرفت
      // ادرس عکس های آپلود شده رو کامل میکنه
      data.images = listOfImagesFromReq(
        req?.files || [],
        req?.body?.fileUploadPath
      );
      data.features = setFeatures(req.body);

      // chon ghablan dar features set shodan dge niazi nist set beshan pas agar width dar req bod pak mishe chon ma gozashtimesh dar features
      let blackListFields= Object.values(ProductBlackList); // khorojie object.values hamishe ye array hast
      data =deleteInvalidPropertyInObject( data , blackListFields)
      // step 102 :  zakhirie blog dar db
      // chon faghat login shode ha haghe sakhte blog daran pas inja author ro khode backend id user mizare

      const { id } = req.params;
      const product = await this.findProductByID(id);
      const productEditResult = await ProductModel.updateOne(
        { _id: product._id },
        { $set: data }
      ); // $set iani in data ro jaigozin maghadire ghablie producti ba in id dar db kon

      if (productEditResult.modifiedCount == 0)
        throw createHttpError.InternalServerError("ویرایش محصول ناموفق بود.");
      return res.status(StatusCodes.OK).json({
        isSuccess: true,
        statusCode: StatusCodes.OK,
        message: "ویرایش محصول با موفقیت انجام شد.",
        data: {
          data
        },
        error: null,
      });
    } catch (error) {
      // console.log(error); // هر موقع که ارور داشتی در کچ لاگ بگیر از ارورت با جزییات ارورتو ببینی بتونی رفعش کنی
      next(error);
    }
  }

  // step 139 :
  async deleteProduct(req, res, next) {
    try {
      const { id } = req.params;
      const product = await this.findProductByID(id);
      // بعد از پیدا کردن این پروداکت باید از دیتا بیس حذف کنیم
      const removeProductResult = await ProductModel.deleteOne({_id: product._id}); // hatman await bzar kolan vase kar kardan ba db
      if (removeProductResult.deletedCount == 0) throw createHttpError.InternalServerError("حذف محصول نا موفق انجام شد");

      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        isSuccess: true,
        message: "حذف محصول با موفقیت انجام شد.",
        data: {},
        error: null,
      });
    } catch (error) {
      next(error);
    }
  }

  // step 136 :
  async getOneProduct(req, res, next) {
    try {
      const { id } = req.params;
      const product = await this.findProductByID(id);
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
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
      // step 144 : mitone find({}) khali base ama behtare alan bar asase text search kone
      const search = req.query.search || ""; // همیشه وقتی داری دیتایی رو بعنوان مقدار میدی فکر اینم بکن که اگه نال بود چه کنه یه چیزی مثل استرینگ خالی برگردونه
      let products; // let bezar k betoni behesh meghdare pishfarz nadi
      if (!!search) {
        products = await ProductModel.find({
          $text: {
            $search: search,
          },
        });
        // agar kalamie search kard va producti ba on moshakhasat nabod khob in array products khali ersal mishe
      } else {
        // agar karbar kalamie search nakarde bod hamaro bargardone
        products = await ProductModel.find({});
      }
      // برای سرچ باید یکی از کلمه ها کامل تایپ بشه
      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        isSuccess: true,
        message: "لیست محصولات با موفقیت  گرفته شد",
        result_length: products.length,
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
