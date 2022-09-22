import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { ObjectId } from "mongodb"
import { addNotification } from "../db"
import { createNotificationSchema } from "../schemas"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    const notification = {
        id: new ObjectId(),
        meetingId: req.body?.meetingId?.trim(),
        receiverId: req.body?.receiverId?.trim(),
        createdAt: new Date(),
        message: req.body?.message?.trim() ?? ""
    }

    const result = createNotificationSchema.validate(notification)
    if (result.error) {
        context.res = {
            status: 422,
            body: result.error.details.map(x => x.message)
        }
        return
    }

    notification.meetingId = new ObjectId(notification.meetingId)
    notification.receiverId = new ObjectId(notification.receiverId)

    const meeting = await addNotification(notification)
    if (meeting) {
        context.res = {
            status: 200,
            body: meeting
        }
    } else {
        context.res = {
            status: 400,
            body: "invalid meeting or receiver id"
        }
    }
}

export default httpTrigger