const router = require("express").Router();
const bcrypt = require("bcrypt");
const { randomNumberGenerator } = require("../utils/randomNumberGenerator");

// step 54 :

/**
 * @swagger
 * tags:
 *  name: Developer-Routes
 *  description : dveloper Utils 
 */

/**
 * @swagger
 * tag: Developer-Routes
 * /developer/password-hash/{password}:
 *  get:
 *      summary: hash data with bcrypt
 *      tags: [Developer-Routes]
 *      parameters:
 *          -   in: path
 *              name: password
 *              type: string
 *              required: true
 *              default : Bearer 
 *      responses:
 *          200:
 *              description: success
 */

// step 53 :

router.get("/password-hash/:password", (req, res, next) => {
  const { password } = req.params;
  const salt = bcrypt.genSaltSync(10);
  return res.send(bcrypt.hashSync(password, salt));
});

// step 56 :

/**
 * @swagger
 *  /developer/random-number:
 *      get:
 *          tags: [Developer-Routes]
 *          summary: get random number
 *          responses:
 *              200:
 *                  description: success
 */

// step 55 :

router.get("/random-number", (req, res, next) => {
  return res.send(randomNumberGenerator().toString());
});

module.exports = {
  DeveloperRoutes: router,
};
