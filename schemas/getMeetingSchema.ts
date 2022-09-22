const Joi = require("joi-oid")

export const getMeetingSchema = Joi.string().hex().length(24).required()