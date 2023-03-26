const express = require("express")
const auth = require("../middleware/authMiddleware")
const multer = require("multer")
const multerS3 = require("multer-s3")

const subRoutes = express.Router()
const upload = multer({
	dest: "uploads/",
	limits: { fileSize: 5e6 },
	fileFilter: (req, file, cb) => {
		const allowedMimeTypes = ["image/jpeg", "image/png", "application/pdf"]
		if (allowedMimeTypes.includes(file.mimetype)) {
			cb(null, true)
		} else {
			cb(new Error("File type not allowed"))
		}
	},
	storage: multerS3({
		s3: s3,
		bucket: "my-bucket",
		metadata: function(req, file, cb) {
			cb(null, { fieldName: file.fieldname })
		},
		key: function(req, file, cb) {
			cb(null, Date.now().toString() + "-" + file.originalname)
		},
	}),
	// Add the boundary option
	limits: {
		fieldNameSize: 100,
		fieldSize: 100 * 1024 * 1024,
		fields: 10,
		fileSize: 5000000,
		files: 5,
		parts: 15,
		headerPairs: 100,
		// Randomly generated UUID
		boundary: "media-submit-boundary-eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
	},
})

subRoutes.post("/", auth, upload.array("files"), async (req, res) => {
	console.log("req.body", req.body)
	console.log(req.files)
	res.send({ message: "Hello World!" })
})

module.exports = { subRoutes }
