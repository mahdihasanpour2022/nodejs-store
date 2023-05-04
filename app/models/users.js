// step 15 :
const { default: mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema({
  first_name: { type: String },
  last_name: { type: String },
  user_name: { type: String , lowerCase : true },
  mobile: { type: String , require : true },
  email: { type: String  , lowerCase : true },
  password: { type: String },
  otp: {
    type: Object,
    default: {
      code: 0,
      expiresIn: 0 , //  or new Date().getTime() + 120000
    },
  },
  bills: { type: [], default: [] },
  discount: { type: Number, default: 0 },
  birthDay: { type: String },
  Role: { type: String, default: "USER" }, // اینجا برای همه رول پیش فرض یوزر رو ست کردیم
  courses : {type :  [mongoose.Types.ObjectId] ,ref :"course" , default : []}, // وقتی بخوای لیست شاگرد های دوره رو بگیری
},{
  timestamps : true , 
  toJSON : {
    virtuals : true
  }
});

// step 250 :  ایندکس گذاری میکنیم برای جستجوی راحت تر ک هفقط بره تو این موارد موجود در مدل رو بگرده
// هر وقت در گرفتن لیست تمام کاربران یا محصولات یا هر چیزی خواستی بر اسا کلمه ای که فرانت در کوئری میفرسته سرچ کنی پس 
UserSchema.index({first_name:"text",last_name:"text",user_name:"text",mobile:"text", email : "text"});// be line 13 sanade usercontroller negah kon onja ham ba "$text" dare dar db search mikone pas ma inja migim vaghti front kalamie ro dar query ferestad to bar asase in index ha boro dar db begard faghat


//model name must be capital name
module.exports = {
  UserModel: mongoose.model("user", UserSchema),
};
