const Joi = require("joi-oid")

export const createMeetingSchema = Joi.object({
    creator: Joi.object({
        id: Joi.objectId().required(),
        name: Joi.string().min(2).max(30).required()
    }).required(),
    createdAt: Joi.date().required(),
    members: Joi.array().required(),
    timer: Joi.object().required()
})