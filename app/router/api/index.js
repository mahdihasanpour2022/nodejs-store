const homeController = require('../../http/controllers/api/home.controller');

// step 9 :
const router = require('express').Router();

router.post("/" , homeController.indexPage );

module.exports = {
  HomeRoutes : router
};
