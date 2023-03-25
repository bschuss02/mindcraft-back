const config = require("config")
const winston = require("winston")
require("winston-mongodb")
const { format } = winston
const { combine, timestamp, errors, printf, json } = format

const logger = winston.createLogger({
	level: "info",
	format: combine(timestamp(), json()),
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({ filename: "error.log", level: "error" }),
		new winston.transports.File({ filename: "combined.log" }),
		new winston.transports.MongoDB({
			db: config.get("db"),
			options: { useUnifiedTopology: true },
			collection: "logs",
			level: "error",
		}),
	],
})

module.exports = logger
