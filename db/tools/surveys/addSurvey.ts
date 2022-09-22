import { collections } from "../../mongodb-client"
import { Survey } from "../../interfaces"
import { WithId, Document } from "mongodb"

export async function addSurvey(survey: Survey): Promise<WithId<Document>> {

    const meetingId = survey.meetingId

    // redundant information
    delete survey.meetingId

    return (await collections.meetings.findOneAndUpdate(
        { _id: meetingId },
        { $push: { surveys: survey } } as any,
        { returnDocument: "after" }
    )).value
}