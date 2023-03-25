const Joi = require("joi")

function validateNewUser(userInfo) {
	const schema = Joi.object({
		username: Joi.string()
			.max(100)
			.required(),
		password: Joi.string()
			.max(100)
			.required(),
		expoPushToken: Joi.string()
			.max(1000)
			.allow(""),
		spotifyApiKey: Joi.string().max(1000),
		spotifyApiKeyExpirationDate: Joi.date(),
		spotifyApiKeyRefreshToken: Joi.string().max(1000),
	}).required()
	return schema.validate(userInfo)
}

function validateLogin(loginInfo) {
	const schema = Joi.object({
		username: Joi.string()
			.max(100)
			.required(),
		password: Joi.string()
			.max(100)
			.required(),
	}).required()
	return schema.validate(loginInfo)
}

module.exports = { validateNewUser, validateLogin }
