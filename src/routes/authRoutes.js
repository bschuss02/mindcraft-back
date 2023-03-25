const express = require("express")
const getError = require("../utils/getError")
const bcrypt = require("bcrypt")

const {
	validateNewUser,
	validateLogin,
} = require("../validation/validateAuthRoutes")
const { User } = require("../models/UserModel")
const getSelectedFields = require("../utils/getSelectedFields")

const authRoutes = express.Router()

authRoutes.post("/signup", async (req, res) => {
	const result = validateNewUser(req.body)
	if (result.error) return res.status(400).send(getError(result))
	let userInfo = result.value
	const otherUser = await User.findOne({ username: userInfo.username })
	if (otherUser) {
		return res.status(400).send("Username already exists")
	}
	const salt = await bcrypt.genSalt(10)
	const hashedPassword = await bcrypt.hash(userInfo.password, salt)
	userInfo.password = hashedPassword
	let user = new User(userInfo)
	await user.save()
	const token = user.generateAuthToken()
	user = await User.findById(user._id).select(getSelectedFields("User", []))
	res.send({ user, token })
})

authRoutes.get("/login", async (req, res) => {
	const result = validateLogin(req.query)
	if (result.error) return res.status(400).send(getError(result))
	const loginInfo = result.value
	let user = await User.findOne({ username: loginInfo.username })
	if (!user) {
		return res.status(400).send("Username or password is invalid")
	}
	const isValidPassword = bcrypt.compare(loginInfo.password, user.password)
	if (!isValidPassword) {
		return res.status(400).send("Username or password is invalid")
	}
	const token = user.generateAuthToken()
	user = await User.findById(user._id).select(getSelectedFields("User", []))
	res.send({ user, token })
})

module.exports = authRoutes
