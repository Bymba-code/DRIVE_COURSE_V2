const express = require("express")
const GET_ALL_CARS = require("../../Controllers/33. Cars/1. GET")
const GET_SINGLE_CARS = require("../../Controllers/33. Cars/2. GET_SINGLE")
const INSERT_CARS = require("../../Controllers/33. Cars/3. INSERT")
const DELETE_CARS = require("../../Controllers/33. Cars/4. DELETE")
const UPDATE_CARS = require("../../Controllers/33. Cars/5. UPDATE")

const router = express.Router()

router.route("/cars")
.get(GET_ALL_CARS)
.post(INSERT_CARS)

router.route("/cars/:id")
.get(GET_SINGLE_CARS)
.delete(DELETE_CARS)
.put(UPDATE_CARS)

module.exports = router