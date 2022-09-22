const Joi = require("joi-oid")

export const createNotificationSchema = Joi.object({
    id: Joi.objectId().required(),
    meetingId: Joi.string().hex().length(24).required(),
    receiverId: Joi.string().hex().length(24).required(),
    createdAt: Joi.date().required(),
    message: Joi.string().max(100).required()
})