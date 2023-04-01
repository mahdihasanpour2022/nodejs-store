// step 48 : yarn add redis
const redisDB = require("redis");
const redisClient = redisDB.createClient();

redisClient.connect();
redisClient.on('connect' , ()=>  console.log('connect to redis'));
redisClient.on('ready' , ()=>  console.log('connected to redis and ready to use ... '));
redisClient.on('error' , (err)=>  console.log(err.message));
redisClient.on('end' , ()=>  console.log('disconnected from redis ... '));

// step 47 : nasbe ubuntu
// in this site ==> https://developer.redis.com/create/windows  ==> redis on window 
// write in powershell  ==>  Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
// write in ubuntu ==> step 3 / 4 / 5
//  hala har dafe baz kardi khasti kar koni redis-cli (agar nashod aval benvis  redis-server bad  redis-cli)



module.exports = redisClient ;