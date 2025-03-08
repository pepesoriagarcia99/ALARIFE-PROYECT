import { FrontendEventItem, FrontendEventType, MemoryType } from "../../model/FrontendEvents";

const memoryAddon = require('../../../build/Release/memory_usage_addon');

const formatBytes = (bytes: number) => (bytes / 1024 / 1024).toFixed(2);
export const memoryMonitor = (pid: number): FrontendEventItem => {
    const memoryUsage = memoryAddon.getMemoryUsage(pid);

    return {
        type: FrontendEventType.memory,
        value: [
            {
                type: MemoryType.heapTotal,
                value: formatBytes(memoryUsage.heapTotal)
            },
            {
                type: MemoryType.heapUsed,
                value: formatBytes(memoryUsage.heapUsed)
            },
            {
                type: MemoryType.rss,
                value: formatBytes(memoryUsage.rss)
            }
        ],
        unit: 'MB'
    }
}

