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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2NvbnRhY3RzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGlGQUErQztBQUMvQyx1Q0FBcUM7QUFHckMsTUFBTSxVQUFVLEdBQUcsQ0FDZixFQUFFLEtBQUssRUFBRSxJQUFJLEVBQW1DLEVBQ2xELEVBQUU7SUFDRixPQUFPLHlCQUFNLGFBQU4seUJBQU0sdUJBQU4seUJBQU0sQ0FBRSxlQUFlLENBQUM7UUFDN0IsTUFBTSxFQUFFLGVBQU8sQ0FBQyxXQUFXO1FBQzNCLE1BQU0sRUFBRTtZQUNOLEtBQUs7WUFDTCxJQUFJO1NBQ0w7S0FDRixDQUFDLENBQUE7QUFDSixDQUFDLENBQUE7QUFzREMsZ0NBQVU7QUFwRFosTUFBTSxVQUFVLEdBQUcsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFxQixFQUFFLEVBQUU7SUFDeEQsT0FBTyx5QkFBTSxhQUFOLHlCQUFNLHVCQUFOLHlCQUFNLENBQUUsZUFBZSxDQUFDO1FBQzdCLE1BQU0sRUFBRSxlQUFPLENBQUMsV0FBVztRQUMzQixNQUFNLEVBQUUsRUFBRSxLQUFLLEVBQUU7S0FDbEIsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFBO0FBZ0RDLGdDQUFVO0FBOUNaLE1BQU0sa0JBQWtCLEdBQUcsQ0FBQyxFQUFFLElBQUksRUFBb0IsRUFBRSxFQUFFO0lBQ3hELE9BQU8seUJBQU0sYUFBTix5QkFBTSx1QkFBTix5QkFBTSxDQUFFLGVBQWUsQ0FBQztRQUM3QixNQUFNLEVBQUUsZUFBTyxDQUFDLG9CQUFvQjtRQUNwQyxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUU7S0FDakIsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFBO0FBMENDLGdEQUFrQjtBQXhDcEIsTUFBTSxXQUFXLEdBQUcsQ0FDaEIsRUFDRSxRQUFRLEdBQUcsSUFBSSxFQUNmLFdBQVcsR0FBRyxJQUFJLEVBQ2xCLFdBQVcsR0FBRyxFQUFFLEVBQ2hCLFdBQVcsR0FBRyxFQUFFLEdBQ1EsRUFDNUIsRUFBRTtJQUNGLE9BQU8seUJBQU0sYUFBTix5QkFBTSx1QkFBTix5QkFBTSxDQUFFLGVBQWUsQ0FBQztRQUM3QixNQUFNLEVBQUUsZUFBTyxDQUFDLFlBQVk7UUFDNUIsTUFBTSxFQUFFO1lBQ04sUUFBUTtZQUNSLFdBQVc7WUFDWCxPQUFPLEVBQUU7Z0JBQ1AsSUFBSSxFQUFFLFdBQVc7Z0JBQ2pCLElBQUksRUFBRSxXQUFXO2FBQ2xCO1NBQ0Y7S0FDRixDQUFDLENBQUE7QUFDSixDQUFDLENBQUE7QUFzQkMsa0NBQVc7QUFwQmIsTUFBTSxlQUFlLEdBQUcsQ0FBQyxFQUFFLFFBQVEsRUFBd0IsRUFBRSxFQUFFO0lBQzdELElBQUksQ0FBQyxRQUFRO1FBQUUsT0FBTTtJQUVyQixPQUFPLHlCQUFNLGFBQU4seUJBQU0sdUJBQU4seUJBQU0sQ0FBRSxlQUFlLENBQUM7UUFDN0IsTUFBTSxFQUFFLGVBQU8sQ0FBQyxpQkFBaUI7UUFDakMsTUFBTSxFQUFFLEVBQUUsUUFBUSxFQUFFO0tBQ3JCLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQTtBQWNDLDBDQUFlO0FBWmpCLE1BQU0sa0JBQWtCLEdBQUcsR0FBZ0MsRUFBRTtJQUMzRCxPQUFPLHlCQUFNLGFBQU4seUJBQU0sdUJBQU4seUJBQU0sQ0FBRSxlQUFlLENBQUM7UUFDN0IsTUFBTSxFQUFFLGVBQU8sQ0FBQyxvQkFBb0I7UUFDcEMsTUFBTSxFQUFFLEVBQUU7S0FDWCxDQUErQixDQUFBO0FBQ2xDLENBQUMsQ0FBQTtBQVFDLGdEQUFrQiJ9