import Bridge from '@expressms/smartapp-bridge'
import {
  getChats,
  openClientSettings,
  openGroupChat,
  requestLocation,
  searchCorporatePhonebook,
  sendBotCommand,
} from './lib/client'
import {
  addContact,
  createPersonalChat,
  getContact,
  openContactCard,
  requestSelfProfile,
  sendMessage,
} from './lib/contacts'
import {useQuery} from './lib/helpers/helpers'
import {ready} from './lib/logging'
import {onNotification} from './lib/notification'
import {
  closeSmartApp,
  exitSmartAppToCatalog,
  onBackPressed,
  onMoveToRoot,
  openSmartApp,
  routingChanged,
} from './lib/routing'

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
  openClientSettings,
  getChats,
  searchCorporatePhonebook,
  sendBotCommand,
  openGroupChat,
  onMoveToRoot,
  requestLocation,
  openContactCard,
  requestSelfProfile,
  closeSmartApp,
}
