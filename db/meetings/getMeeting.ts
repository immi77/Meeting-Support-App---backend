import { ObjectId, WithId, Document } from "mongodb"
import { collections } from "../mongodb-client"

export async function getMeeting(meetingId: ObjectId): Promise<WithId<Document>> {

    return await collections.meetings.findOne({ _id: meetingId })
}