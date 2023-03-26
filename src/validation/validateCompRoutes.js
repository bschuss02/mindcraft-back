const Joi = require("joi")

function validateNewComp(compInfo) {
	const schema = Joi.object({
		title: Joi.string()
			.required()
			.max(2000),
		subtitle: Joi.string()
			.required()
			.max(2000),
		overview: Joi.string()
			.required()
			.max(2000),
		prizeMoney: Joi.number().required(),
		deadline: Joi.date().required(),
		rules: Joi.string()
			.required()
			.max(2000),
		resources: Joi.string()
			.required()
			.max(2000),
		acceptedTerms: Joi.equal(true).required(),
	})
	return schema.validate(compInfo)
}

module.exports = { validateNewComp }