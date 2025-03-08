
export interface HttpRequest {
    method: string;
    originalUrl: string;
    statusCode: number;
    duration: number;
    receivedAt: Date;
    bytesReceived: number;
    bytesSent: number;
}

export enum ProcessEventType {
    httpRequest = 'httpRequest'
}

export interface ProcessEvents {
    type: ProcessEventType,
    value: HttpRequest
}
