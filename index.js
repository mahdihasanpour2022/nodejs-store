// step 4 : create script dev in packaje.json
const Application = require("./app/server");

// step 5 : create server instance hamishe 3000 bzar kolan to hame projeha
new Application( 3000,  "mongodb://127.0.0.1:27017/storeDB");