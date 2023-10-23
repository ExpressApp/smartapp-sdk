export declare enum SubscriptionEventType {
    CONNECTION_STATUS = "connection_status"
}
export declare type GetConnectionStatusResponse = ({
    ref: string;
    payload: {
        connectionStatus: 'connected' | 'disconnected';
    };
});
export declare type CreateDeeplinkResponse = ({
    ref: string;
    payload: {
        status: 'error' | 'success';
        errorCode?: string;
        data?: {
            deeplink: string;
        };
    };
});
