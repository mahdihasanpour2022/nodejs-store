const { ChapterController } = require("../../http/controllers/admin/chapter/chapter.controller");

const router = require("express").Router();

//step 178 :
router.put("/create-chapter", ChapterController.createChapter)

module.exports = {
    Chapter_AdminApiRoutes: router
}