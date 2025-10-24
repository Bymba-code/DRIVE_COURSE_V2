const express = require("express")
const uploadContract = require("../../Services/uploadContract")
const GET_ALL_CONTRACT = require("../../Controllers/19. Contract/1. GET")
const GET_SINGLE_CONTRACT = require("../../Controllers/19. Contract/2. GET_SINGLE")
const INSERT_CONTRACT = require("../../Controllers/19. Contract/3. INSERT")

const router = express.Router()

router.route("/contract")
.get(GET_ALL_CONTRACT)
.post(uploadContract.single('file') ,INSERT_CONTRACT)

router.route("/contract/:id")
.get(GET_SINGLE_CONTRACT)

module.exports = router