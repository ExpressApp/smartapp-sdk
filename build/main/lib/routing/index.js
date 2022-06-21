"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onBackPressed = exports.routingChanged = void 0;
const smartapp_bridge_1 = __importDefault(require("@unlimited/smartapp-bridge"));
const types_1 = require("../../types");
const routingChanged = async (isRoot) => {
    return smartapp_bridge_1.default === null || smartapp_bridge_1.default === void 0 ? void 0 : smartapp_bridge_1.default.sendClientEvent({
        method: types_1.EVENT_TYPES.ROUTING_CHANGED,
        params: {
            location: isRoot ? types_1.LOCATION.ROOT : types_1.LOCATION.NESTED,
        },
    });
};
exports.routingChanged = routingChanged;
const onBackPressed = async (handleBackPressed) => {
    return smartapp_bridge_1.default === null || smartapp_bridge_1.default === void 0 ? void 0 : smartapp_bridge_1.default.onReceive((event) => {
        if (event.type === types_1.EVENT_TYPES.BACK_PRESSED)
            handleBackPressed();
    });
};
exports.onBackPressed = onBackPressed;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL3JvdXRpbmcvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsaUZBQStDO0FBQy9DLHVDQUFtRDtBQUVuRCxNQUFNLGNBQWMsR0FBRyxLQUFLLEVBQUUsTUFBZSxFQUFFLEVBQUU7SUFDL0MsT0FBTyx5QkFBTSxhQUFOLHlCQUFNLHVCQUFOLHlCQUFNLENBQUUsZUFBZSxDQUFDO1FBQzdCLE1BQU0sRUFBRSxtQkFBVyxDQUFDLGVBQWU7UUFDbkMsTUFBTSxFQUFFO1lBQ04sUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsZ0JBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLGdCQUFRLENBQUMsTUFBTTtTQUNuRDtLQUNGLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQTtBQVVDLHdDQUFjO0FBUGhCLE1BQU0sYUFBYSxHQUFHLEtBQUssRUFBRSxpQkFBMkIsRUFBRSxFQUFFO0lBQzFELE9BQU8seUJBQU0sYUFBTix5QkFBTSx1QkFBTix5QkFBTSxDQUFFLFNBQVMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1FBQ2pDLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxtQkFBVyxDQUFDLFlBQVk7WUFBRSxpQkFBaUIsRUFBRSxDQUFBO0lBQ2xFLENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFBO0FBSUMsc0NBQWEifQ==