export enum EventType {
    status = 'status',
    cpu = 'cpu',
    memory = 'memory',
    eventLoopDelay = 'eventLoopDelay',
    httpRequestsMetrics = 'httpRequestsMetrics'
}

export enum MemoryType {
    heapUsed = 'heapUsed',
    heapTotal = 'heapTotal',
    rss = 'rss'
}

export interface MemorySubType {
    type: MemoryType;
    value: string;
}

export enum ProcessStatus {
    alive = 'alive',
    dead = 'dead'
}

export interface HttpRequestMetrics {
    avgTotalLatency: number;
    avgPerMinuteLatency: number;
}

export interface MonitorEventItem {
    type: EventType;
    value: string | number | Array<MemorySubType> | ProcessStatus | HttpRequestMetrics;
    unit: 'MS' | 'MB' | '%' | 'string' | 'metrics';
}

export interface MonitorEvent {
    items: MonitorEventItem[];
    snapshot: string;
}