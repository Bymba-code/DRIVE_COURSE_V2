const express = require("express")
const GET_ALL_ANSWERS = require("../../Controllers/6. Answers/1. GET")
const GET_SINGLE_ANSWERS = require("../../Controllers/6. Answers/2. GET_SINGLE")
const INSERT_ANSWERS = require("../../Controllers/6. Answers/3. INSERT")

const Authenticate = require("../../Middlewares/authenticate")
const Authorize = require("../../Middlewares/authorization")
const UPDATE_ANSWERS = require("../../Controllers/6. Answers/4. UPDATE")
const DELETE_ANSWERS = require("../../Controllers/6. Answers/5. DELETE")
const authMiddleware = require("../../Middlewares/authCookie")

const router = express.Router()

router.route("/answer")
.get(GET_ALL_ANSWERS)
.post(authMiddleware, Authorize(["admin"]), INSERT_ANSWERS)

router.route("/answer/:id")
.get(GET_SINGLE_ANSWERS)
.put(authMiddleware, Authorize(["admin"]), UPDATE_ANSWERS)
.delete(authMiddleware, Authorize(["admin"]), DELETE_ANSWERS)


module.exports = router