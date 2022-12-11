"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exitSmartAppToCatalog = exports.openSmartApp = exports.onBackPressed = exports.routingChanged = void 0;
const smartapp_bridge_1 = __importDefault(require("@expressms/smartapp-bridge"));
const types_1 = require("../../types");
/**
 * @param isRoot
 */
const routingChanged = (isRoot) => {
    return smartapp_bridge_1.default === null || smartapp_bridge_1.default === void 0 ? void 0 : smartapp_bridge_1.default.sendClientEvent({
        method: types_1.METHODS.ROUTING_CHANGED,
        params: {
            location: isRoot ? types_1.LOCATION.ROOT : types_1.LOCATION.NESTED,
        },
    });
};
exports.routingChanged = routingChanged;
/**
 * @param handleBackPressed
 */
const onBackPressed = (handleBackPressed) => {
    return smartapp_bridge_1.default === null || smartapp_bridge_1.default === void 0 ? void 0 : smartapp_bridge_1.default.onReceive((event) => {
        if (event.type === types_1.METHODS.BACK_PRESSED)
            handleBackPressed();
    });
};
exports.onBackPressed = onBackPressed;
/**
 * @param appId
 * @param meta
 */
const openSmartApp = (appId, meta) => {
    return smartapp_bridge_1.default === null || smartapp_bridge_1.default === void 0 ? void 0 : smartapp_bridge_1.default.sendClientEvent({
        method: types_1.METHODS.OPEN_SMART_APP,
        params: {
            appId,
            meta,
        },
    });
};
exports.openSmartApp = openSmartApp;
const exitSmartAppToCatalog = () => {
    return smartapp_bridge_1.default === null || smartapp_bridge_1.default === void 0 ? void 0 : smartapp_bridge_1.default.sendClientEvent({
        method: types_1.METHODS.OPEN_SMART_APP,
        params: {
            appId: "",
        },
    });
};
exports.exitSmartAppToCatalog = exitSmartAppToCatalog;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL3JvdXRpbmcvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsaUZBQStDO0FBQy9DLHVDQUErQztBQUUvQzs7R0FFRztBQUNILE1BQU0sY0FBYyxHQUFHLENBQUMsTUFBZSxFQUFFLEVBQUU7SUFDekMsT0FBTyx5QkFBTSxhQUFOLHlCQUFNLHVCQUFOLHlCQUFNLENBQUUsZUFBZSxDQUFDO1FBQzdCLE1BQU0sRUFBRSxlQUFPLENBQUMsZUFBZTtRQUMvQixNQUFNLEVBQUU7WUFDTixRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxnQkFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsZ0JBQVEsQ0FBQyxNQUFNO1NBQ25EO0tBQ0YsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFBO0FBbUNDLHdDQUFjO0FBakNoQjs7R0FFRztBQUNILE1BQU0sYUFBYSxHQUFHLENBQUMsaUJBQTJCLEVBQUUsRUFBRTtJQUNwRCxPQUFPLHlCQUFNLGFBQU4seUJBQU0sdUJBQU4seUJBQU0sQ0FBRSxTQUFTLENBQUMsQ0FBQyxLQUFVLEVBQUUsRUFBRTtRQUN0QyxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssZUFBTyxDQUFDLFlBQVk7WUFBRSxpQkFBaUIsRUFBRSxDQUFBO0lBQzlELENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFBO0FBMkJDLHNDQUFhO0FBekJmOzs7R0FHRztBQUNILE1BQU0sWUFBWSxHQUFHLENBQUMsS0FBYSxFQUFFLElBQVUsRUFBRSxFQUFFO0lBQ2pELE9BQU8seUJBQU0sYUFBTix5QkFBTSx1QkFBTix5QkFBTSxDQUFFLGVBQWUsQ0FBQztRQUM3QixNQUFNLEVBQUUsZUFBTyxDQUFDLGNBQWM7UUFDOUIsTUFBTSxFQUFFO1lBQ04sS0FBSztZQUNMLElBQUk7U0FDTDtLQUNGLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQTtBQWNDLG9DQUFZO0FBWmQsTUFBTSxxQkFBcUIsR0FBRyxHQUFHLEVBQUU7SUFDakMsT0FBTyx5QkFBTSxhQUFOLHlCQUFNLHVCQUFOLHlCQUFNLENBQUUsZUFBZSxDQUFDO1FBQzdCLE1BQU0sRUFBRSxlQUFPLENBQUMsY0FBYztRQUM5QixNQUFNLEVBQUU7WUFDTixLQUFLLEVBQUUsRUFBRTtTQUNWO0tBQ0YsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFBO0FBTUMsc0RBQXFCIn0=