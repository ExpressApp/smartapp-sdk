import bridge from '@expressms/smartapp-bridge';
import { METHODS } from '../../types';
const openClientSettings = () => {
    return bridge?.sendClientEvent({
        method: METHODS.OPEN_CLIENT_SETTINGS,
        params: {},
    });
};
const getChats = ({ filter = null }) => {
    return bridge?.sendClientEvent({
        method: METHODS.GET_CHATS,
        params: { filter },
    });
};
const searchCorporatePhonebook = ({ filter = null }) => {
    return bridge?.sendClientEvent({
        method: METHODS.SEARCH_CORPORATE_PHONEBOOK,
        params: { filter },
    });
};
const openChat = ({ groupChatId }) => {
    return bridge?.sendClientEvent({
        method: METHODS.OPEN_CHAT,
        params: { groupChatId },
    });
};
export { openClientSettings, getChats, searchCorporatePhonebook, openChat, };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2NsaWVudC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLE1BQU0sTUFBTSw0QkFBNEIsQ0FBQTtBQUMvQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sYUFBYSxDQUFBO0FBRXJDLE1BQU0sa0JBQWtCLEdBQUcsR0FBRyxFQUFFO0lBQzlCLE9BQU8sTUFBTSxFQUFFLGVBQWUsQ0FBQztRQUM3QixNQUFNLEVBQUUsT0FBTyxDQUFDLG9CQUFvQjtRQUNwQyxNQUFNLEVBQUUsRUFBRTtLQUNYLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQTtBQUVELE1BQU0sUUFBUSxHQUFHLENBQUMsRUFBRSxNQUFNLEdBQUcsSUFBSSxFQUE2QixFQUFFLEVBQUU7SUFDaEUsT0FBTyxNQUFNLEVBQUUsZUFBZSxDQUFDO1FBQzdCLE1BQU0sRUFBRSxPQUFPLENBQUMsU0FBUztRQUN6QixNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUU7S0FDbkIsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFBO0FBRUQsTUFBTSx3QkFBd0IsR0FBRyxDQUFDLEVBQUUsTUFBTSxHQUFHLElBQUksRUFBNkIsRUFBRSxFQUFFO0lBQ2hGLE9BQU8sTUFBTSxFQUFFLGVBQWUsQ0FBQztRQUM3QixNQUFNLEVBQUUsT0FBTyxDQUFDLDBCQUEwQjtRQUMxQyxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUU7S0FDbkIsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFBO0FBRUQsTUFBTSxRQUFRLEdBQUcsQ0FBQyxFQUFFLFdBQVcsRUFBMkIsRUFBRSxFQUFFO0lBQzVELE9BQU8sTUFBTSxFQUFFLGVBQWUsQ0FBQztRQUM3QixNQUFNLEVBQUUsT0FBTyxDQUFDLFNBQVM7UUFDekIsTUFBTSxFQUFFLEVBQUUsV0FBVyxFQUFFO0tBQ3hCLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQTtBQUVELE9BQU8sRUFDTCxrQkFBa0IsRUFDbEIsUUFBUSxFQUNSLHdCQUF3QixFQUN4QixRQUFRLEdBQ1QsQ0FBQSJ9