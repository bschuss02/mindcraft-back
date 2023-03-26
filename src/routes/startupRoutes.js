const express = require("express")
const auth = require("../middleware/authMiddleware")
const { Comp } = require("../models/CompModel")
const { Sub } = require("../models/SubModel")
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
	const allComps = await Comp.find({}).populate("subs")
	const allSubs = await Sub.find({})
		.populate("competition")
		.populate("creator")
	const mySubs = await Sub.find({ creator: user._id }).populate("competition")
	const myComps = await Comp.find({ organizer: user._id })
		.populate("subs")
		.populate("organizer")
	const [allCompIds, allCompsMap] = createObjectMap(allComps)
	const [allSubIds, allSubsMap] = createObjectMap(allSubs)
	const [myCompIds, myCompsMap] = createObjectMap(myComps)
	const [mySubIds, mySubsMap] = createObjectMap(mySubs)
	const compsMap = { ...allCompsMap, ...myCompsMap }
	const subsMap = { ...mySubsMap, ...allSubsMap }
	res.send({ user, allCompIds, compsMap, myCompIds, mySubIds, subsMap })
})

module.exports = { startupRouter }
