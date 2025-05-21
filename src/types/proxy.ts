import { EmitterEventPayload } from '@expressms/smartapp-bridge/build/main/types/eventEmitter'
import { STATUS } from './bridge'

export type CredentialsType = 'login_password' | 'cookie'

export interface GetCredentialsResponse extends Omit<EmitterEventPayload, 'payload'> {
  payload: {
    status: STATUS
    errorCode?: string | null
    credentials: Array<{
      type: CredentialsType
      login: string
      password: string
    }>
  }
}

export type WebCommandSearchElement = {
  type: 'search_element'
  xpath: string
}

export type WebCommandSetInputValue = {
  type: 'set_input_value'
  xpath: string
  value: string
}

export type WebCommandClickElement = {
  type: 'click_element'
  xpath: string
}

export type WebCommandOpenUrl = {
  type: 'open_url'
  value: string
}

export type WebCommand = WebCommandSearchElement | WebCommandSetInputValue | WebCommandClickElement | WebCommandOpenUrl

export interface WebCommandsJob {
  commands: Array<WebCommand>
  interval: number
  retryCount: number
  onSuccess: Array<WebCommandsJob>
  onError: Array<WebCommandsJob>
}

export type WebCommandsPipeline = Array<WebCommandsJob>
