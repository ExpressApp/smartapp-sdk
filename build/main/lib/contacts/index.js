"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = exports.createPersonalChat = exports.getContact = exports.addContact = void 0;
const smartapp_bridge_1 = __importDefault(require("@expressms/smartapp-bridge"));
const types_1 = require("../../types");
const addContact = async ({ phone, name }) => {
    return smartapp_bridge_1.default === null || smartapp_bridge_1.default === void 0 ? void 0 : smartapp_bridge_1.default.sendClientEvent({
        method: types_1.METHODS.ADD_CONTACT,
        params: {
            phone,
            name,
        },
    });
};
exports.addContact = addContact;
const getContact = async ({ phone }) => {
    return smartapp_bridge_1.default === null || smartapp_bridge_1.default === void 0 ? void 0 : smartapp_bridge_1.default.sendClientEvent({
        method: types_1.METHODS.GET_CONTACT,
        params: { phone },
    });
};
exports.getContact = getContact;
const createPersonalChat = async ({ huid }) => {
    return smartapp_bridge_1.default === null || smartapp_bridge_1.default === void 0 ? void 0 : smartapp_bridge_1.default.sendClientEvent({
        method: types_1.METHODS.CREATE_PERSONAL_CHAT,
        params: { huid },
    });
};
exports.createPersonalChat = createPersonalChat;
const sendMessage = ({ userHuid = null, groupChatId = null, messageBody = '', messageMeta = {} }) => {
    return smartapp_bridge_1.default === null || smartapp_bridge_1.default === void 0 ? void 0 : smartapp_bridge_1.default.sendClientEvent({
        method: types_1.METHODS.SEND_MESSAGE,
        params: { userHuid, groupChatId, message: {
                body: messageBody,
                meta: messageMeta,
            } },
    });
};
exports.sendMessage = sendMessage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2NvbnRhY3RzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGlGQUErQztBQUMvQyx1Q0FBcUM7QUFHckMsTUFBTSxVQUFVLEdBQUcsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBbUMsRUFBRSxFQUFFO0lBQzVFLE9BQU8seUJBQU0sYUFBTix5QkFBTSx1QkFBTix5QkFBTSxDQUFFLGVBQWUsQ0FBQztRQUM3QixNQUFNLEVBQUUsZUFBTyxDQUFDLFdBQVc7UUFDM0IsTUFBTSxFQUFFO1lBQ04sS0FBSztZQUNMLElBQUk7U0FDTDtLQUNGLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQTtBQTZCQyxnQ0FBVTtBQTNCWixNQUFNLFVBQVUsR0FBRyxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQXFCLEVBQUUsRUFBRTtJQUN4RCxPQUFPLHlCQUFNLGFBQU4seUJBQU0sdUJBQU4seUJBQU0sQ0FBRSxlQUFlLENBQUM7UUFDN0IsTUFBTSxFQUFFLGVBQU8sQ0FBQyxXQUFXO1FBQzNCLE1BQU0sRUFBRSxFQUFFLEtBQUssRUFBRTtLQUNsQixDQUFDLENBQUE7QUFDSixDQUFDLENBQUE7QUF1QkMsZ0NBQVU7QUFyQlosTUFBTSxrQkFBa0IsR0FBRyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQW9CLEVBQUUsRUFBRTtJQUM5RCxPQUFPLHlCQUFNLGFBQU4seUJBQU0sdUJBQU4seUJBQU0sQ0FBRSxlQUFlLENBQUM7UUFDN0IsTUFBTSxFQUFFLGVBQU8sQ0FBQyxvQkFBb0I7UUFDcEMsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFO0tBQ2pCLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQTtBQWlCQyxnREFBa0I7QUFmcEIsTUFBTSxXQUFXLEdBQUcsQ0FDbEIsRUFBRSxRQUFRLEdBQUcsSUFBSSxFQUFFLFdBQVcsR0FBRyxJQUFJLEVBQUUsV0FBVyxHQUFHLEVBQUUsRUFBRSxXQUFXLEdBQUcsRUFBRSxFQUFlLEVBQ3hGLEVBQUU7SUFDRixPQUFPLHlCQUFNLGFBQU4seUJBQU0sdUJBQU4seUJBQU0sQ0FBRSxlQUFlLENBQUM7UUFDN0IsTUFBTSxFQUFFLGVBQU8sQ0FBQyxZQUFZO1FBQzVCLE1BQU0sRUFBRSxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFO2dCQUN4QyxJQUFJLEVBQUUsV0FBVztnQkFDakIsSUFBSSxFQUFFLFdBQVc7YUFDbEIsRUFBQztLQUNILENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQTtBQU1DLGtDQUFXIn0=