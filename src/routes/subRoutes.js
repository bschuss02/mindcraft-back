var express = require("express"),
	config = require("config"),
	aws = require("aws-sdk"),
	bodyParser = require("body-parser"),
	multer = require("multer"),
	multerS3 = require("multer-s3")

const auth = require("../middleware/authMiddleware")

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
			cb(null, file.originalname) //use Date.now() for unique file keys
		},
	}),
})

subRoutes.post("/", auth, upload.any("files"), async (req, res) => {
	console.log("req.files", req.files)
	const subMetadata = JSON.parse(req.body.subMetadata)
	console.log("subMetadata", subMetadata)
	res.send({ message: "Hello World!" })
})

module.exports = { subRoutes }
