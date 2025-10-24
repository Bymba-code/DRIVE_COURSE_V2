const express = require("express")
const GET_ALL_POST = require("../../Controllers/27. Post/1. GET")
const GET_SINGLE_POST = require("../../Controllers/27. Post/2. GET_SINGLE")
const authMiddleware = require("../../Middlewares/authCookie")
const INSERT_POST = require("../../Controllers/27. Post/3. INSERT")
const DELETE_POST = require("../../Controllers/27. Post/4. DELETE")
const UPDATE_POSTS = require("../../Controllers/27. Post/5. UPDATE")
const ME_POST = require("../../Controllers/27. Post/6. ME")
const ME_POST_DELETE = require("../../Controllers/27. Post/7. ME_DELETE")
const ME_POST_UPDATE = require("../../Controllers/27. Post/8. ME_UPDATE")

const router = express.Router()

router.route("/posts")
.get(GET_ALL_POST)
.post(authMiddleware, INSERT_POST)

router.route("/posts/:id")
.get(GET_SINGLE_POST)
.delete(DELETE_POST)
.put(UPDATE_POSTS)

router.route("/post")
.get(authMiddleware, ME_POST)

router.route("/post/:id")
.delete(authMiddleware, ME_POST_DELETE)
.put(authMiddleware, ME_POST_UPDATE)

module.exports = router