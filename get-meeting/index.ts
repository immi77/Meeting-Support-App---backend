import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { ObjectId } from "mongodb"
import { getMeeting } from "../db"
import { getMeetingSchema } from "../schemas"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    
    const id = req.params?.meetingId?.trim()
        
    const result = getMeetingSchema.validate(id)
    if (result.error) {
        context.res = {
            status: 422,
            body: result.error.details.map(x => x.message)
        }
        return
    }

    const meeting = await getMeeting(new ObjectId(id))
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