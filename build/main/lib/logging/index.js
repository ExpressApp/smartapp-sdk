"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ready = void 0;
const smartapp_bridge_1 = __importDefault(require("@expressms/smartapp-bridge"));
const index_1 = require("../index");
const ready = async (timeout) => {
    var _a, _b;
    const response = await (0, index_1.bridgeSendReady)(timeout);
    const isLogsEnabled = (_a = response === null || response === void 0 ? void 0 : response.payload) === null || _a === void 0 ? void 0 : _a.logsEnabled;
    if (isLogsEnabled)
        (_b = smartapp_bridge_1.default === null || smartapp_bridge_1.default === void 0 ? void 0 : smartapp_bridge_1.default.enableLogs) === null || _b === void 0 ? void 0 : _b.call(smartapp_bridge_1.default);
    return response;
};
exports.ready = ready;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2xvZ2dpbmcvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsaUZBQStDO0FBRS9DLG9DQUEwQztBQUUxQyxNQUFNLEtBQUssR0FBRyxLQUFLLEVBQUUsT0FBZ0IsRUFBRSxFQUFFOztJQUN2QyxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUEsdUJBQWUsRUFBQyxPQUFPLENBQXVCLENBQUE7SUFDckUsTUFBTSxhQUFhLEdBQUcsTUFBQSxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsT0FBTywwQ0FBRSxXQUFXLENBQUE7SUFFcEQsSUFBSSxhQUFhO1FBQUUsTUFBQyx5QkFBYyxhQUFkLHlCQUFNLHVCQUFOLHlCQUFNLENBQVUsVUFBVSx5RUFBSSxDQUFBO0lBRWxELE9BQU8sUUFBUSxDQUFBO0FBQ2pCLENBQUMsQ0FBQTtBQUdDLHNCQUFLIn0=