const express = require("express")
const multer = require("multer")

function initMiddleware(app) {
	app.use(express.json())
}

module.exports = { initMiddleware }
