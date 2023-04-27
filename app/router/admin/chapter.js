const { ChapterController } = require("../../http/controllers/admin/chapter/chapter.controller");

const router = require("express").Router();

//step 178 :
router.put("/create-chapter", ChapterController.createChapter)

// step 190 : chon dare dar course ezafe mishe b jaie get baiad put dar nazar begirim
router.get("/all/:courseID" , ChapterController.getAllChaptersOfCourse);

// step 195 : doroste dare hazf mishe ama chon dar course hast pas dare course taghiere peyda mikone pas patch hast
router.patch("/delete/:chapterID" , ChapterController.deleteOneChapterById)

module.exports = {
    Chapter_AdminApiRoutes: router
}