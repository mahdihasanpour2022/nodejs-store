// step 13 :
const { default: mongoose } = require("mongoose");
const { CommentSchema } = require("./public.schema");
// یه چیزایی مثل وزن و طول  و ارتفاع رو فرانت داره میده که ما در سند پروداکت اسکیما داریم اعتبار سنجیش میکنیم اما اینجا نیست
const ProductSchema = new mongoose.Schema({
  title: { type: String, require: true },
  text: { type: String, require: true },
  short_text: { type: String, require: true },
  images: { type: [String], require: true },
  tags: { type: [String], default: [] },
  category: { type: mongoose.Types.ObjectId,ref : "category" , require: true },
  comments: { type: [CommentSchema], default: []  },
  likes: { type: [mongoose.Types.ObjectId], default: []  },
  dislikes: { type: [mongoose.Types.ObjectId], default: []  },
  bookmarks: { type: [mongoose.Types.ObjectId], default: [] },
  price: { type: Number, default: 0  },
  discount: { type: Number, default: 0 },
  count: { type: Number },
  type: { type: String, require: true }, // vrtual - phisical product
  format: { type: String },
  supplier: { type: mongoose.Types.ObjectId, require: true },
  features: {type: Object, default: {
      madeIn: "",
      width: "",
      height: "",
      length: "",
      weigth: "",
      colors: [],
      model: []
    },
  },
} , {toJSON : {virtuals : true}});// step 229 :روی هر اسکیمایی خواستین ویرچوال بزنید باید در جی سلانش ویرچوال رو فعال کنید.

// step 143 : 
// ایندکس گذاری باعث سریعتر پیدا شدن مورد جستجو شده میشود چون پارامتر های کمتری دارد
// برای گرفتن همه محصولات اگر متنی سرچ کرد ما در تایتل و تکست و خلاصه تسکت میگردیم اگر بود برمیگردونیم اگر نه همه رو بر میگردونیم
// in iani boro to title va bar assase "text" jostejo konesh
ProductSchema.index({
  title: "text",
  text: "text",
  short_text: "text",
})


// step 230 : hala virtual mizanim
// ye imageURL dar har course bzar va boro to .env va in 2 ta motaghaiere ro ezafe mikonim b ebtedaie image k dar har course hast
ProductSchema.virtual("imagesURL").get(function(){
  // this eshare b hamin product schema dare
  // miaim ro hamie images k array hast map mizanim va b ebtedaie har image dar array images  BASE_URL va port ro ezafe kon
  //vase  liara1 taghieresh bede
  return this.images.map(image => `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${image}` )
  
});

//model name must be capital name
module.exports = {
  ProductModel: mongoose.model("product", ProductSchema),
};
