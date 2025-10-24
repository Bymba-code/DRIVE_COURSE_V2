const express = require("express")
const GET_ALL_DRIVING_SCHELUDE = require("../../Controllers/13. DrivingSchelude/1. GET")
const GET_SINGLE_DRIVING_SCHELUDE = require("../../Controllers/13. DrivingSchelude/2. GET_SINGLE")
const INSERT_DRIVING_SCHELUDE = require("../../Controllers/13. DrivingSchelude/3. INSERT")
const UPDATE_DRIVING_SCHELUDE = require("../../Controllers/13. DrivingSchelude/4. UPDATE")
const DELETE_DRIVING_SCHELUDE = require("../../Controllers/13. DrivingSchelude/5. DELETE")
const ME_DRIVING_SCHELUDE = require("../../Controllers/13. DrivingSchelude/6. ME")
const authMiddleware = require("../../Middlewares/authCookie")

const router = express.Router()

router.route("/driving-schelude")
.get(GET_ALL_DRIVING_SCHELUDE)
.post(INSERT_DRIVING_SCHELUDE)

router.route("/driving-schelude/:id")
.get(GET_SINGLE_DRIVING_SCHELUDE)
.put(UPDATE_DRIVING_SCHELUDE)
.delete(DELETE_DRIVING_SCHELUDE)

router.route("/me/drive-schelude")
.get(authMiddleware, ME_DRIVING_SCHELUDE)

module.exports = router