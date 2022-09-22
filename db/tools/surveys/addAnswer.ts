import { WithId, Document } from "mongodb"
import { collections } from "../../mongodb-client"
import { Answer } from "../../interfaces"

export async function addAnswer(answer: Answer): Promise<WithId<Document>> {

    const meetingId = answer.meetingId
    const surveyId = answer.surveyId

    // redundant information
    delete answer.meetingId
    delete answer.surveyId

    return (await collections.meetings.findOneAndUpdate(
        { _id: meetingId, "surveys.id": surveyId },
        { $push: { "surveys.$.answers": answer } } as any,
        { returnDocument: "after" }
    )).value
}