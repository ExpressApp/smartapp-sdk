import bridge from '@unlimited/smartapp-bridge';
import { bridgeSendReady } from '../index';
const ready = async () => {
    const response = await bridgeSendReady();
    const Bridge = bridge;
    // TODO fix when enableLogs is present in bridge
    const isLogsEnabled = response?.payload?.logsEnabled;
    if (isLogsEnabled)
        Bridge?.enableLogs?.();
    return new Promise(resolve => resolve(isLogsEnabled));
};
export { ready };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2xvZ2dpbmcvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxNQUFNLE1BQU0sNEJBQTRCLENBQUE7QUFDL0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUUxQyxNQUFNLEtBQUssR0FBMkIsS0FBSyxJQUFJLEVBQUU7SUFDL0MsTUFBTSxRQUFRLEdBQUcsTUFBTSxlQUFlLEVBSXJDLENBQUE7SUFDRCxNQUFNLE1BQU0sR0FBRyxNQUVkLENBQUE7SUFDRCxnREFBZ0Q7SUFFaEQsTUFBTSxhQUFhLEdBQUcsUUFBUSxFQUFFLE9BQU8sRUFBRSxXQUFXLENBQUE7SUFFcEQsSUFBSSxhQUFhO1FBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLENBQUE7SUFFekMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFBO0FBQ3ZELENBQUMsQ0FBQTtBQUVELE9BQU8sRUFDTCxLQUFLLEVBQ04sQ0FBQSJ9