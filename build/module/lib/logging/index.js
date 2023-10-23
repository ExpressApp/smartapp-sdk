import bridge from '@expressms/smartapp-bridge';
import { ERROR_CODES } from '../../types';
import { bridgeSendReady } from '../index';
const ready = async (timeout) => {
    const response = await bridgeSendReady(timeout);
    const isLogsEnabled = response?.payload?.logsEnabled;
    if (!bridge)
        return Promise.reject(ERROR_CODES.NO_BRIDGE);
    if (isLogsEnabled)
        bridge.enableLogs?.();
    return response;
};
export { ready, };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2xvZ2dpbmcvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxNQUFNLE1BQU0sNEJBQTRCLENBQUE7QUFDL0MsT0FBTyxFQUFFLFdBQVcsRUFBc0IsTUFBTSxhQUFhLENBQUE7QUFDN0QsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUUxQyxNQUFNLEtBQUssR0FBRyxLQUFLLEVBQUUsT0FBZ0IsRUFBRSxFQUFFO0lBQ3ZDLE1BQU0sUUFBUSxHQUFHLE1BQU0sZUFBZSxDQUFDLE9BQU8sQ0FBdUIsQ0FBQTtJQUNyRSxNQUFNLGFBQWEsR0FBRyxRQUFRLEVBQUUsT0FBTyxFQUFFLFdBQVcsQ0FBQTtJQUVwRCxJQUFJLENBQUMsTUFBTTtRQUFFLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUE7SUFFekQsSUFBSSxhQUFhO1FBQUcsTUFBYyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUE7SUFFakQsT0FBTyxRQUFRLENBQUE7QUFDakIsQ0FBQyxDQUFBO0FBRUQsT0FBTyxFQUNMLEtBQUssR0FDTixDQUFBIn0=