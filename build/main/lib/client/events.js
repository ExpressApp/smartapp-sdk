"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unsubscribeClientEvents = exports.subscribeClientEvents = void 0;
const smartapp_bridge_1 = __importDefault(require("@expressms/smartapp-bridge"));
const types_1 = require("../../types");
const subscriptions = [];
let bridgeEventListenerInstalled = false;
const isAnySubscriptionsOfType = (eventType) => {
    return subscriptions.some(sub => sub.eventType == eventType);
};
const installBridgeEventListener = () => {
    if (bridgeEventListenerInstalled || !smartapp_bridge_1.default)
        return;
    bridgeEventListenerInstalled = true;
    smartapp_bridge_1.default.onReceive(event => {
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
    const successResponse = { status: types_1.STATUS.SUCCESS };
    // No need to subscribe event twice on client
    if (isAnySubscriptionsOfType(eventType)) {
        subscriptions.push({ eventType, callback });
        return Promise.resolve(successResponse);
    }
    if (!smartapp_bridge_1.default)
        return Promise.reject(types_1.ERROR_CODES.NO_BRIDGE);
    return smartapp_bridge_1.default
        .sendClientEvent({
        method: types_1.METHODS.SUBSCRIBE_CLIENT_EVENTS,
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
exports.subscribeClientEvents = subscribeClientEvents;
/**
 * Unsubscribe from previously subscribed client events
 * @param eventType Event from SubscriptionEventType enum to be unsubscribed
 * @param callback Function to be unsibscribed
 * @returns Promise that'll be fullfilled on successful unsubscription, otherwise rejected with reason
 */
const unsubscribeClientEvents = (eventType, callback) => {
    const successResponse = { status: types_1.STATUS.SUCCESS };
    const index = subscriptions.findIndex(sub => sub.eventType == eventType && sub.callback == callback);
    if (!smartapp_bridge_1.default)
        return Promise.reject(types_1.ERROR_CODES.NO_BRIDGE);
    if (index == -1)
        return Promise.reject(types_1.ERROR_CODES.SUBSCRIPTION_NOT_FOUND);
    subscriptions.splice(index, 1);
    // Send unsubscribe to client only at last subscription
    if (isAnySubscriptionsOfType(eventType))
        return Promise.resolve(successResponse);
    return smartapp_bridge_1.default
        .sendClientEvent({
        method: types_1.METHODS.UNSUBSCRIBE_CLIENT_EVENTS,
        params: {
            event: eventType,
        },
    })
        .then(() => successResponse);
};
exports.unsubscribeClientEvents = unsubscribeClientEvents;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9jbGllbnQvZXZlbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGlGQUErQztBQUMvQyx1Q0FBaUY7QUFFakYsTUFBTSxhQUFhLEdBQW9FLEVBQUUsQ0FBQTtBQUN6RixJQUFJLDRCQUE0QixHQUFHLEtBQUssQ0FBQTtBQUV4QyxNQUFNLHdCQUF3QixHQUFHLENBQUMsU0FBZ0MsRUFBRSxFQUFFO0lBQ3BFLE9BQU8sYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxTQUFTLElBQUksU0FBUyxDQUFDLENBQUE7QUFDOUQsQ0FBQyxDQUFBO0FBRUQsTUFBTSwwQkFBMEIsR0FBRyxHQUFHLEVBQUU7SUFDdEMsSUFBSSw0QkFBNEIsSUFBSSxDQUFDLHlCQUFNO1FBQUUsT0FBTTtJQUVuRCw0QkFBNEIsR0FBRyxJQUFJLENBQUE7SUFFbkMseUJBQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDdkIsYUFBYSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEtBQUssS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTtJQUMzRixDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQTtBQUVEOzs7OztHQUtHO0FBQ0gsTUFBTSxxQkFBcUIsR0FBRyxDQUFDLFNBQWdDLEVBQUUsUUFBa0IsRUFBK0IsRUFBRTtJQUNsSCxNQUFNLGVBQWUsR0FBRyxFQUFFLE1BQU0sRUFBRSxjQUFNLENBQUMsT0FBTyxFQUFFLENBQUE7SUFFbEQsNkNBQTZDO0lBQzdDLElBQUksd0JBQXdCLENBQUMsU0FBUyxDQUFDLEVBQUU7UUFDdkMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFBO1FBQzNDLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQTtLQUN4QztJQUVELElBQUksQ0FBQyx5QkFBTTtRQUFFLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxtQkFBVyxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBRXpELE9BQU8seUJBQU07U0FDVixlQUFlLENBQUM7UUFDZixNQUFNLEVBQUUsZUFBTyxDQUFDLHVCQUF1QjtRQUN2QyxNQUFNLEVBQUU7WUFDTixLQUFLLEVBQUUsU0FBUztTQUNqQjtLQUNGLENBQUM7U0FDRCxJQUFJLENBQUMsR0FBRyxFQUFFO1FBQ1QsMEJBQTBCLEVBQUUsQ0FBQTtRQUM1QixhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUE7UUFDM0MsT0FBTyxlQUFlLENBQUE7SUFDeEIsQ0FBQyxDQUFDLENBQUE7QUFDTixDQUFDLENBQUE7QUErQlEsc0RBQXFCO0FBN0I5Qjs7Ozs7R0FLRztBQUNILE1BQU0sdUJBQXVCLEdBQUcsQ0FBQyxTQUFnQyxFQUFFLFFBQWtCLEVBQStCLEVBQUU7SUFDcEgsTUFBTSxlQUFlLEdBQUcsRUFBRSxNQUFNLEVBQUUsY0FBTSxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBRWxELE1BQU0sS0FBSyxHQUFHLGFBQWEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsU0FBUyxJQUFJLFNBQVMsSUFBSSxHQUFHLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxDQUFBO0lBRXBHLElBQUksQ0FBQyx5QkFBTTtRQUFFLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxtQkFBVyxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQ3pELElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQztRQUFFLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxtQkFBVyxDQUFDLHNCQUFzQixDQUFDLENBQUE7SUFFMUUsYUFBYSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUE7SUFFOUIsdURBQXVEO0lBQ3ZELElBQUksd0JBQXdCLENBQUMsU0FBUyxDQUFDO1FBQUUsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFBO0lBRWhGLE9BQU8seUJBQU07U0FDVixlQUFlLENBQUM7UUFDZixNQUFNLEVBQUUsZUFBTyxDQUFDLHlCQUF5QjtRQUN6QyxNQUFNLEVBQUU7WUFDTixLQUFLLEVBQUUsU0FBUztTQUNqQjtLQUNGLENBQUM7U0FDRCxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsZUFBZSxDQUFDLENBQUE7QUFDaEMsQ0FBQyxDQUFBO0FBRStCLDBEQUF1QiJ9