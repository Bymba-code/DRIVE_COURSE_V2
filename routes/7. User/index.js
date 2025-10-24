const express = require("express")
const GET_ALL_USERS = require("../../Controllers/7. Users/1. GET")

const Authenticate = require("../../Middlewares/authenticate")
const Authorize = require("../../Middlewares/authorization")
const GET_SINGLE_USERS = require("../../Controllers/7. Users/2. GET_SINGLE")
const INSERT_USERS = require("../../Controllers/7. Users/3. INSERT")
const DELETE_USERS = require("../../Controllers/7. Users/4. DELETE")
const UPDATE_USERS = require("../../Controllers/7. Users/5. UPDATE")
const USERS_ME = require("../../Controllers/7. Users/6. ME")
const authMiddleware = require("../../Middlewares/authCookie")

const router = express.Router()

router.route("/users")
.get(authMiddleware,  GET_ALL_USERS)
.post(authMiddleware, INSERT_USERS)

router.route("/users/:id")
.get(GET_SINGLE_USERS)
.delete(authMiddleware, Authorize(["admin"]), DELETE_USERS)
.put(authMiddleware, Authorize(["admin"]), UPDATE_USERS)

router.route("/user/me")
.get(authMiddleware ,USERS_ME)

module.exports = router