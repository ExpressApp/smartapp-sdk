import bridge from '@expressms/smartapp-bridge';
import { LOCATION, METHODS } from '../../types';
const routingChanged = async (isRoot) => {
    return bridge?.sendClientEvent({
        method: METHODS.ROUTING_CHANGED,
        params: {
            location: isRoot ? LOCATION.ROOT : LOCATION.NESTED,
        },
    });
};
const onBackPressed = async (handleBackPressed) => {
    return bridge?.onReceive((event) => {
        if (event.type === METHODS.BACK_PRESSED)
            handleBackPressed();
    });
};
const openSmartApp = async (appId, meta) => {
    return bridge?.sendClientEvent({
        method: METHODS.OPEN_SMART_APP,
        params: {
            appId,
            meta,
        }
    });
};
const exitSmartAppToCatalog = async () => {
    return bridge?.sendClientEvent({
        method: METHODS.OPEN_SMART_APP,
        params: {
            appId: ''
        }
    });
};
export { routingChanged, onBackPressed, openSmartApp, exitSmartAppToCatalog, };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL3JvdXRpbmcvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxNQUFNLE1BQU0sNEJBQTRCLENBQUE7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsTUFBTSxhQUFhLENBQUE7QUFFL0MsTUFBTSxjQUFjLEdBQUcsS0FBSyxFQUFFLE1BQWUsRUFBRSxFQUFFO0lBQy9DLE9BQU8sTUFBTSxFQUFFLGVBQWUsQ0FBQztRQUM3QixNQUFNLEVBQUUsT0FBTyxDQUFDLGVBQWU7UUFDL0IsTUFBTSxFQUFFO1lBQ04sUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU07U0FDbkQ7S0FDRixDQUFDLENBQUE7QUFDSixDQUFDLENBQUE7QUFHRCxNQUFNLGFBQWEsR0FBRyxLQUFLLEVBQUUsaUJBQTJCLEVBQUUsRUFBRTtJQUMxRCxPQUFPLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUNqQyxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssT0FBTyxDQUFDLFlBQVk7WUFBRSxpQkFBaUIsRUFBRSxDQUFBO0lBQzlELENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFBO0FBRUQsTUFBTSxZQUFZLEdBQUcsS0FBSyxFQUFFLEtBQWEsRUFBRSxJQUFZLEVBQUUsRUFBRTtJQUN6RCxPQUFPLE1BQU0sRUFBRSxlQUFlLENBQUM7UUFDN0IsTUFBTSxFQUFFLE9BQU8sQ0FBQyxjQUFjO1FBQzlCLE1BQU0sRUFBRTtZQUNOLEtBQUs7WUFDTCxJQUFJO1NBQ0w7S0FDRixDQUFDLENBQUE7QUFDSixDQUFDLENBQUE7QUFFRCxNQUFNLHFCQUFxQixHQUFHLEtBQUssSUFBSSxFQUFFO0lBQ3ZDLE9BQU8sTUFBTSxFQUFFLGVBQWUsQ0FBQztRQUM3QixNQUFNLEVBQUUsT0FBTyxDQUFDLGNBQWM7UUFDOUIsTUFBTSxFQUFFO1lBQ04sS0FBSyxFQUFFLEVBQUU7U0FDVjtLQUNGLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQTtBQUVELE9BQU8sRUFDTCxjQUFjLEVBQ2QsYUFBYSxFQUNiLFlBQVksRUFDWixxQkFBcUIsR0FDdEIsQ0FBQSJ9