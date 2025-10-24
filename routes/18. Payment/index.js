const express = require("express")
const INSERT_PAYMENT = require("../../Controllers/18. Payment/3. INSERT")

const router = express.Router()

router.route("/payment")
.post(INSERT_PAYMENT)

module.exports = router