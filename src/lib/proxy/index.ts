import bridge from '@expressms/smartapp-bridge'
import { CookieItem, ERROR_CODES, METHODS, StatusResponse } from '../../types'
import { CredentialsType, GetCredentialsResponse, WebCommandsPipeline } from '../../types/proxy'

/**
 * Set cookies for web resouce. It's needed for SSO auth cases.
 * @param cookies List of cookie strings !with domains!
 * @returns Promise that'll be fullfilled with SmartApp list on success, otherwise rejected with reason
 */
export const setWebResourceCookies = (cookies: CookieItem[]): Promise<StatusResponse> => {
  if (!bridge) return Promise.reject(ERROR_CODES.NO_BRIDGE)

  return bridge
    .sendClientEvent({
      method: METHODS.SET_WEB_RESOURCE_COOKIES,
      params: {
        cookies,
      },
    })
    .then(event => event as StatusResponse)
}

/**
 * Allow WebView то open links inside, not in external browser
 * @param domains List domains without schema
 * @returns Promise that'll be fullfilled with SmartApp list on success, otherwise rejected with reason
 */
export const setAllowedNavigationDomains = (domains: string[]): Promise<StatusResponse> => {
  if (!bridge) return Promise.reject(ERROR_CODES.NO_BRIDGE)

  return bridge
    .sendClientEvent({
      method: METHODS.SET_ALLOWED_NAVIGATION_DOMAINS,
      params: {
        domains,
      },
      timeout: 1000,
    })
    .then(event => event as StatusResponse)
}

/**
 * Get saved web resource credentials
 * @returns Promise that'll be fullfilled with credentials on success, otherwise rejected with reason
 */
export const getCredentials = (): Promise<GetCredentialsResponse> => {
  if (!bridge) return Promise.reject(ERROR_CODES.NO_BRIDGE)

  return bridge
    .sendClientEvent({
      method: METHODS.GET_CREDENTIALS,
      params: {},
      timeout: 10_000,
      hide_recv_event_data: true,
    })
    .then(event => event as GetCredentialsResponse)
}

/**
 * Save web resource credentials
 * @param login User login
 * @param password User pass
 * @returns Promise that'll be fullfilled with credentials on success, otherwise rejected with reason
 */
export const setCredentials = ({
  login,
  password,
  type,
}: {
  login: string
  password: string
  type: CredentialsType
}): Promise<StatusResponse> => {
  if (!bridge) return Promise.reject(ERROR_CODES.NO_BRIDGE)

  return bridge
    .sendClientEvent({
      method: METHODS.SET_CREDENTIALS,
      params: {
        credentials: {
          login,
          password,
          type,
        },
      },
      timeout: 10_000,
      hide_send_event_data: true,
    })
    .then(event => event as StatusResponse)
}

/**
 * Delete web resource credentials
 * @returns Promise that'll be fullfilled with credentials on success, otherwise rejected with reason
 */
export const deleteCredentials = (): Promise<StatusResponse> => {
  if (!bridge) return Promise.reject(ERROR_CODES.NO_BRIDGE)

  return bridge
    .sendClientEvent({
      method: METHODS.DELETE_CREDENTIALS,
      params: {},
    })
    .then(event => event as StatusResponse)
}

/**
 * Run pipeline for manipulating web resource
 * @param pipeline Pipeline with jobs & command
 * @returns Promise that'll be fullfilled
 */
export const runWebCommandsPipeline = (pipeline: WebCommandsPipeline): Promise<StatusResponse> => {
  if (!bridge) return Promise.reject(ERROR_CODES.NO_BRIDGE)

  return bridge
    .sendClientEvent({
      method: METHODS.RUN_WEB_COMMANDS_PIPELINE,
      params: {
        pipeline,
      },
      timeout: 1000,
      hide_send_event_data: true,
    })
    .then(event => event as StatusResponse)
}
