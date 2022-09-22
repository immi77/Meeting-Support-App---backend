const Joi = require("joi-oid")

export const stopTimerSchema = Joi.string().hex().length(24).required()