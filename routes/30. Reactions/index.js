const express = require("express")
const GET_ALL_REACTIONS = require("../../Controllers/30. Reactions/1. GET")
const GET_SINGLE_REACTIONS = require("../../Controllers/30. Reactions/2. GET_SINGLE")
const INSERT_REACTIONS = require("../../Controllers/30. Reactions/3. INSERT")
const DELETE_REACTION = require("../../Controllers/30. Reactions/4. DELETE")
const UPDATE_REACTIONS = require("../../Controllers/30. Reactions/5. UPDATE")
const ME_REACTIONS = require("../../Controllers/30. Reactions/6. ME")
const authMiddleware = require("../../Middlewares/authCookie")
const ME_UPDATE_REACTIONS = require("../../Controllers/30. Reactions/8. ME_UPDATE")

const router = express.Router()

router.route("/reactions")
.get(GET_ALL_REACTIONS)
.post(authMiddleware, INSERT_REACTIONS)

router.route("/reactions/:id")
.get(GET_SINGLE_REACTIONS)
.delete(DELETE_REACTION)
.put(UPDATE_REACTIONS)

router.route("/reaction")
.get(authMiddleware, ME_REACTIONS)

router.route("/reaction/:id")
.delete(authMiddleware, DELETE_REACTION)
.put(authMiddleware, ME_UPDATE_REACTIONS)

module.exports = router