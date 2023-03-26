var express = require("express"),
	config = require("config"),
	aws = require("aws-sdk"),
	bodyParser = require("body-parser"),
	multer = require("multer"),
	multerS3 = require("multer-s3")

const auth = require("../middleware/authMiddleware")
const { Sub } = require("../models/SubModel")
const getError = require("../utils/getError")
const { validateNewSub } = require("../validation/validateSubRoutes")

const subRoutes = express.Router()
const aws_id = config.get("aws_id")
const aws_secret = config.get("aws_secret")
const aws_bucket_name = config.get("aws_bucket_name")

aws.config.update({
	secretAccessKey: aws_secret,
	accessKeyId: aws_id,
	region: "us-east-1", // ?
})

const s3 = new aws.S3()

var upload = multer({
	storage: multerS3({
		s3: s3,
		acl: "public-read",
		bucket: aws_bucket_name,
		key: function(req, file, cb) {
			console.log(file)
			cb(null, `${Date.now()}____${file.originalname}`)
		},
	}),
})

subRoutes.post("/", auth, upload.any("files"), async (req, res) => {
	const subMetadata = JSON.parse(req.body.subMetadata)
	const result = validateNewSub(subMetadata)
	if (result.error) return res.status(400).send(getError(result))
	let subInfo = result.value
	const { competitionId, description, hideSubmission } = subInfo
	const files = req.files
	const fileData = files.map((file) => ({
		originalFileName: file.originalname,
		fileName: file.key,
		mimeType: file.mimetype,
		size: file.size,
		uri: file.location,
	}))
	console.log("fileData", fileData)
	const submissionData = {
		competition: competitionId,
		creator: req.user._id,
		files: fileData,
		description,
		isPublic: !hideSubmission,
	}
	const sub = new Sub(submissionData)
	console.log("sub1", sub)
	await sub.save()
	console.log("sub2", sub)
	console.log("done")
	res.send({})
})

module.exports = { subRoutes }
