declare const routingChanged: (isRoot: boolean) => Promise<import("@expressms/smartapp-bridge/build/main/types/eventEmitter").EmitterEventPayload> | undefined;
declare const onBackPressed: (handleBackPressed: Function) => void | undefined;
declare const openSmartApp: (appId: string, meta?: any) => Promise<import("@expressms/smartapp-bridge/build/main/types/eventEmitter").EmitterEventPayload> | undefined;
declare const onMoveToRoot: (handleMoveToRoot: Function) => void | undefined;
declare const exitSmartAppToCatalog: () => Promise<import("@expressms/smartapp-bridge/build/main/types/eventEmitter").EmitterEventPayload> | undefined;
export { routingChanged, onBackPressed, openSmartApp, onMoveToRoot, exitSmartAppToCatalog, };
