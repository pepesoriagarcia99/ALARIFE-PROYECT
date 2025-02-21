import moment from 'moment';
import { TRACE_DEBUG, TRACE_ERROR, TRACE_INFO, TRACE_LOG, TRACE_WARN } from '../../constant/index.js';

import launcher from '../../modules/launcher.js';
import configuration from '../../modules/configuration.js';

import { camelToSankey } from '../../utils.js';

/**
 * TODO: Guardar los logs en un fichero
 * TODO: Configuracion de ruta de logs por .env o archivo por defecto
 */
/**
 * Logger service
 *
 * @class Log
 */
class Logger {

  /**
   * Name of the class that invokes the log
   * @type {String}
   */
  #callerName;

  /**
   * Determine if it is an internal log
   * @type {Boolean}
   */
  #isInternal;

  #fileStream;

  /**
  * Construct Log
  * @param {String} callerName Name of the class that invokes the log
  * @param {Boolean} isInternal Is internal log, belonging to the Core or plugin
  */
  constructor(callerName, isInternal = false) {
    /**
     * TODO: Validar esta idea
     */
    this.#callerName = camelToSankey(callerName).toUpperCase();
    this.#isInternal = isInternal;

    // console.log('🚀 ~ Logger ~ constructor ~ launcher:', launcher);
    // console.log('🚀 ~ Logger ~ constructor ~ this.#fileStream:', this.#fileStream);
    // this.#fileStream = launcher.trace.get(TRACE_LOG);

  }

  /**
   * Print
   *
   * @param {String} consoleMethod Console method [log, warn, error]
   * @param {String} type Message type [INFO, ERROR, WARN]
   * @param {String} header Service name
   * @param {String} message Message
  */
  #print(consoleMethod, type, header, message) {
    /**
     * ! revisar esto del isInternal y debugMode
     */

    /**
     * ! la configuracion del traceLog debe hacerse al inicio y no se permite su manipulacion durante la ejecucion
     * ! deberia hacerse por argv o environvemnts
     */

    /**
     * si (this.#isInternal === true && configuration.debugMode === true) se veran los info, warn y debug
     * Los error se ven siempre
     */

    // console.log('this.#callerName: ', this.#callerName);
    // console.log('type: ', type);
    // console.log('configuration.debugMode: ', configuration.debugMode);
    // console.log('this.#isInternal: ', this.#isInternal);
    // console.log('configuration.traceLog: ', configuration.traceLog);
    // console.log('launcher', launcher);
    // console.log();
    // console.log();

    if (
      type === TRACE_ERROR
      ||
      this.#isInternal === true
      && configuration.debugMode === true
      && [TRACE_INFO, TRACE_WARN, TRACE_DEBUG].includes(type.toUpperCase())
      ||
      this.#isInternal === false
      && configuration.traceLog.includes(type.toUpperCase())
    ) {
      const date = moment().format('YYYY-MM-DD HH:mm:ss');
      const mainMessage = `[${header.toUpperCase()}] ${date} ${type}`;

      /**
       * TODO: Estilo a los mensajes
       * TODO: https://www.npmjs.com/package/chalk
       */

      // eslint-disable-next-line no-console
      console[consoleMethod](mainMessage, ...message);
    }

    // if (
    //   (this.#isInternal === true && configuration.debugMode === true && type === 'DEBUG')
    //   ||
    //   (this.#isInternal === false && configuration.traceLog.levels.includes(type.toLowerCase()))
    // ) {}
  }

  /**
   * Info
   * @param {Array} message Message
   * @returns {Function} Print function
  */
  info(...message) {
    return this.#print('log', 'INFO', this.#callerName, message);
  }

  /**
   * Debug
   * @param {Array} message Message
   * @returns {Function | undefined} Print function
  */
  debug(...message) {
    return this.#print('log', 'DEBUG', this.#callerName, message);
  }

  /**
   * Error
   * @param {String} message Message
   * @param {Array} trace Trace
   * @returns {Function} Print function
  */
  error(...message) {
    return this.#print('error', 'ERROR', this.#callerName, message);
  }

  /**
   * Warn
   * @param {Array} message Message
   * @returns {Function} Print function
  */
  warn(...message) {
    return this.#print('warn', 'WARN', this.#callerName, message);
  }

  /**
   * Public methods for use in apps
   *
   * @returns {Object} Method list
   */
  get methods() {
    return {
      info  : (...args) => this.info(...args),
      debug : (...args) => this.debug(...args),
      error : (...args) => this.error(...args),
      warn  : (...args) => this.warn(...args)
    };
  }
}

export default Logger;
