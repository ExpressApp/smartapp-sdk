import bridge from "@expressms/smartapp-bridge";
import { METHODS } from "../../types";
/**
 * @param phone
 * @param name
 */
const addContact = ({ phone, name }) => {
    return bridge?.sendClientEvent({
        method: METHODS.ADD_CONTACT,
        params: {
            phone,
            name,
        },
    });
};
/**
 * @param phone
 */
const getContact = async ({ phone }) => {
    return bridge?.sendClientEvent({
        method: METHODS.GET_CONTACT,
        params: { phone },
    });
};
/**
 * @param huid
 */
const createPersonalChat = ({ huid }) => {
    return bridge?.sendClientEvent({
        method: METHODS.CREATE_PERSONAL_CHAT,
        params: { huid },
    });
};
/**
 * @param userHuid
 * @param groupChatId
 * @param messageBody
 * @param messageMeta
 */
const sendMessage = ({ userHuid = null, groupChatId = null, messageBody = "", messageMeta = {}, }) => {
    return bridge?.sendClientEvent({
        method: METHODS.SEND_MESSAGE,
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
export { addContact, getContact, createPersonalChat, sendMessage, };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2NvbnRhY3RzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sTUFBTSxNQUFNLDRCQUE0QixDQUFBO0FBQy9DLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxhQUFhLENBQUE7QUFHckM7OztHQUdHO0FBQ0gsTUFBTSxVQUFVLEdBQUcsQ0FDakIsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFtQyxFQUNoRCxFQUFFO0lBQ0YsT0FBTyxNQUFNLEVBQUUsZUFBZSxDQUFDO1FBQzdCLE1BQU0sRUFBRSxPQUFPLENBQUMsV0FBVztRQUMzQixNQUFNLEVBQUU7WUFDTixLQUFLO1lBQ0wsSUFBSTtTQUNMO0tBQ0YsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFBO0FBRUQ7O0dBRUc7QUFDSCxNQUFNLFVBQVUsR0FBRyxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQXFCLEVBQUUsRUFBRTtJQUN4RCxPQUFPLE1BQU0sRUFBRSxlQUFlLENBQUM7UUFDN0IsTUFBTSxFQUFFLE9BQU8sQ0FBQyxXQUFXO1FBQzNCLE1BQU0sRUFBRSxFQUFFLEtBQUssRUFBRTtLQUNsQixDQUFDLENBQUE7QUFDSixDQUFDLENBQUE7QUFFRDs7R0FFRztBQUNILE1BQU0sa0JBQWtCLEdBQUcsQ0FBQyxFQUFFLElBQUksRUFBb0IsRUFBRSxFQUFFO0lBQ3hELE9BQU8sTUFBTSxFQUFFLGVBQWUsQ0FBQztRQUM3QixNQUFNLEVBQUUsT0FBTyxDQUFDLG9CQUFvQjtRQUNwQyxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUU7S0FDakIsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFBO0FBRUQ7Ozs7O0dBS0c7QUFDSCxNQUFNLFdBQVcsR0FBRyxDQUFDLEVBQ0UsUUFBUSxHQUFHLElBQUksRUFDZixXQUFXLEdBQUcsSUFBSSxFQUNsQixXQUFXLEdBQUcsRUFBRSxFQUNoQixXQUFXLEdBQUcsRUFBRSxHQUNRLEVBQUUsRUFBRTtJQUNqRCxPQUFPLE1BQU0sRUFBRSxlQUFlLENBQUM7UUFDN0IsTUFBTSxFQUFFLE9BQU8sQ0FBQyxZQUFZO1FBQzVCLE1BQU0sRUFBRTtZQUNOLFFBQVE7WUFDUixXQUFXO1lBQ1gsT0FBTyxFQUFFO2dCQUNQLElBQUksRUFBRSxXQUFXO2dCQUNqQixJQUFJLEVBQUUsV0FBVzthQUNsQjtTQUNGO0tBQ0YsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFBO0FBRUQsT0FBTyxFQUNMLFVBQVUsRUFDVixVQUFVLEVBQ1Ysa0JBQWtCLEVBQ2xCLFdBQVcsR0FDWixDQUFBIn0=