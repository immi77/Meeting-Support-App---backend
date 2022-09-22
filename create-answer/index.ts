import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { ObjectId } from "mongodb"
import { addAnswer } from "../db"
import { createAnswerSchema } from "../schemas"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    const answer = {
        id: new ObjectId(),
        meetingId: req.body?.meetingId?.trim(),
        surveyId: req.body?.surveyId?.trim(),
        creatorName: req.body?.creatorName?.trim() ?? "",
        createdAt: new Date(),
        choices: req.body?.choices?.map(x => x.trim()) ?? []
    }

    const result = createAnswerSchema.validate(answer)
    if (result.error) {
        context.res = {
            status: 422,
            body: result.error.details.map(x => x.message)
        }
        return
    }

    answer.meetingId = new ObjectId(answer.meetingId)
    answer.surveyId = new ObjectId(answer.surveyId)

    const meeting = await addAnswer(answer)
    if (meeting) {
        context.res = {
            status: 200,
            body: meeting
        }
    } else {
        context.res = {
            status: 400,
            body: "invalid meeting or survey id"
        }
    }
}

export default httpTrigger