// step 6 :  create router
const router = require('express').Router();
const { HomeRoutes } = require('./api');

// step 10 : 
router.use("/" , HomeRoutes)

module.exports = {
  AllRoutes : router
}

