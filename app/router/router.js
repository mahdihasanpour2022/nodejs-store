// step 6 :  create router
const router = require("express").Router();
const { HomeRoutes } = require("./api/index");
const { UserAuthRoutes } = require("./user/auth");
const { DeveloperRoutes } = require("./developer.routes");
const { adminRoutes } = require("./admin/admin.routes");
const { verifyAccessToken, checkRole } = require("../http/middlewares/verifyAccessToken");

// const redisClient = require("../utils/init_redis");
//step 49 : faghat vase inke test konim bebinim b redis motasel mishe ya na
// (async() => {
//   await redisClient.set("key", "value");
//   const value =await redisClient.get("key");
//   console.log(value);
// })();

// step 50 :  baraie inke refresh token va access token ro dar redis btoni zakhire koni in karha lazame tracke 257 / 258 ro bebin
// install docker
// in this site update wsl ==> https://learn.microsoft.com/en-us/windows/wsl/install-manual#step-4---download-the-linux-kernel-update-package  and restart sysytem
// open cmd for show version write = docker --version
// write docker images => namieshe image haie gerefte shode
// in site https://hub.docker.com/search => list hamie framework ya librarihaie k docker azashon poshtibani mikone mesle redis
// dar microsoft store narmafzare windows terminal ro nasb konid => dar in terminal mitond powershell / cmd / ubuntu ro add konid
// for install redis in docker => docker pull redis
// vaghti redis ro dar docker nasb mikoni miad ye container azash misaze k connecte ba redis k ma behesh migim image redis k in container isole hast

// docker run -d -p 6363:6379 --name redis1 redis=> baese sakhte ye container mishe

// redis1 name delkhahe to hast
// dar dastore bala =>  -p 6363:6379 iani bjaie inke redis b komake ubuntu ro port 6337 ba biad ro port 6363 biad
// dar dastore bala =>  -d  iani agar -d nazani iani attach beshe b in safhe agar in terminal baste shod container run shode ham baste mishe

// write docker ps  => namieshe container haie dar hale ejra
// write docker ps -a => namieshe containerhaie ijad shode

// download another-redis-desktop-manager  =>  new connection  => host : localhost  &  port : 6363 va roie connection ijad shode click kon

// docker run -d -p 6379:6379 --name redis2 redis=> baese sakhte ye container mishe
// in windows terminal write (dar khate badi behet ye # mide ta betoni be in shell redis k sakhti dastresi peyda koni) => docker exec -it redis1 sh
// hala dar hamin windows terminal benevisi => redis-cli
// (nokte: agar beheton ejaze nade zamane nasbe docker wsl ro nasb konid dar control panel varede program and feautures beshin va samte chap gozinie turn window feautures on or off ro bzan va scroll kon paien va window subsystem for linux ro faak kon va tikesho bzan restart kon systemo va docker ro run kon va wsl ro nasb kon )

//step 20:
router.use("/user", UserAuthRoutes);

// step 55 :
router.use("/developer", DeveloperRoutes);

//// step 63 : hala agara dar swagger por koni mavaredesho dar mongodb compass mishine
// aval check mikonim bebinim accesstoken dare ya na bad rolesho check mikonim k masalan agar user bod b in ghesmate admin dastresi nadashte bashe 
router.use("/admin",verifyAccessToken ,checkRole("ADMIN"),adminRoutes);

// step 10 :
router.use("/", HomeRoutes);

module.exports = {
  AllRoutes: router,
};
