const mongoose = require("mongoose")
const config = require("config")
const logger = require("../logger/logger")

function initDB() {
	const db = config.get("db")
	mongoose
		.connect(db)
		.then(() => logger.info(`Connected to db...`))
		.catch((e) => logger.error("Failed to connect to db", e))
}

module.exports = { initDB }
