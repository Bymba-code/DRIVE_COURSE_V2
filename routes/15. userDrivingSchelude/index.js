const express = require("express")
const GET_ALL_DRIVE_SCHELUDE = require("../../Controllers/15. userDrivingSchelude/1. GET")
const GET_SINGLE_STUDENT_DRIVE_SCHELUDE = require("../../Controllers/15. userDrivingSchelude/2. GET_SINGLE")
const INSERT_STUDENT_DRIVING_SCHELUDE = require("../../Controllers/15. userDrivingSchelude/3. INSERT")
const UPDATE_STUDENT_DRIVING_SCHELUDE = require("../../Controllers/15. userDrivingSchelude/4. UPDATE")
const DELETE_STUDENT_DRIVING_SCHELUDE = require("../../Controllers/15. userDrivingSchelude/5. DELETE")
const ME_STUDENT_DRIVING_SCHELUDE = require("../../Controllers/15. userDrivingSchelude/6. ME")
const authMiddleware = require("../../Middlewares/authCookie")
const ME_INSERT_STUDENT_DRIVING_SCHELUDE = require("../../Controllers/15. userDrivingSchelude/7. ME_POST")


const router = express.Router()

router.route("/drive-schelude/user")
.get(authMiddleware ,ME_STUDENT_DRIVING_SCHELUDE)
.post(authMiddleware, ME_INSERT_STUDENT_DRIVING_SCHELUDE)

router.route("/drive-schelude/users")
.get(GET_ALL_DRIVE_SCHELUDE)
.post(INSERT_STUDENT_DRIVING_SCHELUDE)

router.route("/drive-schelude/users/:id")
.get(GET_SINGLE_STUDENT_DRIVE_SCHELUDE)
.put(UPDATE_STUDENT_DRIVING_SCHELUDE)
.delete(DELETE_STUDENT_DRIVING_SCHELUDE)

module.exports = router