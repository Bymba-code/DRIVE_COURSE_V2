const express = require("express")
const GET_ALL_TEACHER_CATEGORY = require("../../Controllers/11. TeacherCategory/1. GET")
const GET_SINGLE_TEACHER_CATEGORY = require("../../Controllers/11. TeacherCategory/2. GET_SINGLE")
const INSERT_TEACHER_CATEGORY = require("../../Controllers/11. TeacherCategory/3. INSERT")
const DELETE_TEACHER_CATEGORY = require("../../Controllers/11. TeacherCategory/4. DELETE")


const router = express.Router()

router.route("/teacher-category")
.get(GET_ALL_TEACHER_CATEGORY)
.post(INSERT_TEACHER_CATEGORY)

router.route("/teacher-category/:id")
.get(GET_SINGLE_TEACHER_CATEGORY)
.delete(DELETE_TEACHER_CATEGORY)


module.exports = router