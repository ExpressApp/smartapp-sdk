import Bridge from '@expressms/smartapp-bridge'
import { addContact, createPersonalChat, getContact, sendMessage } from './lib/contacts'
import { useQuery } from './lib/helpers/helpers'
import { ready } from './lib/logging'
import { onNotification } from './lib/notification'
import { exitSmartAppToCatalog, onBackPressed, openSmartApp, routingChanged } from './lib/routing'

export {
  Bridge,
  ready,
  routingChanged,
  onBackPressed,
  addContact,
  getContact,
  createPersonalChat,
  onNotification,
  sendMessage,
  openSmartApp,
  exitSmartAppToCatalog,
  useQuery,
}
