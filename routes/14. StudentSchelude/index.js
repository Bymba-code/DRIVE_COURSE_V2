const express = require("express")
const GET_ALL_STUDENT_SCHELUDE = require("../../Controllers/14. StudentSchelude/1. GET")
const GET_SINGLE_STUDENT_SCHELUDE = require("../../Controllers/14. StudentSchelude/2. GET_SINGLE")
const INSERT_STUDENT_SCHELUDE = require("../../Controllers/14. StudentSchelude/3. INSERT")
const UPDATE_STUDENT_SCHELUDE = require("../../Controllers/14. StudentSchelude/4. UPDATE")
const DELETE_STUDENT_SCHELUDE = require("../../Controllers/14. StudentSchelude/5. DELETE")
const authMiddleware = require("../../Middlewares/authCookie")
const ME_STUDENT_SCHELUDE = require("../../Controllers/14. StudentSchelude/6. ME")

const router = express.Router()

router.route("/student-schelude")
.get(GET_ALL_STUDENT_SCHELUDE)
.post(INSERT_STUDENT_SCHELUDE)

router.route("/student-schelude/:id")
.get(GET_SINGLE_STUDENT_SCHELUDE)
.put(UPDATE_STUDENT_SCHELUDE)
.delete(DELETE_STUDENT_SCHELUDE)

router.route("/me/student-schelude")
.get(authMiddleware, ME_STUDENT_SCHELUDE)

module.exports = router