import { FrontendEventItem, FrontendEventType, ProcessStatus } from "../../model/FrontendEvents";

const isProcessAlive = (pid: number) => {
    try {
        process.kill(pid, 0);
        return true;
    } catch (e) {
        return false;
    }
}


export const statusMonitor = (pid: number): FrontendEventItem => {
    const status = isProcessAlive(pid);

    return {
        type: FrontendEventType.status,
        value: status ? ProcessStatus.alive : ProcessStatus.dead,
        unit: 'string'
    };
}
