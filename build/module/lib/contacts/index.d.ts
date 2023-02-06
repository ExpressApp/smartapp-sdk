import { SendMessageMethodParams } from "../../types/contacts";
declare const addContact: ({ phone, name }: {
    phone: string;
    name: string;
}) => Promise<import("@expressms/smartapp-bridge/build/main/types/eventEmitter").EmitterEventPayload> | undefined;
declare const getContact: ({ phone }: {
    phone: string;
}) => Promise<import("@expressms/smartapp-bridge/build/main/types/eventEmitter").EmitterEventPayload | undefined>;
declare const createPersonalChat: ({ huid }: {
    huid: string;
}) => Promise<import("@expressms/smartapp-bridge/build/main/types/eventEmitter").EmitterEventPayload> | undefined;
declare const sendMessage: ({ userHuid, groupChatId, messageBody, messageMeta, }: SendMessageMethodParams) => Promise<import("@expressms/smartapp-bridge/build/main/types/eventEmitter").EmitterEventPayload> | undefined;
export { addContact, getContact, createPersonalChat, sendMessage, };
