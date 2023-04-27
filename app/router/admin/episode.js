const { EpisodeController } = require("../../http/controllers/admin/episode/episode.controller");
const router= require("express").Router();

// step 205 : cerate Episode_AdminApiRoutes
router.post("/create" , EpisodeController.createEpisode)

module.exports = {
    Episode_AdminApiRoutes : router
};
