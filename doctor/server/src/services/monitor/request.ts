import { FrontendEventItem, FrontendEventType, HttpRequestMetrics } from "../../model/FrontendEvents";
import { HttpRequest } from "../../model/ProcessEvents";

let requestPerInterval: HttpRequest[] = [];

export const requestMonitor = (): FrontendEventItem | undefined => {
    if(requestPerInterval.length === 0) {
        return undefined;
    }

    const metrics: HttpRequestMetrics = {
        avgTotalLatency: 0,
        avgPerMinuteLatency: 0
    };
    requestPerInterval.forEach((request) => {
        // calculos de metricas
     });

    requestPerInterval = [];

    return {
        type: FrontendEventType.httpRequestsMetrics,
        value: metrics,
        unit: 'metrics'
    }
}

export const initMonitorRequest = () => {
    process.on('message', (message) => {
        console.log("🚀 ~ process.on ~ message:", message);

        // if (message.type === 'httpRequest') {
        //     const request: HttpRequest = message.value;
        //     requestPerInterval.push(request);
        // }
    });
}


