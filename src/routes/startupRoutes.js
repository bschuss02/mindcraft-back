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

	// was just adding the rest of the field to the project block
	const allComps = await Comp.aggregate([
		{
			$lookup: {
				from: "subs",
				localField: "_id",
				foreignField: "competition",
				as: "submissions",
			},
		},
		{
			$project: {
				_id: 1,
				organizer: 1,
				coverImage: 1,
				title: 1,
				subtitle: 1,
				overview: 1,
				prizeMoney: 1,
				deadline: 1,
				rules: 1,
				resources: 1,
				createdAt: 1,
				submissions: `$submissions._id`,
			},
		},
	])

	console.log("allComps", allComps)
	const populatedComps = []

	await Promise.all(
		allComps.map(async (comp) => {
			const populatedComp = await Comp.populate(comp, {
				path: "submissions",
				select: "_id files creator",
			})

			populatedComps.push(populatedComp)
		}),
	)
	console.log("populatedComps", populatedComps)

	const [allCompIds, allCompsMap] = createObjectMap(allComps)
	res.send({ user, allCompIds, allCompsMap })
})

module.exports = { startupRouter }
