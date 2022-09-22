import { ObjectId, WithId, Document } from "mongodb"
import { collections } from "../../mongodb-client"

export async function startSixhats(meetingId: ObjectId): Promise<WithId<Document>> {

    const meeting = await collections.meetings.findOne({ _id: meetingId })
    if (!meeting)
        return undefined

    addHats(meeting)

    await collections.meetings.updateOne(
        { _id: meetingId },
        { $set: { members: meeting.members } }
    )

    return meeting
}

function addHats(meeting) {

    const members = meeting.members

    let hats = ["red", "white", "green", "blue", "yellow", "black"]

    for (let member of members) {
        if (hats.length < 1)
            hats = ["red", "white", "green", "blue", "yellow", "black"]
        
        member.hat = hats.splice(Math.floor(Math.random() * hats.length), 1)[0]
    }
}