const express = require("express")

const router = express.Router()

const userController = require("../controllers/userController")

const passport = require("passport")


router.get("/login", userController.login)
router.get("/register", userController.register)

router.post("/createUser", userController.createUser)

router.post("/createSession", passport.authenticate("local", { failureRedirect: "/login" }), userController.login
)

router.get("/logout", userController.logout)



module.exports = router