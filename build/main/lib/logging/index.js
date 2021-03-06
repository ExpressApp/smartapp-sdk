"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ready = void 0;
const smartapp_bridge_1 = __importDefault(require("@unlimited/smartapp-bridge"));
const index_1 = require("../index");
const ready = async (timeout) => {
    var _a, _b;
    const response = await (0, index_1.bridgeSendReady)(timeout);
    const Bridge = smartapp_bridge_1.default;
    const isLogsEnabled = (_a = response === null || response === void 0 ? void 0 : response.payload) === null || _a === void 0 ? void 0 : _a.logsEnabled;
    if (isLogsEnabled)
        (_b = Bridge === null || Bridge === void 0 ? void 0 : Bridge.enableLogs) === null || _b === void 0 ? void 0 : _b.call(Bridge);
    return response;
};
exports.ready = ready;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2xvZ2dpbmcvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsaUZBQStDO0FBQy9DLG9DQUEwQztBQWExQyxNQUFNLEtBQUssR0FBRyxLQUFLLEVBQUUsT0FBZ0IsRUFBRSxFQUFFOztJQUN2QyxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUEsdUJBQWUsRUFBQyxPQUFPLENBQThCLENBQUE7SUFDNUUsTUFBTSxNQUFNLEdBQUcseUJBQTJCLENBQUE7SUFDMUMsTUFBTSxhQUFhLEdBQUcsTUFBQSxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsT0FBTywwQ0FBRSxXQUFXLENBQUE7SUFFcEQsSUFBSSxhQUFhO1FBQUUsTUFBQSxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsVUFBVSxzREFBSSxDQUFBO0lBRXpDLE9BQU8sUUFBUSxDQUFBO0FBQ2pCLENBQUMsQ0FBQTtBQUdDLHNCQUFLIn0=