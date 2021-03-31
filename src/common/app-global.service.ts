import { Response, ResponseHelper } from "../clases/reponse.class";

// Respose
export function getResponse(response: any): any {
    if (response) {
        response = ResponseHelper.transformData(response)
        if (response.messages.length > 0) {
            for (const messageResponse of response.messages) {
                globalThis.pushToast(messageResponse.message);
            }
        }
        return response.valid ? response.data : [];
    } else {
        return [];
        globalThis.pushToast('General Application Error');
    }
}