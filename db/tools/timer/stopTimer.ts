import { ObjectId, WithId, Document } from "mongodb"
import { collections } from "../../mongodb-client"

export async function stopTimer(meetingId: ObjectId): Promise<WithId<Document>> {

    return (await collections.meetings.findOneAndUpdate(
        { _id: meetingId },
        { $set: { timer: { active: false, time: 0 } } },
        { returnDocument: "after"}
    )).value
}