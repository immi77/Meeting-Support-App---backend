const Joi = require("joi-oid")

export const stopSixhatsSchema = Joi.string().hex().length(24).required()