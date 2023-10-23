import { SubscriptionEventType } from '../../types';
/**
 * Subscribe to special client events
 * @param eventType Event from SubscriptionEventType enum to be subscribed
 * @param callback Function to be handled when event is coming
 * @returns Promise that'll be fullfilled on successful subscription, otherwise rejected with reason
 */
declare const subscribeClientEvents: (eventType: SubscriptionEventType, callback: Function) => Promise<{
    status: string;
}>;
/**
 * Unsubscribe from previously subscribed client events
 * @param eventType Event from SubscriptionEventType enum to be unsubscribed
 * @param callback Function to be unsibscribed
 * @returns Promise that'll be fullfilled on successful unsubscription, otherwise rejected with reason
 */
declare const unsubscribeClientEvents: (eventType: SubscriptionEventType, callback: Function) => Promise<{
    status: string;
}>;
export { subscribeClientEvents, unsubscribeClientEvents };
