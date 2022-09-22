import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { leaveMeeting } from "../db"
import { ObjectId } from "mongodb"
import { leaveMeetingSchema } from "../schemas"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    const leave = {
        meetingId: req.body?.meetingId?.trim(),
        memberId: req.body?.memberId?.trim()
    }

    const result = leaveMeetingSchema.validate(leave)
    if (result.error) {
        context.res = {
            status: 422,
            body: result.error.details.map(x => x.message)
        }
        return
    }

    const meeting = await leaveMeeting(new ObjectId(leave.meetingId), new ObjectId(leave.memberId))
    if (meeting) {
        context.res = {
            status: 200,
            body: meeting
        }
    } else {
        context.res = {
            status: 400,
            body: "invalid meeting or member id"
        }
    }
}

export default httpTrigger