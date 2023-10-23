"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ready = void 0;
const smartapp_bridge_1 = __importDefault(require("@expressms/smartapp-bridge"));
const types_1 = require("../../types");
const index_1 = require("../index");
const ready = async (timeout) => {
    var _a, _b, _c;
    const response = await (0, index_1.bridgeSendReady)(timeout);
    const isLogsEnabled = (_a = response === null || response === void 0 ? void 0 : response.payload) === null || _a === void 0 ? void 0 : _a.logsEnabled;
    if (!smartapp_bridge_1.default)
        return Promise.reject(types_1.ERROR_CODES.NO_BRIDGE);
    if (isLogsEnabled)
        (_c = (_b = smartapp_bridge_1.default).enableLogs) === null || _c === void 0 ? void 0 : _c.call(_b);
    return response;
};
exports.ready = ready;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2xvZ2dpbmcvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsaUZBQStDO0FBQy9DLHVDQUE2RDtBQUM3RCxvQ0FBMEM7QUFFMUMsTUFBTSxLQUFLLEdBQUcsS0FBSyxFQUFFLE9BQWdCLEVBQUUsRUFBRTs7SUFDdkMsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFBLHVCQUFlLEVBQUMsT0FBTyxDQUF1QixDQUFBO0lBQ3JFLE1BQU0sYUFBYSxHQUFHLE1BQUEsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLE9BQU8sMENBQUUsV0FBVyxDQUFBO0lBRXBELElBQUksQ0FBQyx5QkFBTTtRQUFFLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxtQkFBVyxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBRXpELElBQUksYUFBYTtRQUFFLE1BQUEsTUFBQyx5QkFBYyxFQUFDLFVBQVUsa0RBQUksQ0FBQTtJQUVqRCxPQUFPLFFBQVEsQ0FBQTtBQUNqQixDQUFDLENBQUE7QUFHQyxzQkFBSyJ9