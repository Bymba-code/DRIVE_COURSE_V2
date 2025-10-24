const express = require("express")
const GET_ALL_TEACHER = require("../../Controllers/10. Teacher/1. GET")
const GET_SINGLE_TEACHER = require("../../Controllers/10. Teacher/2. GET_SINGLE")
const INSERT_TEACHER = require("../../Controllers/10. Teacher/3. INSERT")
const UPDATE_TEACHER = require("../../Controllers/10. Teacher/4. UPDATE")
const DELETE_TEACHER = require("../../Controllers/10. Teacher/5. DELETE")
const ME_TEACHER = require("../../Controllers/10. Teacher/6. ME")
const authMiddleware = require("../../Middlewares/authCookie")

const router = express.Router()

router.route("/teacher")
.get(GET_ALL_TEACHER)
.post(INSERT_TEACHER)

router.route("/teacher/:id")
.get(GET_SINGLE_TEACHER)
.put(UPDATE_TEACHER)
.delete(DELETE_TEACHER)

router.route("/me/teacher")
.get(authMiddleware, ME_TEACHER)

module.exports = router