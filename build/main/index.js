"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useQuery = exports.OfflinePluginRuntime = exports.onNotification = exports.createPersonalChat = exports.sendMessage = exports.getContact = exports.addContact = exports.onBackPressed = exports.routingChanged = exports.ready = exports.Bridge = void 0;
const smartapp_bridge_1 = __importDefault(require("@unlimited/smartapp-bridge"));
exports.Bridge = smartapp_bridge_1.default;
const OfflinePluginRuntime = __importStar(require("offline-plugin/runtime"));
exports.OfflinePluginRuntime = OfflinePluginRuntime;
const contacts_1 = require("./lib/contacts");
Object.defineProperty(exports, "addContact", { enumerable: true, get: function () { return contacts_1.addContact; } });
Object.defineProperty(exports, "createPersonalChat", { enumerable: true, get: function () { return contacts_1.createPersonalChat; } });
Object.defineProperty(exports, "getContact", { enumerable: true, get: function () { return contacts_1.getContact; } });
Object.defineProperty(exports, "sendMessage", { enumerable: true, get: function () { return contacts_1.sendMessage; } });
const _helpers_1 = require("./lib/helpers/ helpers");
Object.defineProperty(exports, "useQuery", { enumerable: true, get: function () { return _helpers_1.useQuery; } });
const logging_1 = require("./lib/logging");
Object.defineProperty(exports, "ready", { enumerable: true, get: function () { return logging_1.ready; } });
const notification_1 = require("./lib/notification");
Object.defineProperty(exports, "onNotification", { enumerable: true, get: function () { return notification_1.onNotification; } });
const routing_1 = require("./lib/routing");
Object.defineProperty(exports, "onBackPressed", { enumerable: true, get: function () { return routing_1.onBackPressed; } });
Object.defineProperty(exports, "routingChanged", { enumerable: true, get: function () { return routing_1.routingChanged; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpRkFBK0M7QUFTN0MsaUJBVEsseUJBQU0sQ0FTTDtBQVJSLDZFQUE4RDtBQWlCNUQsb0RBQW9CO0FBaEJ0Qiw2Q0FBd0Y7QUFXdEYsMkZBWE8scUJBQVUsT0FXUDtBQUdWLG1HQWRtQiw2QkFBa0IsT0FjbkI7QUFGbEIsMkZBWnVDLHFCQUFVLE9BWXZDO0FBQ1YsNEZBYm1ELHNCQUFXLE9BYW5EO0FBWmIscURBQWlEO0FBZ0IvQyx5RkFoQk8sbUJBQVEsT0FnQlA7QUFmViwyQ0FBcUM7QUFNbkMsc0ZBTk8sZUFBSyxPQU1QO0FBTFAscURBQW1EO0FBWWpELCtGQVpPLDZCQUFjLE9BWVA7QUFYaEIsMkNBQTZEO0FBTTNELDhGQU5PLHVCQUFhLE9BTVA7QUFEYiwrRkFMc0Isd0JBQWMsT0FLdEIifQ==