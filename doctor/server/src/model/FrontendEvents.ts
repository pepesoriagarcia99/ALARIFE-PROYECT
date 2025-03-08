export enum FrontendEventType {
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
    /**
     * Latencia total de todas las request almacenadas
     */
    avgTotalLatency: number;

    avgPerMinuteLatency: number;

}

export interface FrontendEventItem {
    type: FrontendEventType;
    value: string | number | Array<MemorySubType> | ProcessStatus | HttpRequestMetrics;
    unit: 'MS' | 'MB' | '%' | 'string' | 'metrics';
}

export interface FrontendEvent {
    items: FrontendEventItem[];
    snapshot: string;
}
