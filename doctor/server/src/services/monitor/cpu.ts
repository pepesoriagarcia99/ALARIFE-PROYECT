import pidUsage from 'pidusage';
import { FrontendEventItem, FrontendEventType } from '../../model/FrontendEvents';

export const cpuMonitor = async (pid: number): Promise<FrontendEventItem> => {
    const stat = await pidUsage(pid, { maxage: 1 });

    return {
        type: FrontendEventType.cpu,
        value: stat.cpu,
        unit: '%'
    };
}

