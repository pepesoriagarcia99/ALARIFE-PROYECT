import {
  ARGV_DEBUG_MODE,
  ARGV_DISABLE_TRACE_LOG_FILE,
  ARGV_ENV_FILE,
  ARGV_NODE_ENV,
  ARGV_TRACE_LOG_FILE,
  DEFAULT_TRACE_LOG_FILE,
  DEFAULT_TRACE_LOG_TRACE_INTERVAL,
  DEFAULT_TRACE_LOG_TRACE_SIZE,
  DEFAULT_TRACE_LOG_TRACE_TYPES,
  DEVELOPMENT,
  ENV_NAME_APP,
  ENV_NODE_ENV,
  ENV_TRACE_LOG_TRACE_INTERVAL,
  ENV_TRACE_LOG_TRACE_SIZE,
  ENV_TRACE_LOG_TRACE_TYPES,
  TRACE_LOG
} from '../../constant';

// import instanceStore from './InstanceStore.js';
import configuration from '../../modules/configuration.js';

import Trace from './Trace';
import Banner from './Banner.js';
import Argv from './Argv.js';
import Environment from './Environment.js';
import Logger from '../logger/Logger.js';

import Uuid from '../../models/Uuid.js';
import Store from '../../models/Store.js';
import valueStore from '../../modules/valueStore.js';

import packageJson from '../../../package.json';

/**
 * TODO: Usar pm2
 * Libreria para monitorizacion de apis
 ** https://www.npmjs.com/package/pm2?activeTab=dependencies
 */

/**
 * TODO: Analizar
 * TODO: Sistema de alertas
 * TODO: -> memory leaks
 */

/**
 * Launcher service
 *
 * @class Launcher
 */
class Launcher {
  /**
   * Execution identifier
   * @type {Uuid}
   */
  #id;

  /**
   * Logger
   * @type {Logger}
   */
  #log;

  /**
   * Banner Service
   * @type {Banner}
   */
  #bannerService;

  /**
   * Banner Data
   * @type {Object}
   */
  #bannerData;

  /**
   * Argv parameters Service
   * @type {Argv}
   */
  #argvService;

  /**
   * Environment Service
   * @type {Environment}
   */
  #environmentService;

  /**
   * Trace Service
   * @type {Trace}
   */
  #traceService;

  /**
   * Callback to execute before Instance
   * @type {Array<Function>}
   */
  #beforeInstance;

  /**
   * Callback to execute after Instance
   * @type {Array<Function>}
   */
  #afterInstance;

  /**
   * The main instance
   * @type {Object}
   */
  #mainInstance;

  /**
   * Constructor
   */
  constructor() {
    this.#id = new Uuid(16);

    this.#beforeInstance = [];
    this.#afterInstance = [];

    this.#configure();
  }

  /**
   * Configure argv
   *
   * @private
   */
  #configureArgv() {
    this.#argvService = new Argv();

    configuration.environment = this.#argvService.get(ARGV_NODE_ENV) || DEVELOPMENT;
    configuration.envFile = this.#argvService.get(ARGV_ENV_FILE);
    configuration.traceLogFile = this.#argvService.get(ARGV_TRACE_LOG_FILE) || DEFAULT_TRACE_LOG_FILE;
    configuration.debugMode = Boolean(this.#argvService.get(ARGV_DEBUG_MODE));
  }

  /**
   * Configure environment
   *
   * @private
   */
  #configureEnvironment() {
    this.#environmentService = new Environment(configuration.environment, configuration.envFile);

    configuration.traceLog = this.#environmentService.get(ENV_TRACE_LOG_TRACE_TYPES) || DEFAULT_TRACE_LOG_TRACE_TYPES;
    configuration.traceLogInterval =
      this.#environmentService.get(ENV_TRACE_LOG_TRACE_INTERVAL) || DEFAULT_TRACE_LOG_TRACE_INTERVAL;
    configuration.traceLogSize = this.#environmentService.get(ENV_TRACE_LOG_TRACE_SIZE) || DEFAULT_TRACE_LOG_TRACE_SIZE;

    configuration.name = this.#environmentService.get(ENV_NAME_APP) || packageJson.name;
    configuration.version = packageJson.version;
  }

  /**
   * Configure Banner
   *
   * @private
   */
  #configureBanner() {
    this.#bannerService = new Banner();
    this.#bannerData = new Store();

    this.#bannerData.set('coreVersion', `${configuration.version}\n`);
    this.#bannerData.set('environment', configuration.environment);
    this.#bannerData.set('version', configuration.appVersion);
  }

  /**
   * Data return due to uncontrolled exceptions
   *
   * @private
   */
  #configureExceptions() {
    /**
     * ! Cada vez que la app explote
     *
     * mostrara y guardara en trace.log el ID de la ejecucion y informacion del sistema
     */

    process.on('uncaughtException', error => {
      console.error('AQUI ----------------------------------------------------->');
      console.error(error);
      // Puedes agregar aquí la lógica para manejar o registrar la excepción de manera centralizada
      process.exit(1); // Salir de la aplicación después de manejar la excepción
    });

    // /**
    //  * PROMESAS
    //  */
    // process.on('unhandledRejection', (reason, promise) => {
    //   console.error('Rechazo no manejado:', reason);
    //   // Puedes agregar aquí la lógica para manejar o registrar el rechazo de manera centralizada
    //   process.exit(1); // Salir de la aplicación después de manejar el rechazo
    // });
  }

  /**
   * Add valueStore data
   *
   * @private
   */
  #configureStoreData() {
    /**
     * TODO: Revisar que se almacena en valueStore y mejorar
     */
    valueStore.set('environment', configuration.environment);
    valueStore.set('Core.name', configuration.name);
    valueStore.set('Core.version', configuration.version);

    this.#environmentService.getAll().forEach((value, key) => {
      valueStore.set(key, value);
    });
  }

  /**
   * Configure launcher
   *
   * @private
   */
  #configure() {
    this.#configureArgv();
    this.#configureEnvironment();

    const {
      traceLogFile, traceLogInterval, traceLogSize, environment, debugMode
    } = configuration;

    this.#traceService = new Trace();

    if (Boolean(this.#argvService.get(ARGV_DISABLE_TRACE_LOG_FILE)) === true) {
      this.#traceService.createFileStream(TRACE_LOG, traceLogFile, traceLogInterval, traceLogSize);
    }

    this.#log = new Logger('CoreLauncher', true);
    this.#log.debug('Alarife is starting, UUID: ', this.#id.value);
    this.#log.debug('Environment: ', environment);

    this.#configureBanner();
    this.#configureExceptions();
    this.#configureStoreData();

    if (debugMode) {
      this.#log.debug('Debug mode activated');
    }

    if (this.#environmentService.get(ENV_NODE_ENV) !== environment) {
      this.#log.warn(
        'The configured environment does not match the environment indicated in the environment variables file.'
      );
    }

    this.#log.debug('Process configuration completed');
  }

  /**
   * Add callback before Instance
   *
   * @param {Function} callback The callback to add
   */
  addCallbackBeforeInstance(callback) {
    this.#beforeInstance.push(callback);
  }

  /**
   * Add callback after Instance
   *
   * @param {Function} callback The callback to add
   */
  addCallbackAfterInstance(callback) {
    this.#afterInstance.push(callback);
  }

  /**
   * Run
   * * Internal core method
   *
   * @param {Class} Target Main class to run
   */
  run(Target) {
    this.#log.debug('Run application');

    this.#bannerService.print(this.#bannerData.toObject());
    this.#beforeInstance.forEach(callback => callback(Target));

    const instance = new Target();
    this.#mainInstance = instance;

    this.#afterInstance.forEach(callback => callback(Target, instance));

    /** Clean */
    this.#beforeInstance = [];
    this.#afterInstance = [];
    this.#bannerData = undefined;

    this.#argvService.clean();

    this.#log.debug('Application running');
  }

  /**
   * Get mainInstance
   */
  get mainInstance() {
    return this.#mainInstance;
  }

  /**
   * Get trace
   */
  get trace() {
    return this.#traceService;
  }
}

export default Launcher;
