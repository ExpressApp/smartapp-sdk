"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = exports.createPersonalChat = exports.getContact = exports.addContact = void 0;
const smartapp_bridge_1 = __importDefault(require("@expressms/smartapp-bridge"));
const types_1 = require("../../types");
/**
 * @param phone
 * @param name
 */
const addContact = ({ phone, name }) => {
    return smartapp_bridge_1.default === null || smartapp_bridge_1.default === void 0 ? void 0 : smartapp_bridge_1.default.sendClientEvent({
        method: types_1.METHODS.ADD_CONTACT,
        params: {
            phone,
            name,
        },
    });
};
exports.addContact = addContact;
/**
 * @param phone
 */
const getContact = async ({ phone }) => {
    return smartapp_bridge_1.default === null || smartapp_bridge_1.default === void 0 ? void 0 : smartapp_bridge_1.default.sendClientEvent({
        method: types_1.METHODS.GET_CONTACT,
        params: { phone },
    });
};
exports.getContact = getContact;
/**
 * @param huid
 */
const createPersonalChat = ({ huid }) => {
    return smartapp_bridge_1.default === null || smartapp_bridge_1.default === void 0 ? void 0 : smartapp_bridge_1.default.sendClientEvent({
        method: types_1.METHODS.CREATE_PERSONAL_CHAT,
        params: { huid },
    });
};
exports.createPersonalChat = createPersonalChat;
/**
 * @param userHuid
 * @param groupChatId
 * @param messageBody
 * @param messageMeta
 */
const sendMessage = ({ userHuid = null, groupChatId = null, messageBody = "", messageMeta = {}, }) => {
    return smartapp_bridge_1.default === null || smartapp_bridge_1.default === void 0 ? void 0 : smartapp_bridge_1.default.sendClientEvent({
        method: types_1.METHODS.SEND_MESSAGE,
        params: {
            userHuid,
            groupChatId,
            message: {
                body: messageBody,
                meta: messageMeta,
            },
        },
    });
};
exports.sendMessage = sendMessage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2NvbnRhY3RzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGlGQUErQztBQUMvQyx1Q0FBcUM7QUFHckM7OztHQUdHO0FBQ0gsTUFBTSxVQUFVLEdBQUcsQ0FDakIsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFtQyxFQUNoRCxFQUFFO0lBQ0YsT0FBTyx5QkFBTSxhQUFOLHlCQUFNLHVCQUFOLHlCQUFNLENBQUUsZUFBZSxDQUFDO1FBQzdCLE1BQU0sRUFBRSxlQUFPLENBQUMsV0FBVztRQUMzQixNQUFNLEVBQUU7WUFDTixLQUFLO1lBQ0wsSUFBSTtTQUNMO0tBQ0YsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFBO0FBZ0RDLGdDQUFVO0FBOUNaOztHQUVHO0FBQ0gsTUFBTSxVQUFVLEdBQUcsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFxQixFQUFFLEVBQUU7SUFDeEQsT0FBTyx5QkFBTSxhQUFOLHlCQUFNLHVCQUFOLHlCQUFNLENBQUUsZUFBZSxDQUFDO1FBQzdCLE1BQU0sRUFBRSxlQUFPLENBQUMsV0FBVztRQUMzQixNQUFNLEVBQUUsRUFBRSxLQUFLLEVBQUU7S0FDbEIsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFBO0FBdUNDLGdDQUFVO0FBckNaOztHQUVHO0FBQ0gsTUFBTSxrQkFBa0IsR0FBRyxDQUFDLEVBQUUsSUFBSSxFQUFvQixFQUFFLEVBQUU7SUFDeEQsT0FBTyx5QkFBTSxhQUFOLHlCQUFNLHVCQUFOLHlCQUFNLENBQUUsZUFBZSxDQUFDO1FBQzdCLE1BQU0sRUFBRSxlQUFPLENBQUMsb0JBQW9CO1FBQ3BDLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRTtLQUNqQixDQUFDLENBQUE7QUFDSixDQUFDLENBQUE7QUE4QkMsZ0RBQWtCO0FBNUJwQjs7Ozs7R0FLRztBQUNILE1BQU0sV0FBVyxHQUFHLENBQUMsRUFDRSxRQUFRLEdBQUcsSUFBSSxFQUNmLFdBQVcsR0FBRyxJQUFJLEVBQ2xCLFdBQVcsR0FBRyxFQUFFLEVBQ2hCLFdBQVcsR0FBRyxFQUFFLEdBQ1EsRUFBRSxFQUFFO0lBQ2pELE9BQU8seUJBQU0sYUFBTix5QkFBTSx1QkFBTix5QkFBTSxDQUFFLGVBQWUsQ0FBQztRQUM3QixNQUFNLEVBQUUsZUFBTyxDQUFDLFlBQVk7UUFDNUIsTUFBTSxFQUFFO1lBQ04sUUFBUTtZQUNSLFdBQVc7WUFDWCxPQUFPLEVBQUU7Z0JBQ1AsSUFBSSxFQUFFLFdBQVc7Z0JBQ2pCLElBQUksRUFBRSxXQUFXO2FBQ2xCO1NBQ0Y7S0FDRixDQUFDLENBQUE7QUFDSixDQUFDLENBQUE7QUFNQyxrQ0FBVyJ9