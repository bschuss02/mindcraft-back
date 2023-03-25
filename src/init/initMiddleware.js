const express = require("express")

function initMiddleware(app) {
	app.use(express.json())
}

module.exports = { initMiddleware }
