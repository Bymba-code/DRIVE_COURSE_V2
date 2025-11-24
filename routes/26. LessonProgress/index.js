const express = require("express")
const authMiddleware = require("../../Middlewares/authCookie")
const INSERT_LESSON_VIDEOS_PROGRESS = require("../../Controllers/26. LessonProgress/3. INSERT")

const router = express.Router()

router.route("/lesson-video-progress")
.post(authMiddleware, INSERT_LESSON_VIDEOS_PROGRESS)

module.exports = router