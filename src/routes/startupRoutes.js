const express = require("express")
const auth = require("../middleware/authMiddleware")
const { Comp } = require("../models/CompModel")
const { User } = require("../models/UserModel")
const { createObjectMap } = require("../utils/createObjectMap")

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
	const allComps = await Comp.find({}).sort({ createdAt: -1 })
	const [allCompIds, allCompsMap] = createObjectMap(allComps)
	res.send({ allCompIds, allCompsMap, user })
})

module.exports = { startupRouter }
