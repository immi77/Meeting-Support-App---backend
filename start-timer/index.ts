import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { ObjectId } from "mongodb"
import { startTimer } from "../db"
import { startTimerSchema } from "../schemas"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    
    const timer = {
        meetingId: req.body?.meetingId?.trim(),
        active: true,
        time: req.body?.time
    }

    const result = startTimerSchema.validate(timer)
    if (result.error) {
        context.res = {
            status: 422,
            body: result.error.details.map(x => x.message)
        }
        return
    }

    timer.meetingId = new ObjectId(timer.meetingId)

    const meeting = await startTimer(timer)
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