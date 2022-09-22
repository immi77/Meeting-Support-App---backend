import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { clearMeetings } from "../db"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    
    if (req.body?.topSecret?.trim() !== "1234") {
        context.res = {
            status: 403
        }
        return
    }

    await clearMeetings()
    context.res = {
        status: 200,
        body: "done"
    }
}

export default httpTrigger