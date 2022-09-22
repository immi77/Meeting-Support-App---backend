const Joi = require("joi-oid")

export const joinMeetingSchema = Joi.object({
    meetingId: Joi.string().hex().length(24).required(),
    memberName: Joi.string().min(2).max(30).required()
})