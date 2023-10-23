import { CreateDeeplinkResponse, File, GetConnectionStatusResponse } from '../../types';
export * from './events';
declare const openClientSettings: () => Promise<import("@expressms/smartapp-bridge/build/main/types/eventEmitter").EmitterEventPayload> | undefined;
declare const getChats: ({ filter }: {
    filter: string | null;
}) => Promise<import("@expressms/smartapp-bridge/build/main/types/eventEmitter").EmitterEventPayload> | undefined;
declare const searchCorporatePhonebook: ({ filter }: {
    filter: string | null;
}) => Promise<import("@expressms/smartapp-bridge/build/main/types/eventEmitter").EmitterEventPayload> | undefined;
declare const openGroupChat: ({ groupChatId }: {
    groupChatId: string;
}) => Promise<import("@expressms/smartapp-bridge/build/main/types/eventEmitter").EmitterEventPayload> | undefined;
declare const openFile: (file: File) => Promise<import("@expressms/smartapp-bridge/build/main/types/eventEmitter").EmitterEventPayload> | undefined;
declare const sendBotCommand: ({ userHuid, body, data, }: {
    userHuid: string;
    body: string;
    data: {
        command: string;
    } | null;
}) => Promise<import("@expressms/smartapp-bridge/build/main/types/eventEmitter").EmitterEventPayload> | undefined;
declare const requestLocation: () => Promise<import("@expressms/smartapp-bridge/build/main/types/eventEmitter").EmitterEventPayload> | undefined;
/**
 * Get client current connection status. It's based on client's WebSocket connection state.
 * @returns Promise that'll be fullfilled with status data on success, otherwise rejected with reason
 */
declare const getConnectionStatus: () => Promise<GetConnectionStatusResponse>;
/**
 * Create deeplink URL to open SmartApp
 * @param appId ID of SmartApp
 * @param meta Array of params to be included in deeplink
 * @returns Promise that'll be fullfilled with deeplink data on success, otherwise rejected with reason
 */
declare const createDeeplink: (appId: string, meta: Array<{
    key: string;
    value: null | boolean | string | number;
}>) => Promise<CreateDeeplinkResponse>;
export { openClientSettings, getChats, searchCorporatePhonebook, openGroupChat, sendBotCommand, requestLocation, openFile, getConnectionStatus, createDeeplink, };
