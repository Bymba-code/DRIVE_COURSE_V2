const express = require("express")
const GET_ALL_BLOODTYPE = require("../../Controllers/38. BloodType/1. GET")
const INSERT_BLOODTYPE = require("../../Controllers/38. BloodType/3. INSERT")
const GET_SINGLE_BLOODTYPE = require("../../Controllers/38. BloodType/2. GET_SINGLE")
const UPDATE_BLOODTYPE = require("../../Controllers/38. BloodType/5. UPDATE")
const DELETE_BLOODTYPE = require("../../Controllers/38. BloodType/4. DELETE")

const router = express.Router()

router.route("/bloodtype")
.get(GET_ALL_BLOODTYPE)
.post(INSERT_BLOODTYPE)

router.route("/bloodtype/:id")
.get(GET_SINGLE_BLOODTYPE)
.put(UPDATE_BLOODTYPE)
.delete(DELETE_BLOODTYPE)

module.exports = router