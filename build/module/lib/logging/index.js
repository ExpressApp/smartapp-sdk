import bridge from "@expressms/smartapp-bridge";
import { bridgeSendReady } from "../index";
/**
 * @param timeout
 */
const ready = async (timeout) => {
    const response = await bridgeSendReady(timeout);
    const Bridge = bridge;
    const isLogsEnabled = response?.payload?.logsEnabled;
    if (isLogsEnabled)
        Bridge?.enableLogs?.();
    return response;
};
export { ready, };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2xvZ2dpbmcvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxNQUFNLE1BQU0sNEJBQTRCLENBQUE7QUFDL0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUUxQzs7R0FFRztBQUNILE1BQU0sS0FBSyxHQUFHLEtBQUssRUFBRSxPQUFnQixFQUFFLEVBQUU7SUFDdkMsTUFBTSxRQUFRLEdBQUcsTUFBTSxlQUFlLENBQUMsT0FBTyxDQUFRLENBQUE7SUFDdEQsTUFBTSxNQUFNLEdBQUcsTUFBYSxDQUFBO0lBQzVCLE1BQU0sYUFBYSxHQUFHLFFBQVEsRUFBRSxPQUFPLEVBQUUsV0FBVyxDQUFBO0lBRXBELElBQUksYUFBYTtRQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxDQUFBO0lBRXpDLE9BQU8sUUFBUSxDQUFBO0FBQ2pCLENBQUMsQ0FBQTtBQUVELE9BQU8sRUFDTCxLQUFLLEdBQ04sQ0FBQSJ9