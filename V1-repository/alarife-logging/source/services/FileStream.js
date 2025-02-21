import { Worker } from 'node:worker_threads';

import { appendFile, existsFile } from '../../utils.js';

/**
 * File stream service
 *
 * @class FileStream
 */
class FileStream {
  #worker;

  /**
   * Constructor
   *
   * @param {String} path File path
   * @param {String} interval File refresh interval
   * @param {String} size File size
   */
  constructor(path, interval, size) {
    if (!existsFile(path)) {
      console.log(`--------------------------------------> File ${path} not found`);

      appendFile(path, '');
    }

    this.worker = new Worker(
      `${process.env.PWD}/source/workers/stream.js`,
      { workerData : { path, interval, size } }
    );
  }

  /**
   * Set data to file
   * @param  {...String} message Messages
   */
  set(...message) {
    message.forEach(msg => {
      this.worker.postMessage(msg);
    });
  }
}

export default FileStream;
