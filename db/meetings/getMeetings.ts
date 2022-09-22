import { Meeting } from "../interfaces"
import { collections } from "../mongodb-client"

export async function getMeetings(): Promise<Meeting[]> {

    return (await collections.meetings.find({}).toArray()) as unknown as Meeting[]
}