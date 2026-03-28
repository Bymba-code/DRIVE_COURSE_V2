const express = require("express")
const GET_ALL_GENDER = require("../../Controllers/37. Gender/1. GET")
const INSERT_GENDER = require("../../Controllers/37. Gender/3. INSERT")
const GET_SINGLE_GENDER = require("../../Controllers/37. Gender/2. GET_SINGLE")
const UPDATE_GENDER = require("../../Controllers/37. Gender/5. UPDATE")
const DELETE_GENDER = require("../../Controllers/37. Gender/4. DELETE")

const router = express.Router()

router.route("/gender")
.get(GET_ALL_GENDER)
.post(INSERT_GENDER)

router.route("/gender/:id")
.get(GET_SINGLE_GENDER)
.put(UPDATE_GENDER)
.delete(DELETE_GENDER)

module.exports = router