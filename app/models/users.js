// step 15 :
const { default: mongoose } = require("mongoose");

const Schema = new mongoose.Schema({
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
  Roles: { type: [String], default: ["USER"] },
},{
  timestamps : true , 
  toJSON : {
    virtuals : true
  }
});

//model name must be capital name
module.exports = {
  UserModel: mongoose.model("user", Schema),
};
