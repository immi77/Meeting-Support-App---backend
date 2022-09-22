import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { deleteNotification } from "../db"
import { ObjectId } from "mongodb"
import { deleteNotificationSchema } from "../schemas"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    const deletion = {
        meetingId: req.body?.meetingId?.trim(),
        receiverId: req.body?.receiverId?.trim(),
        notificationId: req.body?.notificationId?.trim()
    }

    const result = deleteNotificationSchema.validate(deletion)
    if (result.error) {
        context.res = {
            status: 422,
            body: result.error.details.map(x => x.message)
        }
        return
    }

    const meeting = await deleteNotification(new ObjectId(deletion.meetingId), new ObjectId(deletion.receiverId), new ObjectId(deletion.notificationId))
    if (meeting) {
        context.res = {
            status: 200,
            body: meeting
        }
    } else {
        context.res = {
            status: 400,
            body: "invalid meeting, receiver or notification id"
        }
    }
}

export default httpTrigger