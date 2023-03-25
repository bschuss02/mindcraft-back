const express = require("express")
const auth = require("../middleware/authMiddleware")
const { User } = require("../models/UserModel")

const startupRouter = express.Router()

startupRouter.get("/", async (req, res) => {
	const message = "Hello World!"
	res.send({ message })
})

startupRouter.get("/withuser", auth, async (req, res) => {
	const user = await User.findById(req.user._id).select("-password")
	if (!user) {
		return res.status(404).send("User not found")
	}
	const message = "Hello World!"
	res.send({ message, user })
})

module.exports = { startupRouter }
