"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLocation = exports.sendBotCommand = exports.openGroupChat = exports.searchCorporatePhonebook = exports.getChats = exports.openClientSettings = exports.openFile = void 0;
const smartapp_bridge_1 = __importDefault(require("@expressms/smartapp-bridge"));
const types_1 = require("../../types");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2NsaWVudC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxpRkFBK0M7QUFDL0MsdUNBQTJDO0FBRTNDLE1BQU0sa0JBQWtCLEdBQUcsR0FBRyxFQUFFO0lBQzlCLE9BQU8seUJBQU0sYUFBTix5QkFBTSx1QkFBTix5QkFBTSxDQUFFLGVBQWUsQ0FBQztRQUM3QixNQUFNLEVBQUUsZUFBTyxDQUFDLG9CQUFvQjtRQUNwQyxNQUFNLEVBQUUsRUFBRTtLQUNYLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQTtBQWdFQyxnREFBa0I7QUE5RHBCLE1BQU0sUUFBUSxHQUFHLENBQUMsRUFBQyxNQUFNLEdBQUcsSUFBSSxFQUE0QixFQUFFLEVBQUU7SUFDOUQsT0FBTyx5QkFBTSxhQUFOLHlCQUFNLHVCQUFOLHlCQUFNLENBQUUsZUFBZSxDQUFDO1FBQzdCLE1BQU0sRUFBRSxlQUFPLENBQUMsU0FBUztRQUN6QixNQUFNLEVBQUUsRUFBQyxNQUFNLEVBQUM7S0FDakIsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFBO0FBMERDLDRCQUFRO0FBeERWLE1BQU0sd0JBQXdCLEdBQUcsQ0FBQyxFQUFDLE1BQU0sR0FBRyxJQUFJLEVBQTRCLEVBQUUsRUFBRTtJQUM5RSxPQUFPLHlCQUFNLGFBQU4seUJBQU0sdUJBQU4seUJBQU0sQ0FBRSxlQUFlLENBQUM7UUFDN0IsTUFBTSxFQUFFLGVBQU8sQ0FBQywwQkFBMEI7UUFDMUMsTUFBTSxFQUFFLEVBQUMsTUFBTSxFQUFDO0tBQ2pCLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQTtBQW9EQyw0REFBd0I7QUFsRDFCLE1BQU0sYUFBYSxHQUFHLENBQUMsRUFBQyxXQUFXLEVBQTBCLEVBQUUsRUFBRTtJQUMvRCxPQUFPLHlCQUFNLGFBQU4seUJBQU0sdUJBQU4seUJBQU0sQ0FBRSxlQUFlLENBQUM7UUFDN0IsTUFBTSxFQUFFLGVBQU8sQ0FBQyxlQUFlO1FBQy9CLE1BQU0sRUFBRSxFQUFDLFdBQVcsRUFBQztLQUN0QixDQUFDLENBQUE7QUFDSixDQUFDLENBQUE7QUE4Q0Msc0NBQWE7QUE1Q2YsTUFBTSxRQUFRLEdBQUcsQ0FBQyxJQUFVLEVBQUUsRUFBRTtJQUM5QixPQUFPLHlCQUFNLGFBQU4seUJBQU0sdUJBQU4seUJBQU0sQ0FBRSxlQUFlLENBQUM7UUFDN0IsTUFBTSxFQUFFLGVBQU8sQ0FBQyxTQUFTO1FBQ3pCLE1BQU0sRUFBRSxJQUFJO0tBQ2IsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFBO0FBbUNDLDRCQUFRO0FBakNWLE1BQU0sY0FBYyxHQUFHLENBQ25CLEVBQ0UsUUFBUSxFQUNSLElBQUksRUFDSixJQUFJLEdBS0wsRUFDSCxFQUFFO0lBQ0YsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRO1FBQUUsT0FBTTtJQUVwQyxPQUFPLHlCQUFNLGFBQU4seUJBQU0sdUJBQU4seUJBQU0sQ0FBRSxlQUFlLENBQUM7UUFDN0IsTUFBTSxFQUFFLGVBQU8sQ0FBQyxnQkFBZ0I7UUFDaEMsTUFBTSxFQUFFO1lBQ04sUUFBUTtZQUNSLE9BQU8sRUFBRTtnQkFDUCxJQUFJO2dCQUNKLElBQUk7YUFDTDtTQUNGO0tBQ0YsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFBO0FBZUMsd0NBQWM7QUFiaEIsTUFBTSxlQUFlLEdBQUcsR0FBRyxFQUFFO0lBQzNCLE9BQU8seUJBQU0sYUFBTix5QkFBTSx1QkFBTix5QkFBTSxDQUFFLGVBQWUsQ0FBQztRQUM3QixNQUFNLEVBQUUsZUFBTyxDQUFDLGdCQUFnQjtRQUNoQyxNQUFNLEVBQUUsRUFBRTtLQUNYLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQTtBQVNDLDBDQUFlIn0=