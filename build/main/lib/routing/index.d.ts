/**
 * @param isRoot
 */
declare const routingChanged: (isRoot: boolean) => Promise<import("@expressms/smartapp-bridge/build/main/types/eventEmitter").EmitterEventPayload> | undefined;
/**
 * @param handleBackPressed
 */
declare const onBackPressed: (handleBackPressed: Function) => void | undefined;
/**
 * @param appId
 * @param meta
 */
declare const openSmartApp: (appId: string, meta?: any) => Promise<import("@expressms/smartapp-bridge/build/main/types/eventEmitter").EmitterEventPayload> | undefined;
declare const exitSmartAppToCatalog: () => Promise<import("@expressms/smartapp-bridge/build/main/types/eventEmitter").EmitterEventPayload> | undefined;
export { routingChanged, onBackPressed, openSmartApp, exitSmartAppToCatalog, };
