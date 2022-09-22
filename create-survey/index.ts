import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { ObjectId } from "mongodb"
import { addSurvey } from "../db"
import { createSurveySchema } from "../schemas"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    const survey = {
        id: new ObjectId(),
        meetingId: req.body?.meetingId?.trim(),
        question: req.body?.question?.trim() ?? "",
        choices: req.body?.choices?.map(x => x.trim()) ?? [],
        answers: []
    }

    const result = createSurveySchema.validate(survey)
    if (result.error) {
        context.res = {
            status: 422,
            body: result.error.details.map(x => x.message)
        }
        return
    }

    survey.meetingId = new ObjectId(survey.meetingId)

    const meeting = await addSurvey(survey)
    if (meeting) {
        context.res = {
            status: 200,
            body: meeting
        }
    } else {
        context.res = {
            status: 400,
            body: "no meeting with this id"
        }
    }
}

export default httpTrigger