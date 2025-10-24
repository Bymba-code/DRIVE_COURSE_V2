const express = require("express")
const GET_ALL_REPLIES = require("../../Controllers/29. Reply/1. GET")
const GET_SINGLE_REPLIES = require("../../Controllers/29. Reply/2. GET_SINGLE")
const INSERT_REPLIES = require("../../Controllers/29. Reply/3. INSERT")
const authMiddleware = require("../../Middlewares/authCookie")
const DELETE_REPLIES = require("../../Controllers/29. Reply/4. DELETE")
const UPDATE_REPLIES = require("../../Controllers/29. Reply/5. UPDATE")
const ME_REPLIES = require("../../Controllers/29. Reply/6. ME")
const ME_DELETE_REPLIES = require("../../Controllers/29. Reply/7. ME_DELETE")
const ME_UPDATE_REPLIES = require("../../Controllers/29. Reply/8. ME_UPDATE")

const router = express.Router()

router.route("/replies")
.get(GET_ALL_REPLIES)
.post(authMiddleware, INSERT_REPLIES)

router.route("/replies/:id")
.get(GET_SINGLE_REPLIES)
.delete(DELETE_REPLIES)
.put(UPDATE_REPLIES)

router.route("/reply")
.get(authMiddleware, ME_REPLIES)

router.route("/reply/:id")
.delete(authMiddleware, ME_DELETE_REPLIES)
.put(authMiddleware, ME_UPDATE_REPLIES)

module.exports = router