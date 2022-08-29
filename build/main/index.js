"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useQuery = exports.onNotification = exports.createPersonalChat = exports.sendMessage = exports.getContact = exports.addContact = exports.onBackPressed = exports.routingChanged = exports.ready = exports.Bridge = void 0;
const smartapp_bridge_1 = __importDefault(require("@unlimited/smartapp-bridge"));
exports.Bridge = smartapp_bridge_1.default;
const contacts_1 = require("./lib/contacts");
Object.defineProperty(exports, "addContact", { enumerable: true, get: function () { return contacts_1.addContact; } });
Object.defineProperty(exports, "createPersonalChat", { enumerable: true, get: function () { return contacts_1.createPersonalChat; } });
Object.defineProperty(exports, "getContact", { enumerable: true, get: function () { return contacts_1.getContact; } });
Object.defineProperty(exports, "sendMessage", { enumerable: true, get: function () { return contacts_1.sendMessage; } });
const helpers_1 = require("./lib/helpers/helpers");
Object.defineProperty(exports, "useQuery", { enumerable: true, get: function () { return helpers_1.useQuery; } });
const logging_1 = require("./lib/logging");
Object.defineProperty(exports, "ready", { enumerable: true, get: function () { return logging_1.ready; } });
const notification_1 = require("./lib/notification");
Object.defineProperty(exports, "onNotification", { enumerable: true, get: function () { return notification_1.onNotification; } });
const routing_1 = require("./lib/routing");
Object.defineProperty(exports, "onBackPressed", { enumerable: true, get: function () { return routing_1.onBackPressed; } });
Object.defineProperty(exports, "routingChanged", { enumerable: true, get: function () { return routing_1.routingChanged; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsaUZBQStDO0FBUTdDLGlCQVJLLHlCQUFNLENBUUw7QUFQUiw2Q0FBd0Y7QUFXdEYsMkZBWE8scUJBQVUsT0FXUDtBQUdWLG1HQWRtQiw2QkFBa0IsT0FjbkI7QUFGbEIsMkZBWnVDLHFCQUFVLE9BWXZDO0FBQ1YsNEZBYm1ELHNCQUFXLE9BYW5EO0FBWmIsbURBQWdEO0FBZTlDLHlGQWZPLGtCQUFRLE9BZVA7QUFkViwyQ0FBcUM7QUFNbkMsc0ZBTk8sZUFBSyxPQU1QO0FBTFAscURBQW1EO0FBWWpELCtGQVpPLDZCQUFjLE9BWVA7QUFYaEIsMkNBQTZEO0FBTTNELDhGQU5PLHVCQUFhLE9BTVA7QUFEYiwrRkFMc0Isd0JBQWMsT0FLdEIifQ==