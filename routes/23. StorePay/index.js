const express = require("express")
const GET_ACCESS_TOKEN_STOREPAY = require("../../Controllers/23. StorePay/1. GET_ACCESS_TOKEN")
const STOREPAY_INVOICE_CHECK = require("../../Controllers/23. StorePay/3. CHECK")

const router = express.Router()

router.route("/access-token/storepay")
.get(GET_ACCESS_TOKEN_STOREPAY)

router.route("/storepay-check")
.post(STOREPAY_INVOICE_CHECK)

module.exports = router