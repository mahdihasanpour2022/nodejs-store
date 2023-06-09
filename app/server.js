// step 1 : yarn add express mongoose bcrypt nodemon auto-bind@4 dotenv app-module-path http-errors morgan
// step 2 : ceate folder structure

// step 3 : create application
const express = require("express");
const createHttpError = require("http-errors");
const morgan = require("morgan");
const path = require("path");
const { AllRoutes } = require("./router/router");
//step 21: yarn add swagger-ui-express swagger-jsdoc
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUIExp = require("swagger-ui-express");
// step 216 :
// vaghti dar .env motaghaier tarif mikoni baraie inke dar har jaie proje ghabele shanasaie bashe configesh ro inja dar server gharar midi
require("dotenv").config();

// step 40 : cors error handling  => yarn add cors
const Cors = require("cors");

module.exports = class Application {
  #app = express();
  #PORT;
  #DB_URI;

  constructor(PORT, DB_URI) {
    //tartibeshon mohemme
    this.#PORT = PORT;
    this.#DB_URI = DB_URI;
    this.configApplication();
    this.initRedis();
    this.connectTOMongoDB();
    this.createServer();
    this.createRoutes();
    this.errorHandling();
  }

  configApplication() {
    //step 41 : use Cors in ##app to use in every where
    this.#app.use(Cors());
    // yarn add morgan =>  morgan log mindaze dar terminale node mige vase felan route req omade -->
    // vorodish halate prod  ya dev hast va mishe vasash event nevesht mesle khate 52
    this.#app.use(morgan("dev"));
    //in vase ine k betonim az samte client json  ersal konim
    this.#app.use(express.json());
    //betonim ba estefade az www/form url betonim form ersal konim
    this.#app.use(express.urlencoded({ extended: true }));
    //__dirname in poshie k server toshe ro barmigardone ma migim na boro aghab az on poshe public hesab kon
    this.#app.use(express.static(path.join(__dirname, "..", "public")));
    //step 22 : sakhte swagger be addresse baseurl/api-doc
    this.#app.use("/api",
      swaggerUIExp.serve,
      swaggerUIExp.setup(
        swaggerJSDoc({
          swaggerDefinition: {
            openapi : "3.0.0",// step 116 :
            info: {
              title: "node.js",
              version: "6.2.8",
              description: "adminpanel / productStore / blogs / courseSite / authentication",
              contact: {
                name: "mahdi_hasanpour",
                url: "https://mahdihasanpour.ir",
                email: "mahdihasanpour2022@gmail.com",
              },
            },
            servers: [
              {
                // step 184 : deply on liara
                // =========> local
                url: "http://localhost:3000/",
                // =========> liara
                // url: "https://nodejs-store.iran.liara.run/",
                // url: "https://mahdihasanpour.ir",
              },
            ],
            components : { //step 120 : ezafe kardane dokmie authorizations dar balaie swagger baraie accesstoken  
                securitySchemes :{
                  BearerAuth : {
                    type : "http",
                    scheme : "bearer",
                    bearerFormat : "JWT",
                  }
                }
            },
            security : [{BearerAuth : [] }]
          },
          apis: ["./app/router/**/*.js"],// step 117 : برو تو پوشه روتر و هر فایلی که با فرمت جی اس دارای سواگر بود به ما نشون بده در 
        }),
        {explorer : true}
      )
    );
  }
  
  createServer() {
    const http = require("http");
    http.createServer(this.#app).listen(this.#PORT, () => {
      console.log(
        // "server runed successfully =>  http://mahdihasanpour.ir" //  liara
        "server runed successfully" , // local
      );
    });
  }

  connectTOMongoDB() {
    const mongoose = require("mongoose");
    mongoose.set("strictQuery", true);
    mongoose.connect(this.#DB_URI);
    // mongoose.connect(this.#DB_URI , {authSource : "admin"});
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
    process.on("SIGNINT", async () => {
      await mongoose.connection.close();
      console.log("morgan dar terminale node mige => connection baste shod");
      process.exit(0);
    });
  }
  
  // step 48 :
  initRedis() {
    require("./utils/init_redis");
  }

  createRoutes() {
    this.#app.use(AllRoutes);
  }

  errorHandling() {
    this.#app.use((req, res, next) => {
      // way 1 : with http-errors => packaje hhtp-errors errorha ro dar ghalebe namieshie standard neshon mide
      next(createHttpError.NotFound("آدرس مورد نظر یافت نشد."));
      // way 2 :normal way
      // return res.status(404).json({
      //   statusCode: 404
      // });
    });
    this.#app.use((error, req, res, next) => {
      //createHttpError craete server error code and message
      const serverError = createHttpError.InternalServerError();
      const statusCode = error.status || serverError.status;
      const message = error.message || serverError.message;
      return res.status(statusCode).json({
        // way 1 : with http-errors
        errors: {
          statusCode,
          message,
        },

        // way 2 : normal way
        // statusCode,
        // message,
      });
    });
  }

};