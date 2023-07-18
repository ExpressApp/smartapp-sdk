"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLocation = exports.sendBotCommand = exports.openGroupChat = exports.searchCorporatePhonebook = exports.getChats = exports.openClientSettings = void 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2NsaWVudC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxpRkFBK0M7QUFDL0MsdUNBQW1DO0FBRW5DLE1BQU0sa0JBQWtCLEdBQUcsR0FBRyxFQUFFO0lBQzlCLE9BQU8seUJBQU0sYUFBTix5QkFBTSx1QkFBTix5QkFBTSxDQUFFLGVBQWUsQ0FBQztRQUM3QixNQUFNLEVBQUUsZUFBTyxDQUFDLG9CQUFvQjtRQUNwQyxNQUFNLEVBQUUsRUFBRTtLQUNYLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQTtBQXdEQyxnREFBa0I7QUF0RHBCLE1BQU0sUUFBUSxHQUFHLENBQUMsRUFBQyxNQUFNLEdBQUcsSUFBSSxFQUE0QixFQUFFLEVBQUU7SUFDOUQsT0FBTyx5QkFBTSxhQUFOLHlCQUFNLHVCQUFOLHlCQUFNLENBQUUsZUFBZSxDQUFDO1FBQzdCLE1BQU0sRUFBRSxlQUFPLENBQUMsU0FBUztRQUN6QixNQUFNLEVBQUUsRUFBQyxNQUFNLEVBQUM7S0FDakIsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFBO0FBa0RDLDRCQUFRO0FBaERWLE1BQU0sd0JBQXdCLEdBQUcsQ0FBQyxFQUFDLE1BQU0sR0FBRyxJQUFJLEVBQTRCLEVBQUUsRUFBRTtJQUM5RSxPQUFPLHlCQUFNLGFBQU4seUJBQU0sdUJBQU4seUJBQU0sQ0FBRSxlQUFlLENBQUM7UUFDN0IsTUFBTSxFQUFFLGVBQU8sQ0FBQywwQkFBMEI7UUFDMUMsTUFBTSxFQUFFLEVBQUMsTUFBTSxFQUFDO0tBQ2pCLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQTtBQTRDQyw0REFBd0I7QUExQzFCLE1BQU0sYUFBYSxHQUFHLENBQUMsRUFBQyxXQUFXLEVBQTBCLEVBQUUsRUFBRTtJQUMvRCxPQUFPLHlCQUFNLGFBQU4seUJBQU0sdUJBQU4seUJBQU0sQ0FBRSxlQUFlLENBQUM7UUFDN0IsTUFBTSxFQUFFLGVBQU8sQ0FBQyxlQUFlO1FBQy9CLE1BQU0sRUFBRSxFQUFDLFdBQVcsRUFBQztLQUN0QixDQUFDLENBQUE7QUFDSixDQUFDLENBQUE7QUFzQ0Msc0NBQWE7QUFwQ2YsTUFBTSxjQUFjLEdBQUcsQ0FDbkIsRUFDRSxRQUFRLEVBQ1IsSUFBSSxFQUNKLElBQUksR0FLTCxFQUNILEVBQUU7SUFDRixJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVE7UUFBRSxPQUFNO0lBRXBDLE9BQU8seUJBQU0sYUFBTix5QkFBTSx1QkFBTix5QkFBTSxDQUFFLGVBQWUsQ0FBQztRQUM3QixNQUFNLEVBQUUsZUFBTyxDQUFDLGdCQUFnQjtRQUNoQyxNQUFNLEVBQUU7WUFDTixRQUFRO1lBQ1IsT0FBTyxFQUFFO2dCQUNQLElBQUk7Z0JBQ0osSUFBSTthQUNMO1NBQ0Y7S0FDRixDQUFDLENBQUE7QUFDSixDQUFDLENBQUE7QUFjQyx3Q0FBYztBQVpoQixNQUFNLGVBQWUsR0FBRyxHQUFHLEVBQUU7SUFDM0IsT0FBTyx5QkFBTSxhQUFOLHlCQUFNLHVCQUFOLHlCQUFNLENBQUUsZUFBZSxDQUFDO1FBQzdCLE1BQU0sRUFBRSxlQUFPLENBQUMsZ0JBQWdCO1FBQ2hDLE1BQU0sRUFBRSxFQUFFO0tBQ1gsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFBO0FBUUMsMENBQWUifQ==