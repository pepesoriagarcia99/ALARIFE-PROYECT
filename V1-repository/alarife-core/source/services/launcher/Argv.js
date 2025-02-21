import Logger from '../../services/logger/Logger.js';
const constants = require('../../constant');

/**
 * Argv service
 *
 * @class Argv
 */
class Argv {
  /**
   * Values argv
   * @type {Map<String, Any>}
   */
  #values;

  /**
   * Logger
   * @type {Logger}
   */
  #log;

  /**
   * Constructor
   */
  constructor() {
    this.#log = new Logger('CoreArgv', true);
    this.#values = new Map();

    this.#read();
  }

  /**
   * Read argv values
   */
  #read() {
    this.#log.debug('Read argv parameters');

    process.argv.forEach(arg => {
      /**
       ** Used for KEY=value parameters
       */
      if (arg.includes('=')) {
        const [key, value] = arg.split('=');
        if (key && value && this.#getArgvLibrary().includes(key)) {
          this.#values.set(key, value);
        }
      }
      /**
       ** Used for --debug or -d parameters
       */
      else if (this.#getArgvLibrary().includes(arg)) {
        this.#values.set(arg, true);
      }
    });
  }

  /**
   * Get argv params
   * @returns {Array} Argv list
   */
  #getArgvLibrary() {
    const library = [];

    Object.keys(constants).forEach(key => {
      if (key.startsWith('ARGV_')) {
        library.push(constants[key]);
      }
    });

    return library;
  }

  /**
   * Get argv value
   *
   * @param {String} key Key argv
   * @returns {String | undefined} Value argv
   */
  get(key) {
    return this.#values.get(key);
  }

  /**
   * Clean argv values
   */
  clean() {
    this.#values = undefined;
  }
}

export default Argv;
