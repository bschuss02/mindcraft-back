const express = require("express")
const auth = require("../middleware/authMiddleware")
const multer = require("multer")

const subRoutes = express.Router()
const upload = multer()

subRoutes.post("/", auth, upload.any("files"), async (req, res) => {
	console.log("req.files", req.files)
	const subMetadata = JSON.parse(req.body.subMetadata)
	console.log("subMetadata", subMetadata)
	res.send({ message: "Hello World!" })
})

module.exports = { subRoutes }
