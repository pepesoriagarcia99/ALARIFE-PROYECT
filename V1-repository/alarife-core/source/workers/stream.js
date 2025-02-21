const { workerData } = require('node:worker_threads');
const rfs = require('rotating-file-stream');

const { path, interval, size } = workerData;

const fileStream = rfs.createStream(path, {
  size,
  interval,
  compress : 'gzip'
});

process.on('message', msg => {
  fileStream.write(msg);
});
