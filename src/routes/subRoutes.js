const express = require("express")
const auth = require("../middleware/authMiddleware")
const multer = require("multer")

const subRoutes = express.Router()
const upload = multer()

subRoutes.post("/", upload.any("photo"), async (req, res) => {
	console.log("req.body", req.body)
	console.log("req.files", req.files)
	res.send({ message: "Hello World!" })
})

module.exports = { subRoutes }
