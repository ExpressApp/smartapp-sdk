export enum SubscriptionEventType {
  CONNECTION_STATUS = "connection_status",
}

export type GetConnectionStatusResponse = ({
  ref: string,
  payload: {
    connectionStatus: "connected" | "disconnected",
  }
})

export type CreateDeeplinkResponse = ({
  ref: string,
  payload: {
    status: 'error' | 'success',
    errorCode?: string,
    data?: {
      deeplink: string,
    }
  }
})