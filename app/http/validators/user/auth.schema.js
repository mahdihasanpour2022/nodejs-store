//step 17 : @hapi/joi az schema estefade mikone vase validation
//name moteghaiiere ro pascal bnvis
const Joi = require("@hapi/joi");

// tartibe in methodaie tosh mesle string , ... ha mohemme
const authSchema = Joi.object({
  email :  Joi.string().lowercase().trim().email().required() ,
  password : Joi.string().min(6).max(16).trim().required()

})

module.exports = {
  authSchema
}