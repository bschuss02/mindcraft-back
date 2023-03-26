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

function validateDeleteSub(deleteSubInfo) {
	const schema = Joi.object({
		submissionId: Joi.string().required(),
		competitionId: Joi.string().required(),
	})
	return schema.validate(deleteSubInfo)
}

module.exports = { validateNewSub, validateDeleteSub }
