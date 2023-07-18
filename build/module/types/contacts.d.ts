import { EmitterEventPayload } from '@expressms/smartapp-bridge/build/main/types/eventEmitter';
export type SendMessageMethodParams = ({
    userHuid: string | null;
    groupChatId: string | null;
    messageBody: string;
    messageMeta?: {
        [key: string]: string | number;
    };
});
interface RequestSelfProfilePayload extends EmitterEventPayload {
    status: "success" | "error";
    error?: string;
    data: {
        userHuid: string;
        name: string;
        avatar: string | null;
        avatarPreview: string | null;
        company: string | null;
        department: string | null;
        office: string | null;
        manager: string | null;
        managerHuid: string | null;
        email: string | null;
        phone: string | null;
        description: string | null;
        otherPhone: string | null;
        ip_phone: string | null;
        otherIpPhone: string | null;
    };
}
export type RequestSelfProfileResponse = Promise<RequestSelfProfilePayload> | undefined;
export {};
