// step 4 : create script dev in packaje.json
const Application = require("./app/server");

// step 5 : create server instance hamishe 3000 bzar kolan to hame projeha
// --------------> local
// new Application( 3000,  "mongodb://localhost:27017/storeDB");
// new Application( 3000,  "mongodb://127.0.0.1:27017/storeDB");
new Application( process.env.APPLICATION_PORT ,  "mongodb://127.0.0.1:27017/storeDB");
// step 185 :
// --------------> liara1
// new Application( 3000, process.env.MONGODB_PRIVATE_DATABASE_URL );
// new Application( process.env.APPLICATION_PORT , process.env.MONGODB_PRIVATE_DATABASE_URL );


