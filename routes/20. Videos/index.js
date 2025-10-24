const express = require("express")
const GET_ALL_VIDEOS = require("../../Controllers/20. Videos/1. GET")
const GET_SINGLE_VIDEOS = require("../../Controllers/20. Videos/2. GET_SINGLE")
const INSERT_VIDEO = require("../../Controllers/20. Videos/3. INSERT")
const DELETE_VIDEO = require("../../Controllers/20. Videos/4. DELETE")
const UPDATE_VIDEO = require("../../Controllers/20. Videos/5. UPDATE")
const authMiddleware = require("../../Middlewares/authCookie")
const ME_VIDEOS = require("../../Controllers/20. Videos/6. ME")

const router = express.Router()

router.route("/videos")
.get(GET_ALL_VIDEOS)
.post(INSERT_VIDEO)

router.route("/videos/:id")
.get(GET_SINGLE_VIDEOS)
.delete(DELETE_VIDEO)
.put(UPDATE_VIDEO)

router.route("/video")
.get(authMiddleware, ME_VIDEOS)

module.exports = router