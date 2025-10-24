const express = require("express")
const GET_ALL_LESSONS = require("../../Controllers/24. Lessons/1. GET")
const GET_SINGLE_LESSONS = require("../../Controllers/24. Lessons/2. GET_SINGLE")
const INSERT_LESSONS = require("../../Controllers/24. Lessons/3. INSERT")
const DELETE_LESSONS = require("../../Controllers/24. Lessons/4. DELETE")
const UPDATE_LESSONS = require("../../Controllers/24. Lessons/5. UPDATE")
const ME_LESSONS = require("../../Controllers/24. Lessons/6. ME")
const authMiddleware = require("../../Middlewares/authCookie")

const router = express.Router()

router.route("/lessons")
.get(GET_ALL_LESSONS)
.post(INSERT_LESSONS)

router.route("/lessons/:id")
.get(GET_SINGLE_LESSONS)
.delete(DELETE_LESSONS)
.put(UPDATE_LESSONS)

router.route("/lesson/me")
.get(authMiddleware, ME_LESSONS)

module.exports = router