import { ObjectId } from "mongodb"

export interface Member {
    id: ObjectId;
    name: string;
    hat?: string;
    notifications?: Array<Notification>;
}

export interface Meeting {
    creator: Member;
    createdAt: Date;
    members: Array<Member>;
    timer: Timer;
}

export interface Timer {
    meetingId?: ObjectId;
    active: boolean;
    time: number;
}

export interface Notification {
    id: ObjectId;
    meetingId?: ObjectId;
    receiverId?: ObjectId;
    createdAt: Date;
    message: string;
}

export interface Survey {
    id: ObjectId;
    meetingId?: ObjectId;
    question: string;
    choices: Array<string>;
    answers: Array<Answer>;
}

export interface Answer {
    id: ObjectId;
    meetingId?: ObjectId;
    surveyId?: ObjectId;
    creatorName: string;
    createdAt: Date;
    choices: Array<string>;
}