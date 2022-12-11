"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchCorporatePhonebook = exports.getChats = exports.openClientSettings = void 0;
const smartapp_bridge_1 = __importDefault(require("@expressms/smartapp-bridge"));
const types_1 = require("../../types");
const openClientSettings = () => {
    return smartapp_bridge_1.default === null || smartapp_bridge_1.default === void 0 ? void 0 : smartapp_bridge_1.default.sendClientEvent({
        method: types_1.METHODS.OPEN_CLIENT_SETTINGS,
        params: {},
    });
};
exports.openClientSettings = openClientSettings;
/**
 * @param filter
 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2NsaWVudC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxpRkFBK0M7QUFDL0MsdUNBQXFDO0FBRXJDLE1BQU0sa0JBQWtCLEdBQUcsR0FBRyxFQUFFO0lBQzlCLE9BQU8seUJBQU0sYUFBTix5QkFBTSx1QkFBTix5QkFBTSxDQUFFLGVBQWUsQ0FBQztRQUM3QixNQUFNLEVBQUUsZUFBTyxDQUFDLG9CQUFvQjtRQUNwQyxNQUFNLEVBQUUsRUFBRTtLQUNYLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQTtBQW9CQyxnREFBa0I7QUFsQnBCOztHQUVHO0FBQ0gsTUFBTSxRQUFRLEdBQUcsQ0FBQyxFQUFFLE1BQU0sR0FBRyxJQUFJLEVBQTZCLEVBQUUsRUFBRTtJQUNoRSxPQUFPLHlCQUFNLGFBQU4seUJBQU0sdUJBQU4seUJBQU0sQ0FBRSxlQUFlLENBQUM7UUFDN0IsTUFBTSxFQUFFLGVBQU8sQ0FBQyxTQUFTO1FBQ3pCLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRTtLQUNuQixDQUFDLENBQUE7QUFDSixDQUFDLENBQUE7QUFXQyw0QkFBUTtBQVRWLE1BQU0sd0JBQXdCLEdBQUcsQ0FBQyxFQUFFLE1BQU0sR0FBRyxJQUFJLEVBQTZCLEVBQUUsRUFBRTtJQUNoRixPQUFPLHlCQUFNLGFBQU4seUJBQU0sdUJBQU4seUJBQU0sQ0FBRSxlQUFlLENBQUM7UUFDN0IsTUFBTSxFQUFFLGVBQU8sQ0FBQywwQkFBMEI7UUFDMUMsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFO0tBQ25CLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQTtBQUtDLDREQUF3QiJ9