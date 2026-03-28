const express = require("express")
const GET_ALL_DISTRICT = require("../../Controllers/35. District/1. GET")
const INSERT_DISTRICT = require("../../Controllers/35. District/3. INSERT")
const GET_SINGLE_DISTRICT = require("../../Controllers/35. District/2. GET_SINGLE")
const UPDATE_DISTRICT = require("../../Controllers/35. District/5. UPDATE")
const DELETE_DISTRICT = require("../../Controllers/35. District/4. DELETE")

const router = express.Router()

router.route("/district")
.get(GET_ALL_DISTRICT)
.post(INSERT_DISTRICT)

router.route("/district/:id")
.get(GET_SINGLE_DISTRICT)
.put(UPDATE_DISTRICT)
.delete(DELETE_DISTRICT)

module.exports = router