"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeSmartApp = exports.onMoveToRoot = exports.exitSmartAppToCatalog = exports.openSmartApp = exports.onBackPressed = exports.routingChanged = void 0;
const smartapp_bridge_1 = __importDefault(require("@expressms/smartapp-bridge"));
const types_1 = require("../../types");
const routingChanged = (isRoot) => {
    return smartapp_bridge_1.default === null || smartapp_bridge_1.default === void 0 ? void 0 : smartapp_bridge_1.default.sendClientEvent({
        method: types_1.METHODS.ROUTING_CHANGED,
        params: {
            location: isRoot ? types_1.LOCATION.ROOT : types_1.LOCATION.NESTED,
        },
    });
};
exports.routingChanged = routingChanged;
const onBackPressed = (handleBackPressed) => {
    return smartapp_bridge_1.default === null || smartapp_bridge_1.default === void 0 ? void 0 : smartapp_bridge_1.default.onReceive(event => {
        if (event.type === types_1.METHODS.BACK_PRESSED)
            handleBackPressed();
    });
};
exports.onBackPressed = onBackPressed;
const openSmartApp = ({ appId, meta }) => {
    return smartapp_bridge_1.default === null || smartapp_bridge_1.default === void 0 ? void 0 : smartapp_bridge_1.default.sendClientEvent({
        method: types_1.METHODS.OPEN_SMART_APP,
        params: meta ? { appId, meta } : { appId },
    });
};
exports.openSmartApp = openSmartApp;
const closeSmartApp = () => {
    return smartapp_bridge_1.default === null || smartapp_bridge_1.default === void 0 ? void 0 : smartapp_bridge_1.default.sendClientEvent({
        method: types_1.METHODS.CLOSE_SMART_APP,
        params: {},
    });
};
exports.closeSmartApp = closeSmartApp;
const onMoveToRoot = (handleMoveToRoot) => {
    return smartapp_bridge_1.default === null || smartapp_bridge_1.default === void 0 ? void 0 : smartapp_bridge_1.default.onReceive(event => {
        if (event.type === types_1.METHODS.MOVE_TO_ROOT)
            handleMoveToRoot();
    });
};
exports.onMoveToRoot = onMoveToRoot;
const exitSmartAppToCatalog = () => {
    return smartapp_bridge_1.default === null || smartapp_bridge_1.default === void 0 ? void 0 : smartapp_bridge_1.default.sendClientEvent({
        method: types_1.METHODS.OPEN_SMART_APP,
        params: { appId: '' },
    });
};
exports.exitSmartAppToCatalog = exitSmartAppToCatalog;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL3JvdXRpbmcvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsaUZBQStDO0FBQy9DLHVDQUErQztBQUUvQyxNQUFNLGNBQWMsR0FBRyxDQUFDLE1BQWUsRUFBRSxFQUFFO0lBQ3pDLE9BQU8seUJBQU0sYUFBTix5QkFBTSx1QkFBTix5QkFBTSxDQUFFLGVBQWUsQ0FBQztRQUM3QixNQUFNLEVBQUUsZUFBTyxDQUFDLGVBQWU7UUFDL0IsTUFBTSxFQUFFO1lBQ04sUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsZ0JBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLGdCQUFRLENBQUMsTUFBTTtTQUNuRDtLQUNGLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQTtBQW1DUSx3Q0FBYztBQWpDdkIsTUFBTSxhQUFhLEdBQUcsQ0FBQyxpQkFBMkIsRUFBRSxFQUFFO0lBQ3BELE9BQU8seUJBQU0sYUFBTix5QkFBTSx1QkFBTix5QkFBTSxDQUFFLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUMvQixJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssZUFBTyxDQUFDLFlBQVk7WUFBRSxpQkFBaUIsRUFBRSxDQUFBO0lBQzlELENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFBO0FBNkJ3QixzQ0FBYTtBQTNCdEMsTUFBTSxZQUFZLEdBQUcsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQW9DLEVBQUUsRUFBRTtJQUN6RSxPQUFPLHlCQUFNLGFBQU4seUJBQU0sdUJBQU4seUJBQU0sQ0FBRSxlQUFlLENBQUM7UUFDN0IsTUFBTSxFQUFFLGVBQU8sQ0FBQyxjQUFjO1FBQzlCLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRTtLQUMzQyxDQUFDLENBQUE7QUFDSixDQUFDLENBQUE7QUFzQnVDLG9DQUFZO0FBcEJwRCxNQUFNLGFBQWEsR0FBRyxHQUFHLEVBQUU7SUFDekIsT0FBTyx5QkFBTSxhQUFOLHlCQUFNLHVCQUFOLHlCQUFNLENBQUUsZUFBZSxDQUFDO1FBQzdCLE1BQU0sRUFBRSxlQUFPLENBQUMsZUFBZTtRQUMvQixNQUFNLEVBQUUsRUFBRTtLQUNYLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQTtBQWUwRixzQ0FBYTtBQWJ4RyxNQUFNLFlBQVksR0FBRyxDQUFDLGdCQUEwQixFQUFFLEVBQUU7SUFDbEQsT0FBTyx5QkFBTSxhQUFOLHlCQUFNLHVCQUFOLHlCQUFNLENBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQy9CLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxlQUFPLENBQUMsWUFBWTtZQUFFLGdCQUFnQixFQUFFLENBQUE7SUFDN0QsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDLENBQUE7QUFTNEUsb0NBQVk7QUFQekYsTUFBTSxxQkFBcUIsR0FBRyxHQUFHLEVBQUU7SUFDakMsT0FBTyx5QkFBTSxhQUFOLHlCQUFNLHVCQUFOLHlCQUFNLENBQUUsZUFBZSxDQUFDO1FBQzdCLE1BQU0sRUFBRSxlQUFPLENBQUMsY0FBYztRQUM5QixNQUFNLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFO0tBQ3RCLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQTtBQUVxRCxzREFBcUIifQ==