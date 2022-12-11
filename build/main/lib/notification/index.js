"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onNotification = void 0;
const smartapp_bridge_1 = __importDefault(require("@expressms/smartapp-bridge"));
const types_1 = require("../../types");
/**
 * @param handleNotification
 */
const onNotification = async (handleNotification) => {
    const response = await (smartapp_bridge_1.default === null || smartapp_bridge_1.default === void 0 ? void 0 : smartapp_bridge_1.default.sendClientEvent({
        method: types_1.METHODS.NOTIFICATION,
        params: {},
    }));
    return smartapp_bridge_1.default === null || smartapp_bridge_1.default === void 0 ? void 0 : smartapp_bridge_1.default.onReceive((event) => {
        if ((event === null || event === void 0 ? void 0 : event.type) === types_1.METHODS.NOTIFICATION) {
            handleNotification(response);
        }
    });
};
exports.onNotification = onNotification;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL25vdGlmaWNhdGlvbi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxpRkFBK0M7QUFDL0MsdUNBQXFDO0FBRXJDOztHQUVHO0FBQ0gsTUFBTSxjQUFjLEdBQUcsS0FBSyxFQUFFLGtCQUE0QixFQUFFLEVBQUU7SUFDNUQsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFBLHlCQUFNLGFBQU4seUJBQU0sdUJBQU4seUJBQU0sQ0FBRSxlQUFlLENBQUM7UUFDN0MsTUFBTSxFQUFFLGVBQU8sQ0FBQyxZQUFZO1FBQzVCLE1BQU0sRUFBRSxFQUFFO0tBQ1gsQ0FBQyxDQUFBLENBQUE7SUFFRixPQUFPLHlCQUFNLGFBQU4seUJBQU0sdUJBQU4seUJBQU0sQ0FBRSxTQUFTLENBQUMsQ0FBQyxLQUFVLEVBQUUsRUFBRTtRQUN0QyxJQUFJLENBQUEsS0FBSyxhQUFMLEtBQUssdUJBQUwsS0FBSyxDQUFFLElBQUksTUFBSyxlQUFPLENBQUMsWUFBWSxFQUFFO1lBQ3hDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFBO1NBQzdCO0lBQ0gsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDLENBQUE7QUFHQyx3Q0FBYyJ9