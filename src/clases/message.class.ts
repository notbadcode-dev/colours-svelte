import type { MessageType } from "../enums/enums.global";

export class MessageResponse {
    constructor(
        public message: string,
        public messageType: MessageType,
    ) { }
}