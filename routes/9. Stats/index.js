const express = require("express")
const GET_ALL_STATS = require("../../Controllers/9. Stats/1. GET")

const router = express.Router()

router.route("/stats")
.get(GET_ALL_STATS)


module.exports = router