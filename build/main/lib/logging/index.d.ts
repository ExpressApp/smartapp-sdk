declare type BridgeResponse = {
    payload: {
        logsEnabled: boolean;
    };
};
declare const ready: (timeout?: number) => Promise<BridgeResponse>;
export { ready };
