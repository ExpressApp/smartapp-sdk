/**
 * @param timeout
 */
declare const bridgeSendReady: (timeout?: number | undefined) => Promise<import("@expressms/smartapp-bridge/build/main/types/eventEmitter").EmitterEventPayload> | undefined;
export { bridgeSendReady, };
