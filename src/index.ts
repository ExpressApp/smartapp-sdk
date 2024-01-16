import Bridge from '@expressms/smartapp-bridge'
import {
  createDeeplink,
  getChats,
  getConnectionStatus,
  openChatMessage,
  openClientSettings,
  openFile,
  openGroupChat,
  requestLocation,
  searchCorporatePhonebook,
  sendBotCommand,
  subscribeClientEvents,
  unsubscribeClientEvents,
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
  openFile,
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
  getConnectionStatus,
  subscribeClientEvents,
  unsubscribeClientEvents,
  createDeeplink,
  openChatMessage,
}
