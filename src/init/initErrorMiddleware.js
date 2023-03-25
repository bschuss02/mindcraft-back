const asyncErrorHandler = require("../middleware/errorMiddleware")

function initErrorMiddleware(app) {
	app.use(asyncErrorHandler)
}

module.exports = { initErrorMiddleware }
