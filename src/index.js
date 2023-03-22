// step 4 : create script dev in packaje.json
// step 5 : create server instance
const Application = require("../src/app/server");
new Application(3000 , "mongodb://localhost:27017/nodejs-store" )