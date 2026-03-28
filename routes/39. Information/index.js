const express = require("express")
const GET_ALL_INFORMATION = require("../../Controllers/39. Information/1. GET")
const INSERT_INFORMATION = require("../../Controllers/39. Information/3. INSERT")
const GET_SINGLE_INFORMATION = require("../../Controllers/39. Information/2. GET_SINGLE")
const UPDATE_INFORMATION = require("../../Controllers/39. Information/5. UPDATE")
const DELETE_INFORMATION = require("../../Controllers/39. Information/4. DELETE")

const router = express.Router()

router.route("/information")
.get(GET_ALL_INFORMATION)
.post(INSERT_INFORMATION)

router.route("/information/:id")
.get(GET_SINGLE_INFORMATION)
.put(UPDATE_INFORMATION)
.delete(DELETE_INFORMATION)

module.exports = router