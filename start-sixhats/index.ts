import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { ObjectId } from "mongodb"
import { startSixhats } from "../db"
import { startSixhatsSchema } from "../schemas"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    
    const id = req.body?.meetingId?.trim()

    const result = startSixhatsSchema.validate(id)
    if (result.error) {
        context.res = {
            status: 422,
            body: result.error.details.map(x => x.message)
        }
        return
    }

    const meeting = await startSixhats(new ObjectId(id))
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