const config = require("config")

function checkConfigs() {
	const db = config.get("db")
	if (!db) {
		throw new Error("FATAL ERROR: db is not defined.")
	}
	const jwtPrivateKey = config.get("jwtPrivateKey")
	if (!jwtPrivateKey) {
		throw new Error("FATAL ERROR: jwtPrivateKey is not defined.")
	}
	const aws_id = config.get("aws_id")
	if (!aws_id) {
		throw new Error("FATAL ERROR: aws_id is not defined.")
	}
	const aws_secret = config.get("aws_secret")
	if (!aws_secret) {
		throw new Error("FATAL ERROR: aws_secret is not defined.")
	}
	const aws_bucket_name = config.get("aws_bucket_name")
	if (!aws_bucket_name) {
		throw new Error("FATAL ERROR: aws_bucket_name is not defined.")
	}
}

module.exports = { checkConfigs }
