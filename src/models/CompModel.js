const mongoose = require("mongoose")

const compSchema = new mongoose.Schema(
	{
		organizer: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		coverImage: {
			type: String,
			default: "https://picsum.photos/200/200",
		},
		title: {
			type: String,
			required: true,
			trim: true,
		},
		subtitle: {
			type: String,
			required: true,
			trim: true,
		},
		overview: {
			type: String,
			required: true,
			trim: true,
		},
		prizeMoney: {
			type: Number,
			required: true,
		},
		deadline: {
			type: Date,
			required: true,
		},
		rules: {
			type: String,
			required: true,
			trim: true,
		},
		resources: {
			type: String,
			required: true,
			trim: true,
		},
		subs: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: "Sub",
			default: [],
		},
	},
	{ timestamps: true },
)

const Comp = mongoose.model("Comp", compSchema)

module.exports = { Comp }
