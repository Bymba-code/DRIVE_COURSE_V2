const express = require("express")
const GET_STUDENT_STAT = require("../../Controllers/16. UserStats/1. GET")

const router = express.Router()

router.route("/student/stat/:id")
.get(GET_STUDENT_STAT)

module.exports = router