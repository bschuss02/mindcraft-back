const mongoose = require("mongoose")

const fileSchema = new mongoose.Schema(
	{
		originalFileName: {
			type: String,
			required: true,
			max: 2000,
		},
		fileName: {
			type: String,
			required: true,
			max: 2000,
		},
		mimeType: {
			type: String,
			required: true,
			max: 2000,
		},
		size: {
			type: Number,
			required: true,
		},
		uri: {
			type: String,
			required: true,
			max: 2000,
		},
	},
	{ timestamps: true },
)

function arrayMinLength(val) {
	return val.length > 0
}

const subSchema = new mongoose.Schema({
	competition: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Comp",
		required: true,
	},
	creator: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	files: {
		type: [fileSchema],
		required: true,
		validate: [arrayMinLength, "Files array cannot be empty"],
	},
	description: {
		type: String,
		required: true,
		max: 2000,
	},
	isPublic: {
		type: Boolean,
		required: true,
	},
	result: {
		type: String,
		default: "underReview",
		max: 2000,
	},
})

const Sub = mongoose.model("Sub", subSchema)

module.exports = { Sub }
