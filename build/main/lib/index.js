"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bridgeSendReady = void 0;
const smartapp_bridge_1 = __importDefault(require("@expressms/smartapp-bridge"));
const types_1 = require("../types");
const bridgeSendReady = (timeout) => {
    const event = {
        method: types_1.METHODS.READY,
        params: {},
    };
    return smartapp_bridge_1.default === null || smartapp_bridge_1.default === void 0 ? void 0 : smartapp_bridge_1.default.sendClientEvent(timeout ? Object.assign(Object.assign({}, event), { timeout }) : event);
};
exports.bridgeSendReady = bridgeSendReady;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGlGQUErQztBQUMvQyxvQ0FBa0M7QUFFbEMsTUFBTSxlQUFlLEdBQUcsQ0FBQyxPQUFnQixFQUFFLEVBQUU7SUFDM0MsTUFBTSxLQUFLLEdBQUc7UUFDWixNQUFNLEVBQUUsZUFBTyxDQUFDLEtBQUs7UUFDckIsTUFBTSxFQUFFLEVBQUU7S0FDWCxDQUFBO0lBQ0QsT0FBTyx5QkFBTSxhQUFOLHlCQUFNLHVCQUFOLHlCQUFNLENBQUUsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDLGlDQUFNLEtBQUssS0FBRSxPQUFPLElBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFBO0FBQ3pFLENBQUMsQ0FBQTtBQUdDLDBDQUFlIn0=