import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { ObjectId } from "mongodb"
import { joinMeeting } from "../db"
import { joinMeetingSchema } from "../schemas"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    const join = {
        meetingId: req.body?.meetingId?.trim(),
        memberName: req.body?.memberName?.trim()
    }

    const result = joinMeetingSchema.validate(join)
    if (result.error) {
        context.res = {
            status: 422,
            body: result.error.details.map(x => x.message)
        }
        return
    }

    const member = {
        id: new ObjectId(),
        name: join.memberName
    }

    const meeting = await joinMeeting(new ObjectId(join.meetingId), member)
    if (meeting) {
        context.res = {
            status: 200,
            body: meeting
        }
    } else {
        context.res = {
            status: 400,
            body: "no meeting with this id"
        }
    }
}

export default httpTrigger