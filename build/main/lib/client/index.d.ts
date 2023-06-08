declare const openClientSettings: () => Promise<import("@expressms/smartapp-bridge/build/main/types/eventEmitter").EmitterEventPayload> | undefined;
declare const getChats: ({ filter }: {
    filter: string | null;
}) => Promise<import("@expressms/smartapp-bridge/build/main/types/eventEmitter").EmitterEventPayload> | undefined;
declare const requestGeolocation: () => Promise<import("@expressms/smartapp-bridge/build/main/types/eventEmitter").EmitterEventPayload> | undefined;
declare const searchCorporatePhonebook: ({ filter }: {
    filter: string | null;
}) => Promise<import("@expressms/smartapp-bridge/build/main/types/eventEmitter").EmitterEventPayload> | undefined;
declare const openGroupChat: ({ groupChatId }: {
    groupChatId: string;
}) => Promise<import("@expressms/smartapp-bridge/build/main/types/eventEmitter").EmitterEventPayload> | undefined;
declare const sendBotCommand: ({ userHuid, body, data }: {
    userHuid: string;
    body: string;
    data: {
        command: string;
    } | null;
}) => Promise<import("@expressms/smartapp-bridge/build/main/types/eventEmitter").EmitterEventPayload> | undefined;
export { openClientSettings, getChats, requestGeolocation, searchCorporatePhonebook, sendBotCommand, openGroupChat, };
