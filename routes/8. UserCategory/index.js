const express = require("express")
const GET_ALL_USERS_CATEGORY = require("../../Controllers/8. UserCategory/1. GET")
const GET_SINGLE_USER_CATEGORY = require("../../Controllers/8. UserCategory/2. GET_SINGLE")
const INSERT_USER_CATEGORY = require("../../Controllers/8. UserCategory/3. INSERT")
const DELETE_USERS_CATEGORY = require("../../Controllers/8. UserCategory/4. DELETE")

const Authenticate = require("../../Middlewares/authenticate")
const Authorize = require("../../Middlewares/authorization")
const authMiddleware = require("../../Middlewares/authCookie")

const router = express.Router()

router.route("/user/category")
.get(GET_ALL_USERS_CATEGORY)
.post(authMiddleware, Authorize(["admin"]), INSERT_USER_CATEGORY)

router.route("/user/category/:id")
.get(authMiddleware, Authorize(["admin"]),GET_SINGLE_USER_CATEGORY)
.delete(authMiddleware, Authorize(["admin"]),DELETE_USERS_CATEGORY)

module.exports = router