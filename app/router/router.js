// step 6 :  create router
const router = require('express').Router();
const {HomeRoutes} = require('./api/index');
const { UserAuthRoutes } = require('./user/auth');

//step 20:
router.use("/user" , UserAuthRoutes )
// step 10 : 
router.use("/" , HomeRoutes)

module.exports = {
  AllRoutes : router
}

