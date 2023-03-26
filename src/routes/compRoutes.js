const express = require("express")
const auth = require("../middleware/authMiddleware")
const { Comp } = require("../models/CompModel")
const getError = require("../utils/getError")
const { validateNewComp } = require("../validation/validateCompRoutes")

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

module.exports = { compRouter }
