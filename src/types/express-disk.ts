import { EmitterEventPayload } from '@expressms/smartapp-bridge/build/main/types/eventEmitter'
import { STATUS } from './bridge'

export interface GetAuthCodeResponse extends Omit<EmitterEventPayload, 'payload'> {
  payload: {
    status: STATUS
    errorCode?: string | null
    auth: {
      diskHost: string
      code: string
      codeChallenge: null | string
      codeChallengeMethod: string
      expiresIn: number
    }
  }
}
