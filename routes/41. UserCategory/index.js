const express = require("express")
const authMiddleware = require("../../Middlewares/authCookie")
const GET_ALL_USER_CATEGORY = require("../../Controllers/41. UserCategory/1. GET")

const router = express.Router()

router.route("/user-category")
.get(authMiddleware, GET_ALL_USER_CATEGORY)

router.route("/information/:id")

module.exports = router