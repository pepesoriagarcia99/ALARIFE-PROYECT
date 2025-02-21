import workerpool from 'workerpool';

export default workerpool.pool({ workerType : 'process' });
