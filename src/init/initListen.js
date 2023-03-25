const logger = require("../logger/logger")

function initListen(app) {
	let port = process.env.PORT || 3000
	app.listen(port, () => {
		logger.info(`Server is running on port ${port}`)
	})
}

module.exports = { initListen }
