import { collections } from "../mongodb-client"

export async function clearMeetings(): Promise<void> {

    await collections.meetings.deleteMany({})
}