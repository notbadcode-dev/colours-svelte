import type { MessageResponse } from "./message.class";

export class Response {
    constructor(
        public data: any,
        public messages: MessageResponse[],
        public onlyOneMessage: boolean,
        public sameTypeMessages: boolean,
        public valid: boolean,
    ) { }
}

export class TransformResponse {
    constructor(
        public data: any[],
        public valid: boolean,
    ) {}
}

export class ResponseHelper {
    static transformData(reponse: Response): Response {
        return  {
            data: reponse.data,
            messages: reponse.messages,
            onlyOneMessage: reponse.messages.length > 0 && reponse.messages.length === 1,
            sameTypeMessages: reponse.messages.filter((messageType, i, arr) => arr.findIndex(t => t === messageType) === i).length === 1,
            valid: this.dataIsValid(reponse.data)
        }
    }

    static dataIsValid(data: any): boolean {
        if (data && typeof data === 'boolean') {
            return data;
        } else {
            if (data.length > 0) {
                return true;
            }
        }
    }
}