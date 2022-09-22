const Joi = require("joi-oid")

export const createAnswerSchema = Joi.object({
    id: Joi.objectId().required(),
    meetingId: Joi.string().hex().length(24).required(),
    surveyId: Joi.string().hex().length(24).required(),
    creatorName: Joi.string().max(100).required(),
    createdAt: Joi.date().required(),
    choices: Joi.array().items(Joi.string().max(300)).required()
})