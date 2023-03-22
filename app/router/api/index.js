// step 9 :
const router = require('express').Router();
const homeController = require('../../http/controllers/api/home.controller');

router.post("/" , homeController.indexPage );

//name router pascal bashe
module.exports = {
  HomeRoutes : router
};
