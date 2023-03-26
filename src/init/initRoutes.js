const testingRoutes = require("../routes/testingRoutes")
const authRoutes = require("../routes/authRoutes")
const { startupRouter } = require("../routes/startupRoutes")
const { compRouter } = require("../routes/compRoutes")

function initRoutes(app) {
	app.use("/", testingRoutes)
	app.use("/auth", authRoutes)
	app.use("/startup", startupRouter)
	app.use("/comps", compRouter)
}

module.exports = { initRoutes }
