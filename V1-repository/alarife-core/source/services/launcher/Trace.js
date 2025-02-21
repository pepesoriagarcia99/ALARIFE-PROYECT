import FileStream from './FileStream.js';

/**
 * Trace service
 *
 * @class Trace
 */
class Trace {
  #values;

  /**
   * Constructor
   */
  constructor() {
    this.#values = new Map();
  }

  /**
   * Create file stream
   *
   * @param {String} name Name of the file stream
   * @param {String} path File path
   * @param {String} interval File refresh interval
   * @param {String} size File size
   *
   * @returns {FileStream} File stream
   */
  createFileStream(name, path, interval, size) {
    const fileStream = new FileStream(path, interval, size);
    this.#values.set(name, fileStream);

    return fileStream;
  }

  /**
   * Get fileStream
   * @param {String} name Name of the file stream
   * @returns {FileStream} File stream
   */
  get(name) {
    return this.#values.get(name);
  }
}

export default Trace;
