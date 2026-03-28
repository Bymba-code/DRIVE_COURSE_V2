const express = require("express")
const GET_ALL_CITY = require("../../Controllers/34. City/1. GET")
const GET_SINGLE_CITY = require("../../Controllers/34. City/2. GET_SINGLE")
const INSERT_CITY = require("../../Controllers/34. City/3. INSERT")
const DELETE_CITY = require("../../Controllers/34. City/4. DELETE")
const UPDATE_CITY = require("../../Controllers/34. City/5. UPDATE")


const router = express.Router()

router.route("/city")
.get(GET_ALL_CITY)
.post(INSERT_CITY)


router.route("/city/:id")
.get(GET_SINGLE_CITY)
.delete(DELETE_CITY)
.put(UPDATE_CITY)


module.exports = router