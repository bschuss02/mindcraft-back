var express = require("express"),
	config = require("config"),
	aws = require("aws-sdk"),
	bodyParser = require("body-parser"),
	multer = require("multer"),
	multerS3 = require("multer-s3")

const auth = require("../middleware/authMiddleware")
const { Comp } = require("../models/CompModel")
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
	const comp = await Comp.findById(competitionId)
	if (!comp) return res.status(404).send("Competition not found")
	const files = req.files
	if (files.length === 0) return res.status(400).send("Select a file to upload")
	const fileData = files.map((file) => ({
		originalFileName: file.originalname,
		fileName: file.key,
		mimeType: file.mimetype,
		size: file.size,
		uri: file.location,
	}))
	const submissionData = {
		competition: competitionId,
		creator: req.user._id,
		files: fileData,
		description,
		isPublic: !hideSubmission,
	}
	const sub = new Sub(submissionData)
	await sub.save()
	comp.subs.push(sub._id)
	await comp.save()
	const submission = await Sub.findById(sub._id).populate("creator")
	res.send({ submission })
})

module.exports = { subRoutes }
