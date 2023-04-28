const { EpisodeController } = require("../../http/controllers/admin/episode/episode.controller");
const router= require("express").Router();
const { uploadVideo } = require("../../utils/multer");

// step 205 : cerate Episode_AdminApiRoutes
// step 215 : ezafe kardane uploadVideo va chon ye done video hast baiad bgim single 
router.post("/create" ,uploadVideo.single("video") ,EpisodeController.createEpisode)

 // step 218 : dar hazfe chapter az patch estefade kard ama dar hazfe episode az delete cheraaaaa????
router.delete("/delete/:episodeID" , EpisodeController.deleteEpisode);

module.exports = {
    Episode_AdminApiRoutes : router
};
