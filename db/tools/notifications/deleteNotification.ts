import { ObjectId, WithId, Document } from "mongodb"
import { collections } from "../../mongodb-client"

export async function deleteNotification(meetingId: ObjectId, receiverId: ObjectId, notificationId: ObjectId): Promise<WithId<Document>> {
    
    const result = await collections.meetings.updateOne(
        { _id: meetingId },
        { $pull: { "members.$[elem].notifications": { id: notificationId } } },
        { arrayFilters: [{ "elem.id": receiverId }] }
    )

    if (result.modifiedCount > 0)
        return await collections.meetings.findOne({ _id: meetingId })

    return undefined
}