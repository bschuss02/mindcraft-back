const testingRoutes = require("../routes/testingRoutes")
const authRoutes = require("../routes/authRoutes")
const { startupRouter } = require("../routes/startupRoutes")

function initRoutes(app) {
	app.use("/", testingRoutes)
	app.use("/auth", authRoutes)
	app.use("/startup", startupRouter)
}

module.exports = { initRoutes }
