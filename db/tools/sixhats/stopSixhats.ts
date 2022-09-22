import { ObjectId, WithId, Document } from "mongodb"
import { collections } from "../../mongodb-client"

export async function stopSixhats(meetingId: ObjectId): Promise<WithId<Document>> {

    return (await collections.meetings.findOneAndUpdate(
        { _id: meetingId },
        { $set: { "members.$[].hat": "" } },
        { returnDocument: "after" }
    )).value
}