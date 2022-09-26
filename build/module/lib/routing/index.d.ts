declare const routingChanged: (isRoot: boolean) => Promise<import("@expressms/smartapp-bridge/build/main/types/eventEmitter").EmitterEventPayload | undefined>;
declare const onBackPressed: (handleBackPressed: Function) => Promise<void | undefined>;
declare const openSmartApp: (appId: string, meta?: never) => Promise<import("@expressms/smartapp-bridge/build/main/types/eventEmitter").EmitterEventPayload | undefined>;
declare const exitSmartAppToCatalog: () => Promise<import("@expressms/smartapp-bridge/build/main/types/eventEmitter").EmitterEventPayload | undefined>;
export { routingChanged, onBackPressed, openSmartApp, exitSmartAppToCatalog, };
