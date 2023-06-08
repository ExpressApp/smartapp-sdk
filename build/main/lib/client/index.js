"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.openGroupChat = exports.sendBotCommand = exports.searchCorporatePhonebook = exports.requestGeolocation = exports.getChats = exports.openClientSettings = void 0;
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
const requestGeolocation = () => {
    return smartapp_bridge_1.default === null || smartapp_bridge_1.default === void 0 ? void 0 : smartapp_bridge_1.default.sendClientEvent({
        method: types_1.METHODS.REQUEST_GEOLOCATION,
        params: {},
    });
};
exports.requestGeolocation = requestGeolocation;
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
const sendBotCommand = ({ userHuid, body, data }) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2NsaWVudC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxpRkFBK0M7QUFDL0MsdUNBQXFDO0FBRXJDLE1BQU0sa0JBQWtCLEdBQUcsR0FBRyxFQUFFO0lBQzlCLE9BQU8seUJBQU0sYUFBTix5QkFBTSx1QkFBTix5QkFBTSxDQUFFLGVBQWUsQ0FBQztRQUM3QixNQUFNLEVBQUUsZUFBTyxDQUFDLG9CQUFvQjtRQUNwQyxNQUFNLEVBQUUsRUFBRTtLQUNYLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQTtBQXlEQyxnREFBa0I7QUF2RHBCLE1BQU0sUUFBUSxHQUFHLENBQUMsRUFBRSxNQUFNLEdBQUcsSUFBSSxFQUE2QixFQUFFLEVBQUU7SUFDaEUsT0FBTyx5QkFBTSxhQUFOLHlCQUFNLHVCQUFOLHlCQUFNLENBQUUsZUFBZSxDQUFDO1FBQzdCLE1BQU0sRUFBRSxlQUFPLENBQUMsU0FBUztRQUN6QixNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUU7S0FDbkIsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFBO0FBbURDLDRCQUFRO0FBakRWLE1BQU0sa0JBQWtCLEdBQUcsR0FBRyxFQUFFO0lBQzlCLE9BQU8seUJBQU0sYUFBTix5QkFBTSx1QkFBTix5QkFBTSxDQUFFLGVBQWUsQ0FBQztRQUM3QixNQUFNLEVBQUUsZUFBTyxDQUFDLG1CQUFtQjtRQUNuQyxNQUFNLEVBQUUsRUFBRTtLQUNYLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQTtBQTZDQyxnREFBa0I7QUEzQ3BCLE1BQU0sd0JBQXdCLEdBQUcsQ0FBQyxFQUFFLE1BQU0sR0FBRyxJQUFJLEVBQTZCLEVBQUUsRUFBRTtJQUNoRixPQUFPLHlCQUFNLGFBQU4seUJBQU0sdUJBQU4seUJBQU0sQ0FBRSxlQUFlLENBQUM7UUFDN0IsTUFBTSxFQUFFLGVBQU8sQ0FBQywwQkFBMEI7UUFDMUMsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFO0tBQ25CLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQTtBQXVDQyw0REFBd0I7QUFwQzFCLE1BQU0sYUFBYSxHQUFHLENBQUMsRUFBRSxXQUFXLEVBQTJCLEVBQUUsRUFBRTtJQUNqRSxPQUFPLHlCQUFNLGFBQU4seUJBQU0sdUJBQU4seUJBQU0sQ0FBRSxlQUFlLENBQUM7UUFDN0IsTUFBTSxFQUFFLGVBQU8sQ0FBQyxlQUFlO1FBQy9CLE1BQU0sRUFBRSxFQUFFLFdBQVcsRUFBRTtLQUN4QixDQUFDLENBQUE7QUFDSixDQUFDLENBQUE7QUFpQ0Msc0NBQWE7QUEvQmYsTUFBTSxjQUFjLEdBQUcsQ0FDckIsRUFDRSxRQUFRLEVBQ1IsSUFBSSxFQUNKLElBQUksRUFLTCxFQUNELEVBQUU7SUFDRixJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVE7UUFBRSxPQUFNO0lBRXBDLE9BQU8seUJBQU0sYUFBTix5QkFBTSx1QkFBTix5QkFBTSxDQUFFLGVBQWUsQ0FBQztRQUM3QixNQUFNLEVBQUUsZUFBTyxDQUFDLGdCQUFnQjtRQUNoQyxNQUFNLEVBQUU7WUFDTixRQUFRO1lBQ1IsT0FBTyxFQUFFO2dCQUNQLElBQUk7Z0JBQ0osSUFBSTthQUNMO1NBQ0Y7S0FDRixDQUFDLENBQUE7QUFDSixDQUFDLENBQUE7QUFPQyx3Q0FBYyJ9