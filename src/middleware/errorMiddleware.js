const logger = require("../logger/logger")

function asyncErrorHandler(err, req, res, next) {
	console.error(err)
	logger.error(err.stack, { metadata: { user: req.user } })
	res.status(500).send("Something went wrong")
}

module.exports = asyncErrorHandler
