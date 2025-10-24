const express = require("express")
const GET_ALL_COMMENT = require("../../Controllers/28. Comment/1. GET")
const GET_SINGLE_COMMENT = require("../../Controllers/28. Comment/2. GET_SINGLE")
const INSERT_COMMENT = require("../../Controllers/28. Comment/3. INSERT")
const authMiddleware = require("../../Middlewares/authCookie")
const DELETE_COMMENT = require("../../Controllers/28. Comment/4. DELETE")
const UPDATE_COMMENT = require("../../Controllers/28. Comment/5. UPDATE")
const ME_COMMENT = require("../../Controllers/28. Comment/6. ME")
const ME_COMMENT_DELETE = require("../../Controllers/28. Comment/7. ME_DELETE")
const ME_COMMENT_UPDATE = require("../../Controllers/28. Comment/8. ME_UPDATE")

const router = express.Router()

router.route("/comments")
.get(GET_ALL_COMMENT)
.post(authMiddleware, INSERT_COMMENT)

router.route("/comments/:id")
.get(GET_SINGLE_COMMENT)
.delete(DELETE_COMMENT)
.put(UPDATE_COMMENT)

router.route("/comment")
.get(authMiddleware, ME_COMMENT)

router.route("/comment/:id")
.delete(authMiddleware, ME_COMMENT_DELETE)
.put(authMiddleware, ME_COMMENT_UPDATE)

module.exports = router