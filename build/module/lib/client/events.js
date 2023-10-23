import bridge from '@expressms/smartapp-bridge';
import { ERROR_CODES, METHODS, STATUS } from '../../types';
const subscriptions = [];
let bridgeEventListenerInstalled = false;
const isAnySubscriptionsOfType = (eventType) => {
    return subscriptions.some(sub => sub.eventType == eventType);
};
const installBridgeEventListener = () => {
    if (bridgeEventListenerInstalled || !bridge)
        return;
    bridgeEventListenerInstalled = true;
    bridge.onReceive(event => {
        subscriptions.filter(sub => sub.eventType === event.type).map(sub => sub.callback(event));
    });
};
/**
 * Subscribe to special client events
 * @param eventType Event from SubscriptionEventType enum to be subscribed
 * @param callback Function to be handled when event is coming
 * @returns Promise that'll be fullfilled on successful subscription, otherwise rejected with reason
 */
const subscribeClientEvents = (eventType, callback) => {
    const successResponse = { status: STATUS.SUCCESS };
    // No need to subscribe event twice on client
    if (isAnySubscriptionsOfType(eventType)) {
        subscriptions.push({ eventType, callback });
        return Promise.resolve(successResponse);
    }
    if (!bridge)
        return Promise.reject(ERROR_CODES.NO_BRIDGE);
    return bridge
        .sendClientEvent({
        method: METHODS.SUBSCRIBE_CLIENT_EVENTS,
        params: {
            event: eventType,
        },
    })
        .then(() => {
        installBridgeEventListener();
        subscriptions.push({ eventType, callback });
        return successResponse;
    });
};
/**
 * Unsubscribe from previously subscribed client events
 * @param eventType Event from SubscriptionEventType enum to be unsubscribed
 * @param callback Function to be unsibscribed
 * @returns Promise that'll be fullfilled on successful unsubscription, otherwise rejected with reason
 */
const unsubscribeClientEvents = (eventType, callback) => {
    const successResponse = { status: STATUS.SUCCESS };
    const index = subscriptions.findIndex(sub => sub.eventType == eventType && sub.callback == callback);
    if (!bridge)
        return Promise.reject(ERROR_CODES.NO_BRIDGE);
    if (index == -1)
        return Promise.reject(ERROR_CODES.SUBSCRIPTION_NOT_FOUND);
    subscriptions.splice(index, 1);
    // Send unsubscribe to client only at last subscription
    if (isAnySubscriptionsOfType(eventType))
        return Promise.resolve(successResponse);
    return bridge
        .sendClientEvent({
        method: METHODS.UNSUBSCRIBE_CLIENT_EVENTS,
        params: {
            event: eventType,
        },
    })
        .then(() => successResponse);
};
export { subscribeClientEvents, unsubscribeClientEvents };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9jbGllbnQvZXZlbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sTUFBTSxNQUFNLDRCQUE0QixDQUFBO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBeUIsTUFBTSxhQUFhLENBQUE7QUFFakYsTUFBTSxhQUFhLEdBQW9FLEVBQUUsQ0FBQTtBQUN6RixJQUFJLDRCQUE0QixHQUFHLEtBQUssQ0FBQTtBQUV4QyxNQUFNLHdCQUF3QixHQUFHLENBQUMsU0FBZ0MsRUFBRSxFQUFFO0lBQ3BFLE9BQU8sYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxTQUFTLElBQUksU0FBUyxDQUFDLENBQUE7QUFDOUQsQ0FBQyxDQUFBO0FBRUQsTUFBTSwwQkFBMEIsR0FBRyxHQUFHLEVBQUU7SUFDdEMsSUFBSSw0QkFBNEIsSUFBSSxDQUFDLE1BQU07UUFBRSxPQUFNO0lBRW5ELDRCQUE0QixHQUFHLElBQUksQ0FBQTtJQUVuQyxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ3ZCLGFBQWEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsU0FBUyxLQUFLLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7SUFDM0YsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDLENBQUE7QUFFRDs7Ozs7R0FLRztBQUNILE1BQU0scUJBQXFCLEdBQUcsQ0FBQyxTQUFnQyxFQUFFLFFBQWtCLEVBQStCLEVBQUU7SUFDbEgsTUFBTSxlQUFlLEdBQUcsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBRWxELDZDQUE2QztJQUM3QyxJQUFJLHdCQUF3QixDQUFDLFNBQVMsQ0FBQyxFQUFFO1FBQ3ZDLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQTtRQUMzQyxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUE7S0FDeEM7SUFFRCxJQUFJLENBQUMsTUFBTTtRQUFFLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUE7SUFFekQsT0FBTyxNQUFNO1NBQ1YsZUFBZSxDQUFDO1FBQ2YsTUFBTSxFQUFFLE9BQU8sQ0FBQyx1QkFBdUI7UUFDdkMsTUFBTSxFQUFFO1lBQ04sS0FBSyxFQUFFLFNBQVM7U0FDakI7S0FDRixDQUFDO1NBQ0QsSUFBSSxDQUFDLEdBQUcsRUFBRTtRQUNULDBCQUEwQixFQUFFLENBQUE7UUFDNUIsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFBO1FBQzNDLE9BQU8sZUFBZSxDQUFBO0lBQ3hCLENBQUMsQ0FBQyxDQUFBO0FBQ04sQ0FBQyxDQUFBO0FBRUQ7Ozs7O0dBS0c7QUFDSCxNQUFNLHVCQUF1QixHQUFHLENBQUMsU0FBZ0MsRUFBRSxRQUFrQixFQUErQixFQUFFO0lBQ3BILE1BQU0sZUFBZSxHQUFHLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQTtJQUVsRCxNQUFNLEtBQUssR0FBRyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFNBQVMsSUFBSSxTQUFTLElBQUksR0FBRyxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsQ0FBQTtJQUVwRyxJQUFJLENBQUMsTUFBTTtRQUFFLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUE7SUFDekQsSUFBSSxLQUFLLElBQUksQ0FBQyxDQUFDO1FBQUUsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFBO0lBRTFFLGFBQWEsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFBO0lBRTlCLHVEQUF1RDtJQUN2RCxJQUFJLHdCQUF3QixDQUFDLFNBQVMsQ0FBQztRQUFFLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQTtJQUVoRixPQUFPLE1BQU07U0FDVixlQUFlLENBQUM7UUFDZixNQUFNLEVBQUUsT0FBTyxDQUFDLHlCQUF5QjtRQUN6QyxNQUFNLEVBQUU7WUFDTixLQUFLLEVBQUUsU0FBUztTQUNqQjtLQUNGLENBQUM7U0FDRCxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsZUFBZSxDQUFDLENBQUE7QUFDaEMsQ0FBQyxDQUFBO0FBRUQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLHVCQUF1QixFQUFFLENBQUEifQ==