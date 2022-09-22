import { ObjectId, WithId, Document } from "mongodb"
import { collections } from "../mongodb-client"

export async function leaveMeeting(meetingId: ObjectId, memberId: ObjectId): Promise<WithId<Document>> {

    const result = await collections.meetings.updateOne(
        { _id: meetingId },
        { $pull: { members: { id: memberId } } }
    )

    if (result.modifiedCount > 0) {
        await collections.meetings.deleteOne({ members: { $size: 0 } })

        return (await collections.meetings.findOne({ _id: meetingId }))
            || { _id: meetingId, meetingDeleted: "last member left" }
    }

    return undefined
}