declare const addContact: ({ phone, name }: {
    phone: string;
    name: string;
}) => Promise<import("@unlimited/smartapp-bridge/build/main/types/eventEmitter").EmitterEventPayload | undefined>;
declare const getContact: ({ phone }: {
    phone: string;
}) => Promise<import("@unlimited/smartapp-bridge/build/main/types/eventEmitter").EmitterEventPayload | undefined>;
declare const createPersonalChat: ({ huid }: {
    huid: string;
}) => Promise<import("@unlimited/smartapp-bridge/build/main/types/eventEmitter").EmitterEventPayload | undefined>;
export { addContact, getContact, createPersonalChat, };
