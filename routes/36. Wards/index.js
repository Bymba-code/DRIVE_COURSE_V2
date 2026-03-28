const express = require("express")
const GET_ALL_WARDS = require("../../Controllers/36. Wards/1. GET")
const INSERT_WARDS = require("../../Controllers/36. Wards/3. INSERT")
const GET_SINGLE_WARDS = require("../../Controllers/36. Wards/2. GET_SINGLE")
const UPDATE_WARDS = require("../../Controllers/36. Wards/5. UPDATE")
const DELETE_WARDS = require("../../Controllers/36. Wards/4. DELETE")

const router = express.Router()

router.route("/wards")
.get(GET_ALL_WARDS)
.post(INSERT_WARDS)

router.route("/wards/:id")
.get(GET_SINGLE_WARDS)
.put(UPDATE_WARDS)
.delete(DELETE_WARDS)

module.exports = router