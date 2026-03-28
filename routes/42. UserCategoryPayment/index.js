const express = require("express")
const authMiddleware = require("../../Middlewares/authCookie")
const INSERT_USER_CATEGORY_PAYMENT = require("../../Controllers/42. UserCategoryPayment/3. INSERT")
const UPDATE_USER_CATEGORY_PAYMENTS = require("../../Controllers/42. UserCategoryPayment/5. UPDATE")
const GET_SINGLE_USER_CATEGORY_PAYMENT = require("../../Controllers/42. UserCategoryPayment/2. GET_SINGLE")

const router = express.Router()

router.route("/user-category-payments")
.post(authMiddleware, INSERT_USER_CATEGORY_PAYMENT)

router.route("/user-category-payments/:id")
.put(authMiddleware, UPDATE_USER_CATEGORY_PAYMENTS)
.get(authMiddleware, GET_SINGLE_USER_CATEGORY_PAYMENT)

module.exports = router