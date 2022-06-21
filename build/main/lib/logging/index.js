"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ready = void 0;
const smartapp_bridge_1 = __importDefault(require("@unlimited/smartapp-bridge"));
const index_1 = require("../index");
const ready = async () => {
    var _a, _b;
    const response = await (0, index_1.bridgeSendReady)();
    const Bridge = smartapp_bridge_1.default;
    // TODO fix when enableLogs is present in bridge
    const isLogsEnabled = (_a = response === null || response === void 0 ? void 0 : response.payload) === null || _a === void 0 ? void 0 : _a.logsEnabled;
    if (isLogsEnabled)
        (_b = Bridge === null || Bridge === void 0 ? void 0 : Bridge.enableLogs) === null || _b === void 0 ? void 0 : _b.call(Bridge);
    return new Promise(resolve => resolve(isLogsEnabled));
};
exports.ready = ready;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2xvZ2dpbmcvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsaUZBQStDO0FBQy9DLG9DQUEwQztBQUUxQyxNQUFNLEtBQUssR0FBMkIsS0FBSyxJQUFJLEVBQUU7O0lBQy9DLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBQSx1QkFBZSxHQUlyQyxDQUFBO0lBQ0QsTUFBTSxNQUFNLEdBQUcseUJBRWQsQ0FBQTtJQUNELGdEQUFnRDtJQUVoRCxNQUFNLGFBQWEsR0FBRyxNQUFBLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRSxPQUFPLDBDQUFFLFdBQVcsQ0FBQTtJQUVwRCxJQUFJLGFBQWE7UUFBRSxNQUFBLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxVQUFVLHNEQUFJLENBQUE7SUFFekMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFBO0FBQ3ZELENBQUMsQ0FBQTtBQUdDLHNCQUFLIn0=