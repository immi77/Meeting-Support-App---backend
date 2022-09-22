import { Member } from "../interfaces"
import { ObjectId, Document, WithId } from "mongodb"
import { collections } from "../mongodb-client"

export async function joinMeeting(meetingId: ObjectId, member: Member): Promise<WithId<Document>> {

    const result = await collections.meetings.updateOne(
        { _id: meetingId },
        { $push: { members: member } }
    )

    if (result.modifiedCount > 0) {
        return await collections.meetings.findOne({ _id: meetingId })
    }

    return undefined
}