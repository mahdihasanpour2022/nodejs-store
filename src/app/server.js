// step 1 : yarn add express mongoose bcrypt nodemon auto-bind@4 dotenv app-module-path
// step 2 : ceate folder structure

// step 3 : create application
const express = require("express");
const path = require("path");
const http = require("http");
const { default: mongoose } = require("mongoose");

module.exports =  class Application {
  #app = express();
  #PORT;
  #DB_URL;
  constructor(PORT, DB_URL) {
    //tartibeshon mohemme
    this.#PORT = PORT;
    this.#DB_URL = DB_URL;
    this.configApplication();
    this.connectTOMongoDB();
    this.createServer();
    this.createRoutes();
    this.errorHandling();
  }
  configApplication() {
    //in vase ine k betonim az samte client json  ersal konim
    this.#app.use(express.json());
    //betonim ba estefade az www/form url betonim form ersal konim
    this.#app.use(express.urlencoded({ extended: true }));
    //__dirname in poshie k server toshe ro barmigardone ma migim na boro aghab az on poshe public hesab kon
    this.#app.use(express.static(path.join(__dirname, "..", "public")));
  }
  createServer() {
    http.createServer(this.#app).listen(this.#PORT, () => {
      console.log("runed > http://localhost:" + this.#PORT);
    });
  }
  connectTOMongoDB() {
    mongoose.connect(this.#DB_URL, (error) => {
      if (!error) return console.log("connect to mongoDB");
      return console.log("failed connect to mongoDB");
    });
  }
  createRoutes() {}
  errorHandling() {
    this.#app.use((req, res, next) => {
      return res.status(404).json({
        statusCode: 404,
        message: "ادرس یافت نشد",
      });
    });
    this.#app.use((error, req, res, next) => {
      const statusCode = error.status || 500;
      const message = error.message || "internal server error darim";
      return res.status(statusCode).json({
        statusCode,
        message,
      });
    });
  }
}
