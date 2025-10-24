const express = require("express")
const GET_USER_PROFILE = require("../../Controllers/31. Profile/1. GET")

const router = express.Router()

router.route("/profile")
.get(GET_USER_PROFILE)

module.exports = router