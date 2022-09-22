const Joi = require("joi-oid")

export const deleteNotificationSchema = Joi.object({
    meetingId: Joi.string().hex().length(24).required(),
    receiverId: Joi.string().hex().length(24).required(),
    notificationId: Joi.string().hex().length(24).required()
})