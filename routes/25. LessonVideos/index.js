const express = require("express")
const GET_ALL_LESSON_VIDEOS = require("../../Controllers/25. LessonVideos/1. GET")
const GET_SINGLE_LESSON_VIDEOS = require("../../Controllers/25. LessonVideos/2. GET_SINGLE")
const INSERT_LESSON_VIDEOS = require("../../Controllers/25. LessonVideos/3. INSERT")
const DELETE_LESSON_VIDEOS = require("../../Controllers/25. LessonVideos/4. DELETE")
const UPDATE_LESSON_VIDEOS = require("../../Controllers/25. LessonVideos/5. UPDATE")
const ME_LESSON_VIDEOS = require("../../Controllers/25. LessonVideos/6. ME")
const authMiddleware = require("../../Middlewares/authCookie")

const router = express.Router()

router.route("/lesson-videos")
.get(GET_ALL_LESSON_VIDEOS)
.post(INSERT_LESSON_VIDEOS)

router.route("/lesson-videos/:id")
.get(GET_SINGLE_LESSON_VIDEOS)
.delete(DELETE_LESSON_VIDEOS)
.put(UPDATE_LESSON_VIDEOS)

router.route("/lesson-video")
.get(authMiddleware, ME_LESSON_VIDEOS)

module.exports = router