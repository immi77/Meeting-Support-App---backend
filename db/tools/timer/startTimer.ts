import { WithId, Document } from "mongodb"
import { collections } from "../../mongodb-client"
import { Timer } from "../../interfaces"

export async function startTimer(timer: Timer): Promise<WithId<Document>> {

    const meetingId = timer.meetingId

    // redundant information
    delete timer.meetingId

    return (await collections.meetings.findOneAndUpdate(
        { _id: meetingId },
        { $set: { timer: timer } },
        { returnDocument: "after" }
    )).value
}