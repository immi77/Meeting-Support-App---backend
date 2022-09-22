const Joi = require("joi-oid")

export const createSurveySchema = Joi.object({
    id: Joi.objectId().required(),
    meetingId: Joi.string().hex().length(24).required(),
    question: Joi.string().max(300).required(),
    choices: Joi.array().items(Joi.string().max(300)).required(),
    answers: Joi.array().required()
})