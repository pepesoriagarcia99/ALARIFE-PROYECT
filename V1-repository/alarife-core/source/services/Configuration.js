// import { DEFAULT_TRACE_LOG } from '../constant';

// import packageJson from '../../package.json';

/**
 * Model for Core configuration service
 */
class CoreConfiguration {
  /**
   * App name
   * @type {String}
   */
  name;

  /**
   * Core version
   * @type {String}
   */
  version;

  /**
   * App version
   * @type {String}
   */
  appVersion;

  /**
   * Environment
   ** Configured by argv parameter "NODE_ENV"
   *
   * @type {String} development | production | test
   */
  environment;

  /**
   * Environment file path
   ** Configured by argv parameter "ENV_FILE"
   *
   * @type {String}
   */
  envFile;

  /**
   * Trace log configuration
   ** Configured by environment parameter "APP.LOG.TRACE.TYPES"
   *
   * @type {Array} Default ['INFO', 'DEBUG', 'ERROR', 'WARN']
   */
  traceLog;

  /**
   * Trace log file path
   ** Configured by argv parameter "TRACE_LOG_FILE"
   *
   * @type {String}
   */
  traceLogFile;

  /**
   * Trace log file interval
   ** Configured by environment parameter "APP.LOG.TRACE.INTERVAL"
   *
   * @type {Array} Default 1d
   */
  traceLogInterval;

  /**
   * Trace log file size
   ** Configured by environment parameter "APP.LOG.TRACE.SIZE"
   *
   * @type {Array} Default 10M
   */
  traceLogSize;

  /**
   * Debug mode
   ** Configured by argv parameter "--debug"
   *
   * @type {Boolean}
   */
  debugMode;

  /**
   * Constructor
   */
  constructor() {
    this.appVersion = process.env.npm_package_version;
    this.traceLog = [];
    this.debugMode = false;
  }

  // traceIsConfigured() {
  //   return this.traceLog !== undefined && this.traceLog.length > 0;
  // }
}

export default CoreConfiguration;
