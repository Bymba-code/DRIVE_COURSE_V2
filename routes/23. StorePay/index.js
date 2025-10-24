const express = require("express")
const GET_ACCESS_TOKEN_STOREPAY = require("../../Controllers/23. StorePay/1. GET_ACCESS_TOKEN")

const router = express.Router()

router.route("/access-token/storepay")
.get(GET_ACCESS_TOKEN_STOREPAY)

module.exports = router