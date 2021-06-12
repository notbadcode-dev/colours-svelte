import { Response, ResponseHelper } from "../clases/reponse.class";
import { MessageType } from "../enums/enums.global";
import { ToastTypeClass } from './general.enum';

// Respose
export function getResponse(response: any): any {
    if (response) {
        response = ResponseHelper.transformData(response)
        if (response.messages.length > 0) {
            for (const messageResponse of response.messages) {
                switch (messageResponse.messageType) {
                    case MessageType.info:
                        globalThis.pushInfoToast(messageResponse.message);
                        break;
                    case MessageType.success:
                        globalThis.pushSuccessToast(messageResponse.message);
                        break;
                    case MessageType.permission:
                        globalThis.pushWarningToast(messageResponse.message);
                        break;
                    case MessageType.warning:
                        globalThis.pushWarningToast(messageResponse.message);
                        break;
                    case MessageType.error:
                        globalThis.pushErrorToast(messageResponse.message);
                        break;
                    case MessageType.critical:
                        globalThis.pushCriticalToast(messageResponse.message);
                        break;
                    case MessageType.default:
                        globalThis.pushCriticalToast(messageResponse.message);
                        break;
                    default:
                        globalThis.pushToast(messageResponse.message);
                        break;
                }
            }
        }
        return response.valid ? response.data : [];
    } else {
        globalThis.pushErrorToast('General Application Error');
        return [];
    }
}