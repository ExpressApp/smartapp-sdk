declare const routingChanged: (isRoot: boolean) => Promise<import("@unlimited/smartapp-bridge/build/main/types/eventEmitter").EmitterEventPayload | undefined>;
declare const onBackPressed: (handleBackPressed: Function) => Promise<void | undefined>;
export { routingChanged, onBackPressed, };
