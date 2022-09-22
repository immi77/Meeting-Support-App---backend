const Joi = require("joi-oid")

export const startSixhatsSchema = Joi.string().hex().length(24).required()