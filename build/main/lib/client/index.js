"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDeeplink = exports.getConnectionStatus = exports.openFile = exports.requestLocation = exports.sendBotCommand = exports.openGroupChat = exports.searchCorporatePhonebook = exports.getChats = exports.openClientSettings = void 0;
const smartapp_bridge_1 = __importDefault(require("@expressms/smartapp-bridge"));
const types_1 = require("../../types");
__exportStar(require("./events"), exports);
const openClientSettings = () => {
    return smartapp_bridge_1.default === null || smartapp_bridge_1.default === void 0 ? void 0 : smartapp_bridge_1.default.sendClientEvent({
        method: types_1.METHODS.OPEN_CLIENT_SETTINGS,
        params: {},
    });
};
exports.openClientSettings = openClientSettings;
const getChats = ({ filter = null }) => {
    return smartapp_bridge_1.default === null || smartapp_bridge_1.default === void 0 ? void 0 : smartapp_bridge_1.default.sendClientEvent({
        method: types_1.METHODS.GET_CHATS,
        params: { filter },
    });
};
exports.getChats = getChats;
const searchCorporatePhonebook = ({ filter = null }) => {
    return smartapp_bridge_1.default === null || smartapp_bridge_1.default === void 0 ? void 0 : smartapp_bridge_1.default.sendClientEvent({
        method: types_1.METHODS.SEARCH_CORPORATE_PHONEBOOK,
        params: { filter },
    });
};
exports.searchCorporatePhonebook = searchCorporatePhonebook;
const openGroupChat = ({ groupChatId }) => {
    return smartapp_bridge_1.default === null || smartapp_bridge_1.default === void 0 ? void 0 : smartapp_bridge_1.default.sendClientEvent({
        method: types_1.METHODS.OPEN_GROUP_CHAT,
        params: { groupChatId },
    });
};
exports.openGroupChat = openGroupChat;
const openFile = (file) => {
    return smartapp_bridge_1.default === null || smartapp_bridge_1.default === void 0 ? void 0 : smartapp_bridge_1.default.sendClientEvent({
        method: types_1.METHODS.OPEN_FILE,
        params: file,
    });
};
exports.openFile = openFile;
const sendBotCommand = ({ userHuid, body, data, }) => {
    if (typeof data !== 'object')
        return;
    return smartapp_bridge_1.default === null || smartapp_bridge_1.default === void 0 ? void 0 : smartapp_bridge_1.default.sendClientEvent({
        method: types_1.METHODS.SEND_BOT_COMMAND,
        params: {
            userHuid,
            message: {
                body,
                data,
            },
        },
    });
};
exports.sendBotCommand = sendBotCommand;
const requestLocation = () => {
    return smartapp_bridge_1.default === null || smartapp_bridge_1.default === void 0 ? void 0 : smartapp_bridge_1.default.sendClientEvent({
        method: types_1.METHODS.REQUEST_LOCATION,
        params: {},
    });
};
exports.requestLocation = requestLocation;
/**
 * Get client current connection status. It's based on client's WebSocket connection state.
 * @returns Promise that'll be fullfilled with status data on success, otherwise rejected with reason
 */
const getConnectionStatus = async () => {
    if (!smartapp_bridge_1.default)
        return Promise.reject(types_1.ERROR_CODES.NO_BRIDGE);
    const response = await smartapp_bridge_1.default.sendClientEvent({
        method: types_1.METHODS.GET_CONNECTION_STATUS,
        params: {},
    });
    return response;
};
exports.getConnectionStatus = getConnectionStatus;
/**
 * Create deeplink URL to open SmartApp
 * @param appId ID of SmartApp
 * @param meta Array of params to be included in deeplink
 * @returns Promise that'll be fullfilled with deeplink data on success, otherwise rejected with reason
 */
const createDeeplink = async (appId, meta) => {
    if (!smartapp_bridge_1.default)
        return Promise.reject(types_1.ERROR_CODES.NO_BRIDGE);
    const response = await smartapp_bridge_1.default.sendClientEvent({
        method: types_1.METHODS.CREATE_DEEPLINK,
        params: { appId, meta },
    });
    return response;
};
exports.createDeeplink = createDeeplink;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2NsaWVudC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlGQUErQztBQUMvQyx1Q0FBNkc7QUFFN0csMkNBQXdCO0FBRXhCLE1BQU0sa0JBQWtCLEdBQUcsR0FBRyxFQUFFO0lBQzlCLE9BQU8seUJBQU0sYUFBTix5QkFBTSx1QkFBTix5QkFBTSxDQUFFLGVBQWUsQ0FBQztRQUM3QixNQUFNLEVBQUUsZUFBTyxDQUFDLG9CQUFvQjtRQUNwQyxNQUFNLEVBQUUsRUFBRTtLQUNYLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQTtBQWlHQyxnREFBa0I7QUEvRnBCLE1BQU0sUUFBUSxHQUFHLENBQUMsRUFBRSxNQUFNLEdBQUcsSUFBSSxFQUE2QixFQUFFLEVBQUU7SUFDaEUsT0FBTyx5QkFBTSxhQUFOLHlCQUFNLHVCQUFOLHlCQUFNLENBQUUsZUFBZSxDQUFDO1FBQzdCLE1BQU0sRUFBRSxlQUFPLENBQUMsU0FBUztRQUN6QixNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUU7S0FDbkIsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFBO0FBMkZDLDRCQUFRO0FBekZWLE1BQU0sd0JBQXdCLEdBQUcsQ0FBQyxFQUFFLE1BQU0sR0FBRyxJQUFJLEVBQTZCLEVBQUUsRUFBRTtJQUNoRixPQUFPLHlCQUFNLGFBQU4seUJBQU0sdUJBQU4seUJBQU0sQ0FBRSxlQUFlLENBQUM7UUFDN0IsTUFBTSxFQUFFLGVBQU8sQ0FBQywwQkFBMEI7UUFDMUMsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFO0tBQ25CLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQTtBQXFGQyw0REFBd0I7QUFuRjFCLE1BQU0sYUFBYSxHQUFHLENBQUMsRUFBRSxXQUFXLEVBQTJCLEVBQUUsRUFBRTtJQUNqRSxPQUFPLHlCQUFNLGFBQU4seUJBQU0sdUJBQU4seUJBQU0sQ0FBRSxlQUFlLENBQUM7UUFDN0IsTUFBTSxFQUFFLGVBQU8sQ0FBQyxlQUFlO1FBQy9CLE1BQU0sRUFBRSxFQUFFLFdBQVcsRUFBRTtLQUN4QixDQUFDLENBQUE7QUFDSixDQUFDLENBQUE7QUErRUMsc0NBQWE7QUE3RWYsTUFBTSxRQUFRLEdBQUcsQ0FBQyxJQUFVLEVBQUUsRUFBRTtJQUM5QixPQUFPLHlCQUFNLGFBQU4seUJBQU0sdUJBQU4seUJBQU0sQ0FBRSxlQUFlLENBQUM7UUFDN0IsTUFBTSxFQUFFLGVBQU8sQ0FBQyxTQUFTO1FBQ3pCLE1BQU0sRUFBRSxJQUFJO0tBQ2IsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFBO0FBMkVDLDRCQUFRO0FBekVWLE1BQU0sY0FBYyxHQUFHLENBQ3JCLEVBQ0UsUUFBUSxFQUNSLElBQUksRUFDSixJQUFJLEdBS0wsRUFBRSxFQUFFO0lBQ0wsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRO1FBQUUsT0FBTTtJQUVwQyxPQUFPLHlCQUFNLGFBQU4seUJBQU0sdUJBQU4seUJBQU0sQ0FBRSxlQUFlLENBQUM7UUFDN0IsTUFBTSxFQUFFLGVBQU8sQ0FBQyxnQkFBZ0I7UUFDaEMsTUFBTSxFQUFFO1lBQ04sUUFBUTtZQUNSLE9BQU8sRUFBRTtnQkFDUCxJQUFJO2dCQUNKLElBQUk7YUFDTDtTQUNGO0tBQ0YsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFBO0FBaURDLHdDQUFjO0FBL0NoQixNQUFNLGVBQWUsR0FBRyxHQUFHLEVBQUU7SUFDM0IsT0FBTyx5QkFBTSxhQUFOLHlCQUFNLHVCQUFOLHlCQUFNLENBQUUsZUFBZSxDQUFDO1FBQzdCLE1BQU0sRUFBRSxlQUFPLENBQUMsZ0JBQWdCO1FBQ2hDLE1BQU0sRUFBRSxFQUFFO0tBQ1gsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFBO0FBMkNDLDBDQUFlO0FBekNqQjs7O0dBR0c7QUFDSCxNQUFNLG1CQUFtQixHQUFHLEtBQUssSUFBMEMsRUFBRTtJQUMzRSxJQUFJLENBQUMseUJBQU07UUFBRSxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsbUJBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUV6RCxNQUFNLFFBQVEsR0FBRyxNQUFNLHlCQUFNLENBQUMsZUFBZSxDQUFDO1FBQzVDLE1BQU0sRUFBRSxlQUFPLENBQUMscUJBQXFCO1FBQ3JDLE1BQU0sRUFBRSxFQUFFO0tBQ1gsQ0FBQyxDQUFBO0lBRUYsT0FBTyxRQUF1QyxDQUFBO0FBQ2hELENBQUMsQ0FBQTtBQThCQyxrREFBbUI7QUE1QnJCOzs7OztHQUtHO0FBQ0gsTUFBTSxjQUFjLEdBQUcsS0FBSyxFQUMxQixLQUFhLEVBQ2IsSUFBcUUsRUFDcEMsRUFBRTtJQUNuQyxJQUFJLENBQUMseUJBQU07UUFBRSxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsbUJBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUV6RCxNQUFNLFFBQVEsR0FBRyxNQUFNLHlCQUFNLENBQUMsZUFBZSxDQUFDO1FBQzVDLE1BQU0sRUFBRSxlQUFPLENBQUMsZUFBZTtRQUMvQixNQUFNLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFO0tBQ3hCLENBQUMsQ0FBQTtJQUVGLE9BQU8sUUFBa0MsQ0FBQTtBQUMzQyxDQUFDLENBQUE7QUFXQyx3Q0FBYyJ9