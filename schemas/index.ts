// meetings
import { createMeetingSchema } from "./createMeetingSchema"
import { getMeetingSchema } from "./getMeetingSchema"
import { joinMeetingSchema } from "./joinMeetingSchema"
import { leaveMeetingSchema } from "./leaveMeetingSchema"

// notifications
import { createNotificationSchema } from "./createNotificationSchema"
import { deleteNotificationSchema } from "./deleteNotificationSchema"

// sixhats
import { startSixhatsSchema } from "./startSixhatsSchema"
import { stopSixhatsSchema } from "./stopSixhatsSchema"

// surveys
import { createSurveySchema } from "./createSurveySchema"
import { createAnswerSchema } from "./createAnswerSchema"

// timer
import { startTimerSchema } from "./startTimerSchema"
import { stopTimerSchema } from "./stopTimerSchema"

export {
    createMeetingSchema,
    getMeetingSchema,
    joinMeetingSchema,
    leaveMeetingSchema,

    createNotificationSchema,
    deleteNotificationSchema,

    startSixhatsSchema,
    stopSixhatsSchema,

    createSurveySchema,
    createAnswerSchema,

    startTimerSchema,
    stopTimerSchema
}