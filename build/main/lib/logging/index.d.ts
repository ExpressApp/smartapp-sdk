declare type BridgeResponse = {
    payload: {
        logsEnabled: boolean;
    };
};
declare const ready: (timeout?: number | undefined) => Promise<BridgeResponse>;
export { ready };
