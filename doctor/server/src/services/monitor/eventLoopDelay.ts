// import { monitorEventLoopDelay } from 'perf_hooks';
import { Platform } from '../../model/Platforms';

// const histogram = monitorEventLoopDelay();
// histogram.enable();

const formatBytes = (bytes: number) => (bytes / 1024 / 1024).toFixed(2);

export const baseMonitor = async (platform: Platform, pid: number, date: string): Promise<any> => {
    try {
        // Event loop delay in ms
        // newEvent({
        //     type: FrontendEventType.eventLoopDelay,
        //     value: (histogram.mean / 1e6).toFixed(2),
        //     unit: 'MS',
        //     snapshot: date
        // });
    } catch (err) {
        console.error(err);
        throw new Error('Error obteniendo estadísticas:');
    }
}