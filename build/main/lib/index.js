"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bridgeSendReady = void 0;
const smartapp_bridge_1 = __importDefault(require("@expressms/smartapp-bridge"));
const types_1 = require("../types");
/**
 * @param timeout
 */
const bridgeSendReady = (timeout) => {
    const event = {
        method: types_1.METHODS.READY,
        params: {},
    };
    return smartapp_bridge_1.default === null || smartapp_bridge_1.default === void 0 ? void 0 : smartapp_bridge_1.default.sendClientEvent(timeout ? Object.assign(Object.assign({}, event), { timeout }) : event);
};
exports.bridgeSendReady = bridgeSendReady;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGlGQUErQztBQUMvQyxvQ0FBa0M7QUFFbEM7O0dBRUc7QUFDSCxNQUFNLGVBQWUsR0FBRyxDQUFDLE9BQWdCLEVBQUUsRUFBRTtJQUMzQyxNQUFNLEtBQUssR0FBRztRQUNaLE1BQU0sRUFBRSxlQUFPLENBQUMsS0FBSztRQUNyQixNQUFNLEVBQUUsRUFBRTtLQUNYLENBQUE7SUFDRCxPQUFPLHlCQUFNLGFBQU4seUJBQU0sdUJBQU4seUJBQU0sQ0FBRSxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUMsaUNBQU0sS0FBSyxLQUFFLE9BQU8sSUFBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUE7QUFDekUsQ0FBQyxDQUFBO0FBR0MsMENBQWUifQ==