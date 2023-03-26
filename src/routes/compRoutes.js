const express = require("express")
const auth = require("../middleware/authMiddleware")
const { Comp } = require("../models/CompModel")
const { Sub } = require("../models/SubModel")
const getError = require("../utils/getError")
const {
	validateNewComp,
	validateSelectWinner,
} = require("../validation/validateCompRoutes")

const compRouter = express.Router()

compRouter.post("/", auth, async (req, res) => {
	const result = validateNewComp(req.body)
	if (result.error) return res.status(400).send(getError(result))
	let compInfo = result.value
	compInfo.organizer = req.user._id
	let comp = new Comp(compInfo)
	await comp.save()
	res.send({ comp })
})

compRouter.post("/selectWinner", auth, async (req, res) => {
	const result = validateSelectWinner(req.body)
	if (result.error) return res.status(400).send(getError(result))
	const { competitionId, submissionId } = result.value
	const comp = await Comp.findById(competitionId)
	if (!comp) return res.status(404).send("Competition not found")
	if (comp.organizer.toString() !== req.user._id.toString()) {
		return res.status(403).send("You are not the organizer of this competition")
	}
	if (comp.winner) return res.status(400).send("Winner already selected")
	const sub = await Sub.findById(submissionId)
	if (!sub) return res.status(404).send("Submission not found")
	if (sub.competition.toString() !== competitionId.toString()) {
		return res
			.status(400)
			.send("Submission does not belong to this competition")
	}
	comp.winner = submissionId
	sub.result = "winner"
	await comp.save()
	await sub.save()
	res.send({ comp, sub })
})

module.exports = { compRouter }
