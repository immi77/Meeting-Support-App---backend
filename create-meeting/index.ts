import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { ObjectId } from "mongodb"
import { addMeeting } from "../db"
import { createMeetingSchema } from "../schemas"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    const creator = {
        id: new ObjectId(),
        name: req.body?.creatorName?.trim()
    }
    const timer = {
        active: false,
        time: 0
    }

    const newMeeting = {
        creator: creator,
        createdAt: new Date(),
        members: [creator],
        timer: timer
    }

    const result = createMeetingSchema.validate(newMeeting)
    if (result.error) {
        context.res = {
            status: 422,
            body: result.error.details.map(x => x.message)
        }
        return
    }

    const meeting = await addMeeting(newMeeting)
    context.res = {
        status: 200,
        body: meeting
    }
}

export default httpTrigger