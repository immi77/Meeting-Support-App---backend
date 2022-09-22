const Joi = require("joi-oid")

export const leaveMeetingSchema = Joi.object({
    meetingId: Joi.string().hex().length(24).required(),
    memberId: Joi.string().hex().length(24).required(),
})