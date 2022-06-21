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
exports.OfflinePluginRuntime = exports.onNotification = exports.createPersonalChat = exports.getContact = exports.addContact = exports.onBackPressed = exports.routingChanged = exports.ready = exports.Bridge = void 0;
const smartapp_bridge_1 = __importDefault(require("@unlimited/smartapp-bridge"));
exports.Bridge = smartapp_bridge_1.default;
const OfflinePluginRuntime = __importStar(require("offline-plugin/runtime"));
exports.OfflinePluginRuntime = OfflinePluginRuntime;
const contacts_1 = require("./lib/contacts");
Object.defineProperty(exports, "addContact", { enumerable: true, get: function () { return contacts_1.addContact; } });
Object.defineProperty(exports, "createPersonalChat", { enumerable: true, get: function () { return contacts_1.createPersonalChat; } });
Object.defineProperty(exports, "getContact", { enumerable: true, get: function () { return contacts_1.getContact; } });
const logging_1 = require("./lib/logging");
Object.defineProperty(exports, "ready", { enumerable: true, get: function () { return logging_1.ready; } });
const notification_1 = require("./lib/notification");
Object.defineProperty(exports, "onNotification", { enumerable: true, get: function () { return notification_1.onNotification; } });
const routing_1 = require("./lib/routing");
Object.defineProperty(exports, "onBackPressed", { enumerable: true, get: function () { return routing_1.onBackPressed; } });
Object.defineProperty(exports, "routingChanged", { enumerable: true, get: function () { return routing_1.routingChanged; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpRkFBK0M7QUFRN0MsaUJBUksseUJBQU0sQ0FRTDtBQVBSLDZFQUE4RDtBQWU1RCxvREFBb0I7QUFkdEIsNkNBQTJFO0FBVXpFLDJGQVZPLHFCQUFVLE9BVVA7QUFFVixtR0FabUIsNkJBQWtCLE9BWW5CO0FBRGxCLDJGQVh1QyxxQkFBVSxPQVd2QztBQVZaLDJDQUFxQztBQU1uQyxzRkFOTyxlQUFLLE9BTVA7QUFMUCxxREFBbUQ7QUFXakQsK0ZBWE8sNkJBQWMsT0FXUDtBQVZoQiwyQ0FBNkQ7QUFNM0QsOEZBTk8sdUJBQWEsT0FNUDtBQURiLCtGQUxzQix3QkFBYyxPQUt0QiJ9