// step 15 :
const { default: mongoose } = require("mongoose");

const Schema = new mongoose.Schema({
  first_name: { type: String },
  last_name: { type: String },
  user_name: { type: String },
  phone: { type: String },
  email: { type: String },
  password: { type: String },
  otp: {
    type: Object,
    default: {
      code: 0,
      expires: new Date().getDate() + 120000, // ms or 0
    },
  },
  bills: { type: [], default: [] },
  discount: { type: Number, default: 0 },
  birthDay: { type: String },
  Roles: { type: [String], default: ["USER"] },
});

//model name must be capital name
module.exports = {
  UserModel: mongoose.model("user", Schema),
};
