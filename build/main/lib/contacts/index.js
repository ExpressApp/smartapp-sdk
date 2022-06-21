"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPersonalChat = exports.getContact = exports.addContact = void 0;
const smartapp_bridge_1 = __importDefault(require("@unlimited/smartapp-bridge"));
const types_1 = require("../../types");
const addContact = async ({ phone, name }) => {
    return smartapp_bridge_1.default === null || smartapp_bridge_1.default === void 0 ? void 0 : smartapp_bridge_1.default.sendClientEvent({
        method: types_1.EVENT_TYPES.ADD_CONTACT,
        params: {
            phone,
            name,
        },
    });
};
exports.addContact = addContact;
const getContact = async ({ phone }) => {
    return smartapp_bridge_1.default === null || smartapp_bridge_1.default === void 0 ? void 0 : smartapp_bridge_1.default.sendClientEvent({
        method: types_1.EVENT_TYPES.GET_CONTACT,
        params: { phone },
    });
};
exports.getContact = getContact;
const createPersonalChat = async ({ huid }) => {
    return smartapp_bridge_1.default === null || smartapp_bridge_1.default === void 0 ? void 0 : smartapp_bridge_1.default.sendClientEvent({
        method: types_1.EVENT_TYPES.CREATE_PERSONAL_CHAT,
        params: { huid },
    });
};
exports.createPersonalChat = createPersonalChat;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2NvbnRhY3RzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGlGQUErQztBQUMvQyx1Q0FBeUM7QUFFekMsTUFBTSxVQUFVLEdBQUcsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBbUMsRUFBRSxFQUFFO0lBQzVFLE9BQU8seUJBQU0sYUFBTix5QkFBTSx1QkFBTix5QkFBTSxDQUFFLGVBQWUsQ0FBQztRQUM3QixNQUFNLEVBQUUsbUJBQVcsQ0FBQyxXQUFXO1FBQy9CLE1BQU0sRUFBRTtZQUNOLEtBQUs7WUFDTCxJQUFJO1NBQ0w7S0FDRixDQUFDLENBQUE7QUFDSixDQUFDLENBQUE7QUFpQkMsZ0NBQVU7QUFmWixNQUFNLFVBQVUsR0FBRyxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQXFCLEVBQUUsRUFBRTtJQUN4RCxPQUFPLHlCQUFNLGFBQU4seUJBQU0sdUJBQU4seUJBQU0sQ0FBRSxlQUFlLENBQUM7UUFDN0IsTUFBTSxFQUFFLG1CQUFXLENBQUMsV0FBVztRQUMvQixNQUFNLEVBQUUsRUFBRSxLQUFLLEVBQUU7S0FDbEIsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFBO0FBV0MsZ0NBQVU7QUFUWixNQUFNLGtCQUFrQixHQUFHLEtBQUssRUFBRSxFQUFFLElBQUksRUFBb0IsRUFBRSxFQUFFO0lBQzlELE9BQU8seUJBQU0sYUFBTix5QkFBTSx1QkFBTix5QkFBTSxDQUFFLGVBQWUsQ0FBQztRQUM3QixNQUFNLEVBQUUsbUJBQVcsQ0FBQyxvQkFBb0I7UUFDeEMsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFO0tBQ2pCLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQTtBQUtDLGdEQUFrQiJ9