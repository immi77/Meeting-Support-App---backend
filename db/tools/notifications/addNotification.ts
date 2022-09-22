import { collections } from "../../mongodb-client"
import { Notification } from "../../interfaces"
import { WithId, Document } from "mongodb"

export async function addNotification(notification: Notification): Promise<WithId<Document>> {

    const meetingId = notification.meetingId
    const receiverId = notification.receiverId

    // redundant information
    delete notification.meetingId
    delete notification.receiverId
    
    const result = await collections.meetings.updateOne(
        { _id: meetingId, "members.id": receiverId },
        { $push: { "members.$.notifications": notification } }
    )

    if (result.modifiedCount > 0)
        return await collections.meetings.findOne({ _id : meetingId })

    return undefined
}