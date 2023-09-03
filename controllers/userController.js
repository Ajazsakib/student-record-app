
const User = require("../models/user")
const bcrypt = require("bcrypt")
const saltRounds = 10
module.exports.dashboard = function (req, res)
{
    if (req.isAuthenticated()) {
        return res.render("index", {
            title: "Student Record App",
            user: req.user
        })
    }
    else {
        res.render("login", {
            title: "Student Record App"
        })
    }
}

module.exports.login = function (req, res)
{
    res.render("login", {
        title: "Student Record App"
    })
}

module.exports.register = function (req, res)
{
    res.render("register", {
        title: "Student Record App"
    })
}

module.exports.createUser = async function (req, res)
{


    try {
        const { name, username, password, confirmPassword } = req.body
        if (password !== confirmPassword) {
            console.log("both password should be same!!")
            return
        }
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        const newUser = new User({
            name: name,
            username: username,
            password: hashedPassword
        })


        await newUser.save()

        res.redirect("/user/login")
    }
    catch (err) {
        console.log("Error in creating user", err)
    }
}

module.exports.login = function (req, res)
{
    return res.redirect("/");
}

module.exports.logout = function (req, res)
{
    req.logout(function (err)
    {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    })
}