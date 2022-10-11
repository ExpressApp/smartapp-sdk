import { SendMessageMethodParams } from "../../types/contacts";
/**
 * @param phone
 * @param name
 */
declare const addContact: ({ phone, name }: {
    phone: string;
    name: string;
}) => Promise<import("@expressms/smartapp-bridge/build/main/types/eventEmitter").EmitterEventPayload> | undefined;
/**
 * @param phone
 */
declare const getContact: ({ phone }: {
    phone: string;
}) => Promise<import("@expressms/smartapp-bridge/build/main/types/eventEmitter").EmitterEventPayload | undefined>;
/**
 * @param huid
 */
declare const createPersonalChat: ({ huid }: {
    huid: string;
}) => Promise<import("@expressms/smartapp-bridge/build/main/types/eventEmitter").EmitterEventPayload> | undefined;
/**
 * @param userHuid
 * @param groupChatId
 * @param messageBody
 * @param messageMeta
 */
declare const sendMessage: ({ userHuid, groupChatId, messageBody, messageMeta, }: SendMessageMethodParams) => Promise<import("@expressms/smartapp-bridge/build/main/types/eventEmitter").EmitterEventPayload> | undefined;
export { addContact, getContact, createPersonalChat, sendMessage, };
