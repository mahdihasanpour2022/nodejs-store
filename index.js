// step 4 : create script dev in packaje.json
const Application = require("./app/server");

// step 5 : create server instance
new Application(5000,  "mongodb://localhost:27017/storeDB");