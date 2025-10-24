const express = require("express")

const GET_ALL_EXAM = require("../../Controllers/5. Exam/1. GET")
const GET_SINGLE_EXAM = require("../../Controllers/5. Exam/2. GET_SINGLE")

const Authorize = require("../../Middlewares/authorization")
const INSERT_EXAM = require("../../Controllers/5. Exam/3. INSERT")
const DELETE_EXAM = require("../../Controllers/5. Exam/4. DELETE")
const UPDATE_TEST = require("../../Controllers/5. Exam/5. UPDATE")
const authMiddleware = require("../../Middlewares/authCookie")

const router = express.Router()

router.route("/exam")
.get(authMiddleware, Authorize(["admin"]), GET_ALL_EXAM)
.post(authMiddleware, INSERT_EXAM)

router.route("/exam/:id")
.get(GET_SINGLE_EXAM)
.delete(authMiddleware, DELETE_EXAM)
.put(UPDATE_TEST)

module.exports = router