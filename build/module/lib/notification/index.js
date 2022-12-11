import bridge from "@expressms/smartapp-bridge";
import { METHODS } from "../../types";
/**
 * @param handleNotification
 */
const onNotification = async (handleNotification) => {
    const response = await bridge?.sendClientEvent({
        method: METHODS.NOTIFICATION,
        params: {},
    });
    return bridge?.onReceive((event) => {
        if (event?.type === METHODS.NOTIFICATION) {
            handleNotification(response);
        }
    });
};
export { onNotification, };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL25vdGlmaWNhdGlvbi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLE1BQU0sTUFBTSw0QkFBNEIsQ0FBQTtBQUMvQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sYUFBYSxDQUFBO0FBRXJDOztHQUVHO0FBQ0gsTUFBTSxjQUFjLEdBQUcsS0FBSyxFQUFFLGtCQUE0QixFQUFFLEVBQUU7SUFDNUQsTUFBTSxRQUFRLEdBQUcsTUFBTSxNQUFNLEVBQUUsZUFBZSxDQUFDO1FBQzdDLE1BQU0sRUFBRSxPQUFPLENBQUMsWUFBWTtRQUM1QixNQUFNLEVBQUUsRUFBRTtLQUNYLENBQUMsQ0FBQTtJQUVGLE9BQU8sTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDLEtBQVUsRUFBRSxFQUFFO1FBQ3RDLElBQUksS0FBSyxFQUFFLElBQUksS0FBSyxPQUFPLENBQUMsWUFBWSxFQUFFO1lBQ3hDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFBO1NBQzdCO0lBQ0gsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDLENBQUE7QUFFRCxPQUFPLEVBQ0wsY0FBYyxHQUNmLENBQUEifQ==