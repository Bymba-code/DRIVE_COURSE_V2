const express = require("express")
const LOGIN = require("../../Controllers/1. Auth/1. Login")
const REGISTER = require("../../Controllers/1. Auth/2. Register")
const Authenticate = require("../../Middlewares/authenticate")
const Authorize = require("../../Middlewares/authorization")
const LOGOUT = require("../../Controllers/1. Auth/3. Logout")
const LOGIN_TEACHER = require("../../Controllers/1. Auth/4. TeacherLogin")
const STUDENT_REGISTER = require("../../Controllers/1. Auth/5. StudentRegister")

const router = express.Router()

router.route("/login").post(LOGIN)

router.route("/logout").get(LOGOUT)


router.route("/register").post(Authenticate, Authorize(["admin"]), REGISTER)

router.route("/login/teacher")
.post(LOGIN_TEACHER)

router.route("/student/register")
.post(STUDENT_REGISTER)

module.exports = router