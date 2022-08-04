import Bridge from '@unlimited/smartapp-bridge'
import * as OfflinePluginRuntime from 'offline-plugin/runtime'
import { addContact, createPersonalChat, getContact, sendMessage } from './lib/contacts'
import { useQuery } from './lib/helpers/ helpers'
import { ready } from './lib/logging'
import { onNotification } from './lib/notification'
import { onBackPressed, routingChanged } from './lib/routing'

export {
  Bridge,
  ready,
  routingChanged,
  onBackPressed,
  addContact,
  getContact,
  sendMessage,
  createPersonalChat,
  onNotification,
  OfflinePluginRuntime,
  useQuery,
}
