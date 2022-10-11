declare const openClientSettings: () => Promise<import("@expressms/smartapp-bridge/build/main/types/eventEmitter").EmitterEventPayload> | undefined;
/**
 * @param filter
 */
declare const getChats: ({ filter }: {
    filter: string | null;
}) => Promise<import("@expressms/smartapp-bridge/build/main/types/eventEmitter").EmitterEventPayload> | undefined;
export { openClientSettings, getChats, };
