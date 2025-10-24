const express = require("express")
const GET_ALL_SCHELUDE = require("../../Controllers/12. Schelude/1. GET")
const GET_SINGLE_SCHELUDE = require("../../Controllers/12. Schelude/2. GET_SINGLE")
const INSERT_SCHELUDE = require("../../Controllers/12. Schelude/3. INSERT")
const UPDATE_SCHELUDE = require("../../Controllers/12. Schelude/4. UPDATE")
const DELETE_SCHELUDE = require("../../Controllers/12. Schelude/5. DELETE")
const ME_SCHELUDE = require("../../Controllers/12. Schelude/6. ME")
const authMiddleware = require("../../Middlewares/authCookie")

const router = express.Router()

router.route("/schelude")
.get(GET_ALL_SCHELUDE)
.post(INSERT_SCHELUDE)

router.route("/schelude/:id")
.get(GET_SINGLE_SCHELUDE)
.put(UPDATE_SCHELUDE)
.delete(DELETE_SCHELUDE)

router.route("/me/schelude")
.get(authMiddleware, ME_SCHELUDE)

module.exports = router