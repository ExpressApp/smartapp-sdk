import bridge from '@expressms/smartapp-bridge';
import { bridgeSendReady } from '../index';
const ready = async (timeout) => {
    const response = await bridgeSendReady(timeout);
    const Bridge = bridge;
    const isLogsEnabled = response?.payload?.logsEnabled;
    if (isLogsEnabled)
        Bridge?.enableLogs?.();
    return response;
};
export { ready };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2xvZ2dpbmcvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxNQUFNLE1BQU0sNEJBQTRCLENBQUE7QUFDL0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQWExQyxNQUFNLEtBQUssR0FBRyxLQUFLLEVBQUUsT0FBZ0IsRUFBRSxFQUFFO0lBQ3ZDLE1BQU0sUUFBUSxHQUFHLE1BQU0sZUFBZSxDQUFDLE9BQU8sQ0FBOEIsQ0FBQTtJQUM1RSxNQUFNLE1BQU0sR0FBRyxNQUEyQixDQUFBO0lBQzFDLE1BQU0sYUFBYSxHQUFHLFFBQVEsRUFBRSxPQUFPLEVBQUUsV0FBVyxDQUFBO0lBRXBELElBQUksYUFBYTtRQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxDQUFBO0lBRXpDLE9BQU8sUUFBUSxDQUFBO0FBQ2pCLENBQUMsQ0FBQTtBQUVELE9BQU8sRUFDTCxLQUFLLEVBQ04sQ0FBQSJ9