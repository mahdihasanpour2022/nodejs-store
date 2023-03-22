// step 1 : yarn add express mongoose bcrypt nodemon auto-bind@4 dotenv app-module-path
// step 2 : ceate folder structure

// step 3 : create application
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const { AllRoutes } = require("./router/router");

module.exports = class Application {
  #app = express();
  #PORT;
  #DB_URI;
  constructor(PORT, DB_URI) {
    //tartibeshon mohemme
    this.#PORT = PORT;
    this.#DB_URI = DB_URI;
    this.configApplication();
    this.connectTOMongoDB();
    this.createServer();
    this.createRoutes();
    this.errorHandling();
  }
  configApplication() {
    //  morgan log mindaze dar terminale node mige vase felan route req omade -->
    // vorodish halate prod  ya dev hast va mishe vasash event nevesht mesle khate 52
    this.#app.use(morgan("dev"));
    //in vase ine k betonim az samte client json  ersal konim
    this.#app.use(express.json());
    //betonim ba estefade az www/form url betonim form ersal konim
    this.#app.use(express.urlencoded({ extended: true }));
    //__dirname in poshie k server toshe ro barmigardone ma migim na boro aghab az on poshe public hesab kon
    this.#app.use(express.static(path.join(__dirname, "..", "public")));
  }
  createServer() {
    const http = require("http");
    http.createServer(this.#app).listen(this.#PORT, () => {
      console.log(
        "server runed at http://localhost:" + this.#PORT + " (successfully)"
      );
    });
  }
  connectTOMongoDB(DB_URI) {
    const mongoose = require("mongoose");
    mongoose.set("strictQuery", true);
    mongoose.connect(this.#DB_URI);
    console.log("connect to mongoDB (successfully)");
    // mongoose.connect(this.#DB_URI, (error) => {
    //   if (!error) return console.log("connect to mongoDB");
    //   return console.log(error.message);
    // });
    //morgan event on mongoose
    mongoose.connection.on("connected", () => {
      console.log("morgan dar terminale node mige => mongoose connected to DB");
    });
    mongoose.connection.on("disconnected", () => {
      console.log("morgan dar terminale node mige => mongoose is disconnected");
    });
    //morgan agar shoma dar terminal ctrl+c bzanid connection ro mibande k amniate site hefz bshe
    process.on("SIGNINT", async ()=>{
      await mongoose.connection.close();
      console.log("morgan dar terminale node mige => connection baste shod");
      process.exit(0);
    })
  }
  createRoutes() {
    this.#app.use(AllRoutes);
  }
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
};
