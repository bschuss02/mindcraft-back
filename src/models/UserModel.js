const mongoose = require("mongoose")
const config = require("config")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
		},
		pfp: {
			type: String,
			default: "https://i.imgur.com/V4RclNb.png",
			required: true,
		},
	},
	{ timestamps: true },
)

userSchema.methods.generateAuthToken = function generateAuthToken() {
	const token = jwt.sign(
		{
			_id: this._id,
			username: this.username,
		},
		config.get("jwtPrivateKey"),
	)
	return token
}

const User = mongoose.model("User", userSchema)

module.exports = { User }
