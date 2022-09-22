import { Meeting } from "../interfaces"
import { collections } from "../mongodb-client"

export async function addMeeting(newMeeting: Meeting): Promise<Meeting> {

    const result = await collections.meetings.insertOne(newMeeting)
    if (result.acknowledged) {
        return newMeeting
    } else {
        throw Error("could not add meeting")
    }
}