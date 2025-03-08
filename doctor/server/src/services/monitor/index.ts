import moment from "moment";
import { statusMonitor } from "./status";
import { newEvent } from "../events";
import { FrontendEvent, ProcessStatus } from "../../model/FrontendEvents";
import { memoryMonitor } from "./memory";
// import { cpuMonitor } from "./cpu";
import { initMonitorRequest, requestMonitor } from "./request";
import { cpuMonitor } from "./cpu";

// siempre debe ser 1000 o 2000 o 3000
export const interval = 2000;
const format = "mm:ss";

export const initMonitor = (pid: number) => {
    initMonitorRequest();
    let intervalCount = 0;

    setInterval(() => {
        const date = moment().format(format);
        intervalCount += interval;
        const event: FrontendEvent = {
            items: [],
            snapshot: date
        }

        if(intervalCount >= 60000) {
            const requestMetrics = requestMonitor();
            if(requestMetrics) {
                event.items.push(requestMetrics);
            }
        }

        const status = statusMonitor(pid)
        event.items.push(status);

        if (status.value === ProcessStatus.alive) {
            // event.items.push(memoryMonitor(pid));
            // newEvent(event);

            // CONSUME DEMASIADOs RECURSO
            cpuMonitor(pid).then((cpu) => {

                event.items.push(cpu);
                event.items.push(memoryMonitor(pid));

                newEvent(event);
            });
        } else {
            newEvent(event);
        }
    }, interval);
}

