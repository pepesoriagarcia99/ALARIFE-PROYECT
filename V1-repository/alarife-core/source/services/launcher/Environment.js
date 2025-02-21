import { DEVELOPMENT, DEVELOPMENT_FILE, PRODUCTION, PRODUCTION_FILE, TEST, TEST_FILE } from '../../constant/index.js';

import Logger from '../../services/logger/Logger.js';
import DeveloperError from '../../services/logger/DeveloperError.js';

import { existsFile, readFile } from '../../utils.js';

/**
 * Environment service
 *
 * @class Environment
 */
class Environment {
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
   *
   * @param {String} env Argv env value
   * @param {String} envFile Argv env file path
   */
  constructor(env, envFile) {
    this.#log = new Logger('CoreEnvironment', true);

    this.#read(env, envFile);
  }

  /**
   * Read environment values
   *
   * @param {String} env Argv env value
   * @param {String} envFile Argv env file path
   */
  #read(env, envFile) {
    this.#log.debug('Read environment values');

    if (env === PRODUCTION) {
      const envs = this.#loadFile(envFile, PRODUCTION_FILE);

      if (envs) {
        this.#values = envs;
      }
      else {
        this.#values = this.#loadProcessEnv();
      }
    }
    else if (env === DEVELOPMENT) {
      this.#values = this.#loadFile(envFile, DEVELOPMENT_FILE);
    }
    else if (env === TEST) {
      this.#values = this.#loadFile(envFile, TEST_FILE);
    }
    else {
      throw new DeveloperError('NODE_ENV value not supported.');
    }
  }

  /**
   * Load file - It is decided which file to load, generic path or file indicated by argv parameters
   *
   * @param {String} argvEnvFile Argv parameter
   * @param {String} defaultFileName Default file name
   * @returns {Map | undefined} Environment variables
   */
  #loadFile(argvEnvFile, defaultFileName) {
    const defaultEnvFile = `${process.env.PWD}/${defaultFileName}`;

    if (this.#checkFile(argvEnvFile)) {
      return this.#readFileEnv(argvEnvFile);
    }
    else if (this.#checkFile(defaultEnvFile)) {
      return this.#readFileEnv(defaultEnvFile);
    }

    return undefined;
  }

  /**
   * Read environment values from a file
   *
   * @param {String} path File path
   * @returns {Map | undefined} Environment variables
   */
  #readFileEnv(path) {
    this.#log.debug('Environment variables are loaded from the file: ', path);

    let envs;
    const content = readFile(path);
    if (content) {
      const lines = content.split('\n');
      envs = new Map();

      lines.forEach(line => {
        if (line && !line.startsWith('#')) {
          const [key, value] = line.split('=');
          if (key && value) {
            envs.set(key.toUpperCase(), value);
          }
        }
      });
    }

    return envs;
  }

  /**
   * Load process environment in values
   *
   * @returns {Map} Environment variables
   */
  #loadProcessEnv() {
    const envs = new Map();

    /** Official production environment */
    Object.keys(process.env).forEach(key => {
      envs.set(key, process.env[key]);
    });

    return envs;
  }

  /**
   * Check file exists
   *
   * @param {String} path File path
   * @returns {Boolean} File exists
   */
  #checkFile(path) {
    return path && existsFile(path);
  }

  /**
   * Get environment value
   *
   * @param {String} key Environment key
   * @returns {String} Environment value
   */
  get(key) {
    return this.#values.get(key);
  }

  /**
   * Get all values
   * @returns {Map} Values
   */
  getAll() {
    return this.#values;
  }

  /**
   * Environment map to object
   *
   * @returns {Object} Environment values
   */
  toObject() {
    const object = {};

    this.#values.forEach((value, key) => {
      object[key] = value;
    });

    return object;
  }
}

export default Environment;
