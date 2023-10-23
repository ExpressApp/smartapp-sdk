"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestSelfProfile = exports.openContactCard = exports.sendMessage = exports.createPersonalChat = exports.getContact = exports.addContact = void 0;
const smartapp_bridge_1 = __importDefault(require("@expressms/smartapp-bridge"));
const types_1 = require("../../types");
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
const getContact = async ({ phone }) => {
    return smartapp_bridge_1.default === null || smartapp_bridge_1.default === void 0 ? void 0 : smartapp_bridge_1.default.sendClientEvent({
        method: types_1.METHODS.GET_CONTACT,
        params: { phone },
    });
};
exports.getContact = getContact;
const createPersonalChat = ({ huid }) => {
    return smartapp_bridge_1.default === null || smartapp_bridge_1.default === void 0 ? void 0 : smartapp_bridge_1.default.sendClientEvent({
        method: types_1.METHODS.CREATE_PERSONAL_CHAT,
        params: { huid },
    });
};
exports.createPersonalChat = createPersonalChat;
const sendMessage = ({ userHuid = null, groupChatId = null, messageBody = '', messageMeta = {}, }) => {
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
const openContactCard = ({ userHuid }) => {
    if (!userHuid)
        return;
    return smartapp_bridge_1.default === null || smartapp_bridge_1.default === void 0 ? void 0 : smartapp_bridge_1.default.sendClientEvent({
        method: types_1.METHODS.OPEN_CONTACT_CARD,
        params: { userHuid }
    });
};
exports.openContactCard = openContactCard;
const requestSelfProfile = () => {
    return smartapp_bridge_1.default === null || smartapp_bridge_1.default === void 0 ? void 0 : smartapp_bridge_1.default.sendClientEvent({
        method: types_1.METHODS.REQUEST_SELF_PROFILE,
        params: {},
    });
};
exports.requestSelfProfile = requestSelfProfile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2NvbnRhY3RzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGlGQUErQztBQUMvQyx1Q0FBaUU7QUFHakUsTUFBTSxVQUFVLEdBQUcsQ0FDakIsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFtQyxFQUNoRCxFQUFFO0lBQ0YsT0FBTyx5QkFBTSxhQUFOLHlCQUFNLHVCQUFOLHlCQUFNLENBQUUsZUFBZSxDQUFDO1FBQzdCLE1BQU0sRUFBRSxlQUFPLENBQUMsV0FBVztRQUMzQixNQUFNLEVBQUU7WUFDTixLQUFLO1lBQ0wsSUFBSTtTQUNMO0tBQ0YsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFBO0FBc0RDLGdDQUFVO0FBcERaLE1BQU0sVUFBVSxHQUFHLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBcUIsRUFBRSxFQUFFO0lBQ3hELE9BQU8seUJBQU0sYUFBTix5QkFBTSx1QkFBTix5QkFBTSxDQUFFLGVBQWUsQ0FBQztRQUM3QixNQUFNLEVBQUUsZUFBTyxDQUFDLFdBQVc7UUFDM0IsTUFBTSxFQUFFLEVBQUUsS0FBSyxFQUFFO0tBQ2xCLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQTtBQWdEQyxnQ0FBVTtBQTlDWixNQUFNLGtCQUFrQixHQUFHLENBQUMsRUFBRSxJQUFJLEVBQW9CLEVBQUUsRUFBRTtJQUN4RCxPQUFPLHlCQUFNLGFBQU4seUJBQU0sdUJBQU4seUJBQU0sQ0FBRSxlQUFlLENBQUM7UUFDN0IsTUFBTSxFQUFFLGVBQU8sQ0FBQyxvQkFBb0I7UUFDcEMsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFO0tBQ2pCLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQTtBQTBDQyxnREFBa0I7QUF4Q3BCLE1BQU0sV0FBVyxHQUFHLENBQ2xCLEVBQ0UsUUFBUSxHQUFHLElBQUksRUFDZixXQUFXLEdBQUcsSUFBSSxFQUNsQixXQUFXLEdBQUcsRUFBRSxFQUNoQixXQUFXLEdBQUcsRUFBRSxHQUNRLEVBQzFCLEVBQUU7SUFDRixPQUFPLHlCQUFNLGFBQU4seUJBQU0sdUJBQU4seUJBQU0sQ0FBRSxlQUFlLENBQUM7UUFDN0IsTUFBTSxFQUFFLGVBQU8sQ0FBQyxZQUFZO1FBQzVCLE1BQU0sRUFBRTtZQUNOLFFBQVE7WUFDUixXQUFXO1lBQ1gsT0FBTyxFQUFFO2dCQUNQLElBQUksRUFBRSxXQUFXO2dCQUNqQixJQUFJLEVBQUUsV0FBVzthQUNsQjtTQUNGO0tBQ0YsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFBO0FBc0JDLGtDQUFXO0FBcEJiLE1BQU0sZUFBZSxHQUFHLENBQUMsRUFBRSxRQUFRLEVBQXdCLEVBQUUsRUFBRTtJQUM3RCxJQUFJLENBQUMsUUFBUTtRQUFFLE9BQU07SUFFckIsT0FBTyx5QkFBTSxhQUFOLHlCQUFNLHVCQUFOLHlCQUFNLENBQUUsZUFBZSxDQUFDO1FBQzdCLE1BQU0sRUFBRSxlQUFPLENBQUMsaUJBQWlCO1FBQ2pDLE1BQU0sRUFBRSxFQUFFLFFBQVEsRUFBRTtLQUNyQixDQUFDLENBQUE7QUFDSixDQUFDLENBQUE7QUFjQywwQ0FBZTtBQVpqQixNQUFNLGtCQUFrQixHQUFHLEdBQWdDLEVBQUU7SUFDM0QsT0FBTyx5QkFBTSxhQUFOLHlCQUFNLHVCQUFOLHlCQUFNLENBQUUsZUFBZSxDQUFDO1FBQzdCLE1BQU0sRUFBRSxlQUFPLENBQUMsb0JBQW9CO1FBQ3BDLE1BQU0sRUFBRSxFQUFFO0tBQ1gsQ0FBK0IsQ0FBQTtBQUNsQyxDQUFDLENBQUE7QUFRQyxnREFBa0IifQ==