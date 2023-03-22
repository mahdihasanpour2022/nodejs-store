const { UserAuthController } = require('../../http/controllers/user/auth/authController');

// step 19 : 
const router = require('express').Router();

router.post("/login" , UserAuthController.login );

//name router pascal bashe
module.exports = {
  UserAuthRoutes : router
};
