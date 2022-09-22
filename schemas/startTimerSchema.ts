const Joi = require("joi-oid")

export const startTimerSchema = Joi.object({
    meetingId: Joi.string().hex().length(24).required(),
    active: Joi.boolean().required(),
    time: Joi.number().required()
})