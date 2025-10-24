const express = require("express")
const GET_ALL_INVOICE = require("../../Controllers/17. Invoices/1. GET")
const GET_SINGLE_INVOICE = require("../../Controllers/17. Invoices/2. GET_SINGLE")
const INSERT_INVOICES = require("../../Controllers/17. Invoices/3. INSERT")
const DELETE_INVOICE = require("../../Controllers/17. Invoices/4. DELETE")
const UPDATE_INVOICE = require("../../Controllers/17. Invoices/5. UPDATE")

const router = express.Router()

router.route("/invoices")
.get(GET_ALL_INVOICE)
.post(INSERT_INVOICES)

router.route("/invoices/:id")
.get(GET_SINGLE_INVOICE)
.delete(DELETE_INVOICE)
.put(UPDATE_INVOICE)

module.exports = router