const express = require("express")
const testingRoutes = express.Router()

testingRoutes.get("/", (req, res) => {
	res.send({ message: "Hello World!" })
})

module.exports = testingRoutes
