import path from 'path';

import { coreConfiguration, DeveloperError } from '@alarife/core/modules';
import { isObject } from '@alarife/core/utils';

import {
  DEFAULT_ACCESS_LOG_STATE,
  DEFAULT_API_ROOT,
  DEFAULT_CERT,
  DEFAULT_IP,
  DEFAULT_KEY,
  DEFAULT_PORT,
  DEFAULT_PROTOCOL,
  DEFAULT_SECURE_PORT,
  SECURE_PROTOCOL
} from '../constant';

/**
 * Model for Core configuration
 */
class HttpConfiguration {
  /**
   * Server protocol
   * @type {String}
   */
  #protocol;

  /**
   * Server data
   * @type {Object}
   *
   * @typedef {Object} Server
   * @param {String} ip Default 0.0.0.0
   * @param {Number} port Default 9000
   * @param {String} apiRoot Default /
   * @param {Array<Class>} controllers Default empty array
   */
  #server = {};

  /**
   * Server ssl data
   * @type {Object}
   *
   * @param {Boolean} hasSsl Default false
   * @param {Object} options Default undefined
   *
   * HTTPS options
   * @typedef {Object} SslConfiguration
   * @param {string | Buffer | Array<string | Buffer> | undefined} ca
   * @param { string | Buffer | Array<string | Buffer> | undefined} cert
   * @param {string | undefined} sigalgs
   * @param {string | undefined} ciphers
   * @param {string | undefined} clientCertEngine
   * @param {string | Buffer | Array<string | Buffer> | undefined} crl
   * @param {string | Buffer | undefined} dhparam
   * @param {string | undefined} ecdhCurve
   * @param {boolean | undefined} honorCipherOrder
   * @param {string | Buffer | Array<string | Buffer | KeyObject> | undefined} key
   * @param {string | undefined} privateKeyEngine
   * @param {string | undefined} privateKeyIdentifier
   * @param {SecureVersion | undefined}maxVersion
   * @param {SecureVersion | undefined} minVersion
   * @param {string | undefined} passphrase
   * @param {string | Buffer | Array<string | Buffer | PxfObject> | undefined} pfx
   * @param {number | undefined} secureOptions
   * @param {string | undefined} secureProtocol
   * @param {string | undefined} sessionIdContext
   * @param {Buffer | undefined} ticketKeys
   * @param {number | undefined} sessionTimeout
   */
  #ssl = {};

  /**
   * Trace log configuration
   * @type {Object}
   *
   * @param {Boolean} active Default true
  */
  #accessLog = {};

  /**
   * Constructor
   */
  constructor() {
    this.#protocol = DEFAULT_PROTOCOL;

    /** Default initialization */
    this.accessLog = {};
  }

  /**
    * Server configuration
    * @param {Object} newServer The new configuration server
  */
  set server(newServer) {
    const PORT = this.#ssl.hasSsl ? DEFAULT_SECURE_PORT : DEFAULT_PORT;

    this.#server.ip = newServer.ip ?? DEFAULT_IP;
    this.#server.port = newServer.port ?? PORT;
    this.#server.apiRoot = newServer.apiRoot ?? DEFAULT_API_ROOT;
    this.#server.controllers = newServer.controllers ?? [];
  }

  /**
   * Get server
   */
  get server() {
    return this.#server;
  }

  /**
    * Configuration assignment to accessLog
    * @param {Object} newConfig The new configuration
  */
  set accessLog(newConfig) {
    this.#accessLog.active = newConfig.active ?? DEFAULT_ACCESS_LOG_STATE;
  }

  /**
   * Get accessLog
   */
  get accessLog() {
    return Object.assign({}, this.#accessLog);
  }

  /**
    * Configuration assignment to ssl
    * @param {Object} newSsl The new configuration
  */
  set ssl(newSsl) {
    if (isObject(newSsl) && !newSsl.cert && !newSsl.key) {
      throw new DeveloperError('To configure https you need to assign a valid certificate.');
    }

    const assignment = options => {
      this.#ssl.hasSsl = (options.cert && options.key);
      this.#ssl.options = options;
    };

    if (newSsl === true) {
      this.#protocol = SECURE_PROTOCOL;

      assignment({
        cert : path.join(coreConfiguration.rootPath, DEFAULT_CERT),
        key  : path.join(coreConfiguration.rootPath, DEFAULT_KEY)
      });
    }
    else if (newSsl === false) {
      this.#ssl = {
        hasSsl : false,
        cert   : undefined,
        key    : undefined
      };
    }
    else if (isObject(newSsl)) {
      this.#protocol = SECURE_PROTOCOL;

      assignment(newSsl);
    }
  }

  /**
   * Get ssl
   */
  get ssl() {
    return this.#ssl;
  }

  /**
   * Get protocol
   */
  get protocol() {
    return this.#protocol;
  }

  /**
   * Public configuration methods
   * @returns {Object} Public methods
   */
  publicConfiguration() {
    return {
      accessLog : e => this.accessLog = e
    };
  }
}

export default new HttpConfiguration();
