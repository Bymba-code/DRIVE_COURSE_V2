const express = require("express")
const INSERT_PROGRESS = require("../../Controllers/21. Progress/3. INSERT")
const authMiddleware = require("../../Middlewares/authCookie")
const UPDATE_PROGRESS = require("../../Controllers/21. Progress/5. UPDATE")

const router = express.Router()

router.route("/user-progress")
.post(authMiddleware, INSERT_PROGRESS)

router.route("/user-progress/update")
.put(authMiddleware, UPDATE_PROGRESS)

module.exports = router