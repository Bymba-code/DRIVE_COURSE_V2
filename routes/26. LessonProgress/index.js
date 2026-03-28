const express = require("express")
const INSERT_LESSON_VIDEOS_PROGRESS = require("../../Controllers/26. LessonProgress/3. INSERT")
const authMiddleware = require("../../Middlewares/authCookie")
const UPDATE_LESSON_PROGRESS = require("../../Controllers/26. LessonProgress/5. UPDATE")

const router = express.Router()

router.route("/lesson-progress")
.post(authMiddleware, INSERT_LESSON_VIDEOS_PROGRESS)

router.route("/lesson-progress/:id")
.put(authMiddleware, UPDATE_LESSON_PROGRESS)

module.exports = router