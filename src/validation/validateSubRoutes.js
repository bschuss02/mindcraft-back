const Joi = require("joi")

function validateNewSub(subInfo) {
	const schema = Joi.object({
		competitionId: Joi.string().required(),
		description: Joi.string()
			.required()
			.max(2000),
		acceptedTerms: Joi.equal(true).required(),
		hideSubmission: Joi.boolean().required(),
	})
	return schema.validate(subInfo)
}

module.exports = { validateNewSub }
