"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exitSmartAppToCatalog = exports.openSmartApp = exports.onBackPressed = exports.routingChanged = void 0;
const smartapp_bridge_1 = __importDefault(require("@expressms/smartapp-bridge"));
const types_1 = require("../../types");
const routingChanged = async (isRoot) => {
    return smartapp_bridge_1.default === null || smartapp_bridge_1.default === void 0 ? void 0 : smartapp_bridge_1.default.sendClientEvent({
        method: types_1.METHODS.ROUTING_CHANGED,
        params: {
            location: isRoot ? types_1.LOCATION.ROOT : types_1.LOCATION.NESTED,
        },
    });
};
exports.routingChanged = routingChanged;
const onBackPressed = async (handleBackPressed) => {
    return smartapp_bridge_1.default === null || smartapp_bridge_1.default === void 0 ? void 0 : smartapp_bridge_1.default.onReceive((event) => {
        if (event.type === types_1.METHODS.BACK_PRESSED)
            handleBackPressed();
    });
};
exports.onBackPressed = onBackPressed;
const openSmartApp = async (appId, meta) => {
    return smartapp_bridge_1.default === null || smartapp_bridge_1.default === void 0 ? void 0 : smartapp_bridge_1.default.sendClientEvent({
        method: types_1.METHODS.OPEN_SMART_APP,
        params: {
            appId,
            meta,
        }
    });
};
exports.openSmartApp = openSmartApp;
const exitSmartAppToCatalog = async () => {
    return smartapp_bridge_1.default === null || smartapp_bridge_1.default === void 0 ? void 0 : smartapp_bridge_1.default.sendClientEvent({
        method: types_1.METHODS.OPEN_SMART_APP,
        params: {
            appId: ''
        }
    });
};
exports.exitSmartAppToCatalog = exitSmartAppToCatalog;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL3JvdXRpbmcvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsaUZBQStDO0FBQy9DLHVDQUErQztBQUUvQyxNQUFNLGNBQWMsR0FBRyxLQUFLLEVBQUUsTUFBZSxFQUFFLEVBQUU7SUFDL0MsT0FBTyx5QkFBTSxhQUFOLHlCQUFNLHVCQUFOLHlCQUFNLENBQUUsZUFBZSxDQUFDO1FBQzdCLE1BQU0sRUFBRSxlQUFPLENBQUMsZUFBZTtRQUMvQixNQUFNLEVBQUU7WUFDTixRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxnQkFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsZ0JBQVEsQ0FBQyxNQUFNO1NBQ25EO0tBQ0YsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFBO0FBNkJDLHdDQUFjO0FBMUJoQixNQUFNLGFBQWEsR0FBRyxLQUFLLEVBQUUsaUJBQTJCLEVBQUUsRUFBRTtJQUMxRCxPQUFPLHlCQUFNLGFBQU4seUJBQU0sdUJBQU4seUJBQU0sQ0FBRSxTQUFTLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUNqQyxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssZUFBTyxDQUFDLFlBQVk7WUFBRSxpQkFBaUIsRUFBRSxDQUFBO0lBQzlELENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFBO0FBdUJDLHNDQUFhO0FBckJmLE1BQU0sWUFBWSxHQUFHLEtBQUssRUFBRSxLQUFhLEVBQUUsSUFBWSxFQUFFLEVBQUU7SUFDekQsT0FBTyx5QkFBTSxhQUFOLHlCQUFNLHVCQUFOLHlCQUFNLENBQUUsZUFBZSxDQUFDO1FBQzdCLE1BQU0sRUFBRSxlQUFPLENBQUMsY0FBYztRQUM5QixNQUFNLEVBQUU7WUFDTixLQUFLO1lBQ0wsSUFBSTtTQUNMO0tBQ0YsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFBO0FBY0Msb0NBQVk7QUFaZCxNQUFNLHFCQUFxQixHQUFHLEtBQUssSUFBSSxFQUFFO0lBQ3ZDLE9BQU8seUJBQU0sYUFBTix5QkFBTSx1QkFBTix5QkFBTSxDQUFFLGVBQWUsQ0FBQztRQUM3QixNQUFNLEVBQUUsZUFBTyxDQUFDLGNBQWM7UUFDOUIsTUFBTSxFQUFFO1lBQ04sS0FBSyxFQUFFLEVBQUU7U0FDVjtLQUNGLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQTtBQU1DLHNEQUFxQiJ9