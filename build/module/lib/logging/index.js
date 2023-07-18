import bridge from "@expressms/smartapp-bridge";
import { bridgeSendReady } from "../index";
const ready = async (timeout) => {
    const response = await bridgeSendReady(timeout);
    const isLogsEnabled = response?.payload?.logsEnabled;
    if (isLogsEnabled)
        bridge?.enableLogs?.();
    return response;
};
export { ready, };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2xvZ2dpbmcvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxNQUFNLE1BQU0sNEJBQTRCLENBQUE7QUFFL0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUUxQyxNQUFNLEtBQUssR0FBRyxLQUFLLEVBQUUsT0FBZ0IsRUFBRSxFQUFFO0lBQ3ZDLE1BQU0sUUFBUSxHQUFHLE1BQU0sZUFBZSxDQUFDLE9BQU8sQ0FBdUIsQ0FBQTtJQUNyRSxNQUFNLGFBQWEsR0FBRyxRQUFRLEVBQUUsT0FBTyxFQUFFLFdBQVcsQ0FBQTtJQUVwRCxJQUFJLGFBQWE7UUFBRyxNQUFjLEVBQUUsVUFBVSxFQUFFLEVBQUUsQ0FBQTtJQUVsRCxPQUFPLFFBQVEsQ0FBQTtBQUNqQixDQUFDLENBQUE7QUFFRCxPQUFPLEVBQ0wsS0FBSyxHQUNOLENBQUEifQ==