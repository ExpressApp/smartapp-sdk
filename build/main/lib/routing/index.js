"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exitSmartAppToCatalog = exports.onMoveToRoot = exports.openSmartApp = exports.onBackPressed = exports.routingChanged = void 0;
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
    return smartapp_bridge_1.default === null || smartapp_bridge_1.default === void 0 ? void 0 : smartapp_bridge_1.default.onReceive((event) => {
        if (event.type === types_1.METHODS.BACK_PRESSED)
            handleBackPressed();
    });
};
exports.onBackPressed = onBackPressed;
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
        params: {
            appId: "",
        },
    });
};
exports.exitSmartAppToCatalog = exitSmartAppToCatalog;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL3JvdXRpbmcvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsaUZBQStDO0FBQy9DLHVDQUErQztBQUUvQyxNQUFNLGNBQWMsR0FBRyxDQUFDLE1BQWUsRUFBRSxFQUFFO0lBQ3pDLE9BQU8seUJBQU0sYUFBTix5QkFBTSx1QkFBTix5QkFBTSxDQUFFLGVBQWUsQ0FBQztRQUM3QixNQUFNLEVBQUUsZUFBTyxDQUFDLGVBQWU7UUFDL0IsTUFBTSxFQUFFO1lBQ04sUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsZ0JBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLGdCQUFRLENBQUMsTUFBTTtTQUNuRDtLQUNGLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQTtBQWtDQyx3Q0FBYztBQWhDaEIsTUFBTSxhQUFhLEdBQUcsQ0FBQyxpQkFBMkIsRUFBRSxFQUFFO0lBQ3BELE9BQU8seUJBQU0sYUFBTix5QkFBTSx1QkFBTix5QkFBTSxDQUFFLFNBQVMsQ0FBQyxDQUFDLEtBQVUsRUFBRSxFQUFFO1FBQ3RDLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxlQUFPLENBQUMsWUFBWTtZQUFFLGlCQUFpQixFQUFFLENBQUE7SUFDOUQsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDLENBQUE7QUE2QkMsc0NBQWE7QUEzQmYsTUFBTSxZQUFZLEdBQUcsQ0FBQyxLQUFhLEVBQUUsSUFBVSxFQUFFLEVBQUU7SUFDakQsT0FBTyx5QkFBTSxhQUFOLHlCQUFNLHVCQUFOLHlCQUFNLENBQUUsZUFBZSxDQUFDO1FBQzdCLE1BQU0sRUFBRSxlQUFPLENBQUMsY0FBYztRQUM5QixNQUFNLEVBQUU7WUFDTixLQUFLO1lBQ0wsSUFBSTtTQUNMO0tBQ0YsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFBO0FBb0JDLG9DQUFZO0FBbEJkLE1BQU0sWUFBWSxHQUFHLENBQUMsZ0JBQTBCLEVBQUUsRUFBRTtJQUNsRCxPQUFPLHlCQUFNLGFBQU4seUJBQU0sdUJBQU4seUJBQU0sQ0FBRSxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDL0IsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLGVBQU8sQ0FBQyxZQUFZO1lBQUUsZ0JBQWdCLEVBQUUsQ0FBQTtJQUM3RCxDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQTtBQWVDLG9DQUFZO0FBYmQsTUFBTSxxQkFBcUIsR0FBRyxHQUFHLEVBQUU7SUFDakMsT0FBTyx5QkFBTSxhQUFOLHlCQUFNLHVCQUFOLHlCQUFNLENBQUUsZUFBZSxDQUFDO1FBQzdCLE1BQU0sRUFBRSxlQUFPLENBQUMsY0FBYztRQUM5QixNQUFNLEVBQUU7WUFDTixLQUFLLEVBQUUsRUFBRTtTQUNWO0tBQ0YsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFBO0FBT0Msc0RBQXFCIn0=