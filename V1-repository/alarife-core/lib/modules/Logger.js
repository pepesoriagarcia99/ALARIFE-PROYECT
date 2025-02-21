"use strict";var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _moment = _interopRequireDefault(require("moment"));

var _Configuration = _interopRequireDefault(require("./Configuration.js"));

/**
 * Logger service
 *
 * @class Log
 * @public
 *
 * @constructor
 * @property {String} callerName Name of the class that invokes the log
 */
class Logger {

  callerName;

  /**
  * Construct Log
  * @param {String} callerName Name of the class that invokes the log
  */
  constructor(callerName) {
    this.callerName = callerName;
  }

  /**
   * Print
   * @param {String} consoleMethod Console method [log, warn, error]
   * @param {String} type Message type [INFO, ERROR, WARN]
   * @param {String} header Service name
   * @param {String} message Message
   * @param  {...any} args Trace error
  */
  #print(consoleMethod, type, header, message) {
    if (_Configuration.default.traceLog.levels.includes(type.toLowerCase())) {
      const date = (0, _moment.default)().format('YYYY-MM-DD HH:mm:ss');
      const mainMessage = `[${header.toUpperCase()}] ${date} ${type}`;

      /**
       * TODO: Estilo a los mensajes
       * TODO: https://www.npmjs.com/package/chalk
       */

      // eslint-disable-next-line no-console
      console[consoleMethod](mainMessage, ...message);
    }
  }

  /**
   * Info
   * @param {Array} message Message
   * @returns {Function} Print function
  */
  info(...message) {
    return this.#print('log', 'INFO', this.callerName, message);
  }

  /**
   * Debug
   * @param {Array} message Message
   * @returns {Function | undefined} Print function
  */
  debug(...message) {
    return this.#print('log', 'DEBUG', this.callerName, message);
  }

  /**
   * Error
   * @param {String} message Message
   * @param {Array} trace Trace
   * @returns {Function} Print function
  */
  error(...message) {
    return this.#print('error', 'ERROR', this.callerName, message);
  }

  /**
   * Warn
   * @param {Array} message Message
   * @returns {Function} Print function
  */
  warn(...message) {
    return this.#print('warn', 'WARN', this.callerName, message);
  }

  /**
   * Access to instance methods
   * @returns {Object} Method list
   */
  get methods() {
    return {
      info: (...args) => this.info(...args),
      debug: (...args) => this.debug(...args),
      error: (...args) => this.error(...args),
      warn: (...args) => this.warn(...args)
    };
  }
}var _default = exports.default =

Logger;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbW9tZW50IiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsInJlcXVpcmUiLCJfQ29uZmlndXJhdGlvbiIsIkxvZ2dlciIsImNhbGxlck5hbWUiLCJjb25zdHJ1Y3RvciIsInByaW50IiwiI3ByaW50IiwiY29uc29sZU1ldGhvZCIsInR5cGUiLCJoZWFkZXIiLCJtZXNzYWdlIiwiY29uZmlndXJhdGlvbiIsInRyYWNlTG9nIiwibGV2ZWxzIiwiaW5jbHVkZXMiLCJ0b0xvd2VyQ2FzZSIsImRhdGUiLCJtb21lbnQiLCJmb3JtYXQiLCJtYWluTWVzc2FnZSIsInRvVXBwZXJDYXNlIiwiY29uc29sZSIsImluZm8iLCJkZWJ1ZyIsImVycm9yIiwid2FybiIsIm1ldGhvZHMiLCJhcmdzIiwiX2RlZmF1bHQiLCJleHBvcnRzIiwiZGVmYXVsdCJdLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS9tb2R1bGVzL0xvZ2dlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XHJcblxyXG5pbXBvcnQgY29uZmlndXJhdGlvbiBmcm9tICcuL0NvbmZpZ3VyYXRpb24uanMnO1xyXG5cclxuLyoqXHJcbiAqIExvZ2dlciBzZXJ2aWNlXHJcbiAqXHJcbiAqIEBjbGFzcyBMb2dcclxuICogQHB1YmxpY1xyXG4gKlxyXG4gKiBAY29uc3RydWN0b3JcclxuICogQHByb3BlcnR5IHtTdHJpbmd9IGNhbGxlck5hbWUgTmFtZSBvZiB0aGUgY2xhc3MgdGhhdCBpbnZva2VzIHRoZSBsb2dcclxuICovXHJcbmNsYXNzIExvZ2dlciB7XHJcblxyXG4gIGNhbGxlck5hbWU7XHJcblxyXG4gIC8qKlxyXG4gICogQ29uc3RydWN0IExvZ1xyXG4gICogQHBhcmFtIHtTdHJpbmd9IGNhbGxlck5hbWUgTmFtZSBvZiB0aGUgY2xhc3MgdGhhdCBpbnZva2VzIHRoZSBsb2dcclxuICAqL1xyXG4gIGNvbnN0cnVjdG9yKGNhbGxlck5hbWUpIHtcclxuICAgIHRoaXMuY2FsbGVyTmFtZSA9IGNhbGxlck5hbWU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQcmludFxyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBjb25zb2xlTWV0aG9kIENvbnNvbGUgbWV0aG9kIFtsb2csIHdhcm4sIGVycm9yXVxyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIE1lc3NhZ2UgdHlwZSBbSU5GTywgRVJST1IsIFdBUk5dXHJcbiAgICogQHBhcmFtIHtTdHJpbmd9IGhlYWRlciBTZXJ2aWNlIG5hbWVcclxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSBNZXNzYWdlXHJcbiAgICogQHBhcmFtICB7Li4uYW55fSBhcmdzIFRyYWNlIGVycm9yXHJcbiAgKi9cclxuICAjcHJpbnQoY29uc29sZU1ldGhvZCwgdHlwZSwgaGVhZGVyLCBtZXNzYWdlKSB7XHJcbiAgICBpZiAoY29uZmlndXJhdGlvbi50cmFjZUxvZy5sZXZlbHMuaW5jbHVkZXModHlwZS50b0xvd2VyQ2FzZSgpKSkge1xyXG4gICAgICBjb25zdCBkYXRlID0gbW9tZW50KCkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XHJcbiAgICAgIGNvbnN0IG1haW5NZXNzYWdlID0gYFske2hlYWRlci50b1VwcGVyQ2FzZSgpfV0gJHtkYXRlfSAke3R5cGV9YDtcclxuXHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiBUT0RPOiBFc3RpbG8gYSBsb3MgbWVuc2FqZXNcclxuICAgICAgICogVE9ETzogaHR0cHM6Ly93d3cubnBtanMuY29tL3BhY2thZ2UvY2hhbGtcclxuICAgICAgICovXHJcblxyXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxyXG4gICAgICBjb25zb2xlW2NvbnNvbGVNZXRob2RdKG1haW5NZXNzYWdlLCAuLi5tZXNzYWdlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEluZm9cclxuICAgKiBAcGFyYW0ge0FycmF5fSBtZXNzYWdlIE1lc3NhZ2VcclxuICAgKiBAcmV0dXJucyB7RnVuY3Rpb259IFByaW50IGZ1bmN0aW9uXHJcbiAgKi9cclxuICBpbmZvKC4uLm1lc3NhZ2UpIHtcclxuICAgIHJldHVybiB0aGlzLiNwcmludCgnbG9nJywgJ0lORk8nLCB0aGlzLmNhbGxlck5hbWUsIG1lc3NhZ2UpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGVidWdcclxuICAgKiBAcGFyYW0ge0FycmF5fSBtZXNzYWdlIE1lc3NhZ2VcclxuICAgKiBAcmV0dXJucyB7RnVuY3Rpb24gfCB1bmRlZmluZWR9IFByaW50IGZ1bmN0aW9uXHJcbiAgKi9cclxuICBkZWJ1ZyguLi5tZXNzYWdlKSB7XHJcbiAgICByZXR1cm4gdGhpcy4jcHJpbnQoJ2xvZycsICdERUJVRycsIHRoaXMuY2FsbGVyTmFtZSwgbWVzc2FnZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBFcnJvclxyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIE1lc3NhZ2VcclxuICAgKiBAcGFyYW0ge0FycmF5fSB0cmFjZSBUcmFjZVxyXG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUHJpbnQgZnVuY3Rpb25cclxuICAqL1xyXG4gIGVycm9yKC4uLm1lc3NhZ2UpIHtcclxuICAgIHJldHVybiB0aGlzLiNwcmludCgnZXJyb3InLCAnRVJST1InLCB0aGlzLmNhbGxlck5hbWUsIG1lc3NhZ2UpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2FyblxyXG4gICAqIEBwYXJhbSB7QXJyYXl9IG1lc3NhZ2UgTWVzc2FnZVxyXG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUHJpbnQgZnVuY3Rpb25cclxuICAqL1xyXG4gIHdhcm4oLi4ubWVzc2FnZSkge1xyXG4gICAgcmV0dXJuIHRoaXMuI3ByaW50KCd3YXJuJywgJ1dBUk4nLCB0aGlzLmNhbGxlck5hbWUsIG1lc3NhZ2UpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWNjZXNzIHRvIGluc3RhbmNlIG1ldGhvZHNcclxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBNZXRob2QgbGlzdFxyXG4gICAqL1xyXG4gIGdldCBtZXRob2RzKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgaW5mbyAgOiAoLi4uYXJncykgPT4gdGhpcy5pbmZvKC4uLmFyZ3MpLFxyXG4gICAgICBkZWJ1ZyA6ICguLi5hcmdzKSA9PiB0aGlzLmRlYnVnKC4uLmFyZ3MpLFxyXG4gICAgICBlcnJvciA6ICguLi5hcmdzKSA9PiB0aGlzLmVycm9yKC4uLmFyZ3MpLFxyXG4gICAgICB3YXJuICA6ICguLi5hcmdzKSA9PiB0aGlzLndhcm4oLi4uYXJncylcclxuICAgIH07XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMb2dnZXI7XHJcbiJdLCJtYXBwaW5ncyI6InlMQUFBLElBQUFBLE9BQUEsR0FBQUMsc0JBQUEsQ0FBQUMsT0FBQTs7QUFFQSxJQUFBQyxjQUFBLEdBQUFGLHNCQUFBLENBQUFDLE9BQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTUUsTUFBTSxDQUFDOztFQUVYQyxVQUFVOztFQUVWO0FBQ0Y7QUFDQTtBQUNBO0VBQ0VDLFdBQVdBLENBQUNELFVBQVUsRUFBRTtJQUN0QixJQUFJLENBQUNBLFVBQVUsR0FBR0EsVUFBVTtFQUM5Qjs7RUFFQTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0VBQ0UsQ0FBQ0UsS0FBS0MsQ0FBQ0MsYUFBYSxFQUFFQyxJQUFJLEVBQUVDLE1BQU0sRUFBRUMsT0FBTyxFQUFFO0lBQzNDLElBQUlDLHNCQUFhLENBQUNDLFFBQVEsQ0FBQ0MsTUFBTSxDQUFDQyxRQUFRLENBQUNOLElBQUksQ0FBQ08sV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFO01BQzlELE1BQU1DLElBQUksR0FBRyxJQUFBQyxlQUFNLEVBQUMsQ0FBQyxDQUFDQyxNQUFNLENBQUMscUJBQXFCLENBQUM7TUFDbkQsTUFBTUMsV0FBVyxHQUFJLElBQUdWLE1BQU0sQ0FBQ1csV0FBVyxDQUFDLENBQUUsS0FBSUosSUFBSyxJQUFHUixJQUFLLEVBQUM7O01BRS9EO0FBQ047QUFDQTtBQUNBOztNQUVNO01BQ0FhLE9BQU8sQ0FBQ2QsYUFBYSxDQUFDLENBQUNZLFdBQVcsRUFBRSxHQUFHVCxPQUFPLENBQUM7SUFDakQ7RUFDRjs7RUFFQTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0VBQ0VZLElBQUlBLENBQUMsR0FBR1osT0FBTyxFQUFFO0lBQ2YsT0FBTyxJQUFJLENBQUMsQ0FBQ0wsS0FBSyxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDRixVQUFVLEVBQUVPLE9BQU8sQ0FBQztFQUM3RDs7RUFFQTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0VBQ0VhLEtBQUtBLENBQUMsR0FBR2IsT0FBTyxFQUFFO0lBQ2hCLE9BQU8sSUFBSSxDQUFDLENBQUNMLEtBQUssQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQ0YsVUFBVSxFQUFFTyxPQUFPLENBQUM7RUFDOUQ7O0VBRUE7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0VBQ0VjLEtBQUtBLENBQUMsR0FBR2QsT0FBTyxFQUFFO0lBQ2hCLE9BQU8sSUFBSSxDQUFDLENBQUNMLEtBQUssQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQ0YsVUFBVSxFQUFFTyxPQUFPLENBQUM7RUFDaEU7O0VBRUE7QUFDRjtBQUNBO0FBQ0E7QUFDQTtFQUNFZSxJQUFJQSxDQUFDLEdBQUdmLE9BQU8sRUFBRTtJQUNmLE9BQU8sSUFBSSxDQUFDLENBQUNMLEtBQUssQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQ0YsVUFBVSxFQUFFTyxPQUFPLENBQUM7RUFDOUQ7O0VBRUE7QUFDRjtBQUNBO0FBQ0E7RUFDRSxJQUFJZ0IsT0FBT0EsQ0FBQSxFQUFHO0lBQ1osT0FBTztNQUNMSixJQUFJLEVBQUlBLENBQUMsR0FBR0ssSUFBSSxLQUFLLElBQUksQ0FBQ0wsSUFBSSxDQUFDLEdBQUdLLElBQUksQ0FBQztNQUN2Q0osS0FBSyxFQUFHQSxDQUFDLEdBQUdJLElBQUksS0FBSyxJQUFJLENBQUNKLEtBQUssQ0FBQyxHQUFHSSxJQUFJLENBQUM7TUFDeENILEtBQUssRUFBR0EsQ0FBQyxHQUFHRyxJQUFJLEtBQUssSUFBSSxDQUFDSCxLQUFLLENBQUMsR0FBR0csSUFBSSxDQUFDO01BQ3hDRixJQUFJLEVBQUlBLENBQUMsR0FBR0UsSUFBSSxLQUFLLElBQUksQ0FBQ0YsSUFBSSxDQUFDLEdBQUdFLElBQUk7SUFDeEMsQ0FBQztFQUNIO0FBQ0YsQ0FBQyxJQUFBQyxRQUFBLEdBQUFDLE9BQUEsQ0FBQUMsT0FBQTs7QUFFYzVCLE1BQU0ifQ==