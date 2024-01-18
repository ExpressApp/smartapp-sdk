import bridge from "@expressms/smartapp-bridge"
import { METHODS } from "../../types"

const onNotification = async (handleNotification: Function) => {
  const response = await bridge?.sendClientEvent({
    method: METHODS.NOTIFICATION,
    params: {},
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return bridge?.onReceive((event: any) => {
    if (event?.type === METHODS.NOTIFICATION) {
      handleNotification(response)
    }
  })
}

export {
  onNotification,
}
