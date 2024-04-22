/** @format */

import { receiveFromQueue } from "./auth";
import { receiveFromAppointmentQueue } from "./appointment";
export const callRecivers = async () => {
    receiveFromQueue("registration");
    receiveFromQueue("verification");
    receiveFromAppointmentQueue();
};
