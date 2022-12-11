"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchCorporatePhonebook = exports.getChats = exports.openClientSettings = exports.useQuery = exports.exitSmartAppToCatalog = exports.openSmartApp = exports.sendMessage = exports.onNotification = exports.createPersonalChat = exports.getContact = exports.addContact = exports.onBackPressed = exports.routingChanged = exports.ready = exports.Bridge = void 0;
const smartapp_bridge_1 = __importDefault(require("@expressms/smartapp-bridge"));
exports.Bridge = smartapp_bridge_1.default;
const client_1 = require("./lib/client");
Object.defineProperty(exports, "getChats", { enumerable: true, get: function () { return client_1.getChats; } });
Object.defineProperty(exports, "openClientSettings", { enumerable: true, get: function () { return client_1.openClientSettings; } });
Object.defineProperty(exports, "searchCorporatePhonebook", { enumerable: true, get: function () { return client_1.searchCorporatePhonebook; } });
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
Object.defineProperty(exports, "exitSmartAppToCatalog", { enumerable: true, get: function () { return routing_1.exitSmartAppToCatalog; } });
Object.defineProperty(exports, "onBackPressed", { enumerable: true, get: function () { return routing_1.onBackPressed; } });
Object.defineProperty(exports, "openSmartApp", { enumerable: true, get: function () { return routing_1.openSmartApp; } });
Object.defineProperty(exports, "routingChanged", { enumerable: true, get: function () { return routing_1.routingChanged; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsaUZBQStDO0FBUzdDLGlCQVRLLHlCQUFNLENBU0w7QUFSUix5Q0FBcUY7QUFxQm5GLHlGQXJCTyxpQkFBUSxPQXFCUDtBQURSLG1HQXBCaUIsMkJBQWtCLE9Bb0JqQjtBQUVsQix5R0F0QnFDLGlDQUF3QixPQXNCckM7QUFyQjFCLDZDQUF3RjtBQVd0RiwyRkFYTyxxQkFBVSxPQVdQO0FBRVYsbUdBYm1CLDZCQUFrQixPQWFuQjtBQURsQiwyRkFadUMscUJBQVUsT0FZdkM7QUFHViw0RkFmbUQsc0JBQVcsT0FlbkQ7QUFkYixtREFBZ0Q7QUFpQjlDLHlGQWpCTyxrQkFBUSxPQWlCUDtBQWhCViwyQ0FBcUM7QUFNbkMsc0ZBTk8sZUFBSyxPQU1QO0FBTFAscURBQW1EO0FBV2pELCtGQVhPLDZCQUFjLE9BV1A7QUFWaEIsMkNBQWtHO0FBYWhHLHNHQWJPLCtCQUFxQixPQWFQO0FBUHJCLDhGQU44Qix1QkFBYSxPQU05QjtBQU1iLDZGQVo2QyxzQkFBWSxPQVk3QztBQVBaLCtGQUwyRCx3QkFBYyxPQUszRCJ9