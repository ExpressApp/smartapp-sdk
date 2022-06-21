"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bridgeSendReady = void 0;
const smartapp_bridge_1 = __importDefault(require("@unlimited/smartapp-bridge"));
const types_1 = require("../types");
const bridgeSendReady = async () => {
    return smartapp_bridge_1.default === null || smartapp_bridge_1.default === void 0 ? void 0 : smartapp_bridge_1.default.sendClientEvent({
        method: types_1.EVENT_TYPES.READY,
        params: {},
    });
};
exports.bridgeSendReady = bridgeSendReady;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGlGQUErQztBQUMvQyxvQ0FBc0M7QUFFdEMsTUFBTSxlQUFlLEdBQUcsS0FBSyxJQUFJLEVBQUU7SUFDakMsT0FBTyx5QkFBTSxhQUFOLHlCQUFNLHVCQUFOLHlCQUFNLENBQUUsZUFBZSxDQUFDO1FBQzdCLE1BQU0sRUFBRSxtQkFBVyxDQUFDLEtBQUs7UUFDekIsTUFBTSxFQUFFLEVBQUU7S0FDWCxDQUFDLENBQUE7QUFDSixDQUFDLENBQUE7QUFHQywwQ0FBZSJ9