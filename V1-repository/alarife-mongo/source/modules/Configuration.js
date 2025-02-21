import { MONGO_STATUS } from '../constants';

/**
 * Model for Mongo configuration
 */
class MongoConfiguration {

  /**
   * Mongo data
   * @type {Object}
   *
   * @param {String} uri
   * @param {Object} options
   * @param {String} status
   */
  #server;

  /**
   * Constructor
   */
  constructor() {
    this.#server = {
      uri     : '',
      options : {},
      status  : MONGO_STATUS.disconnected
    };
  }

  /**
   * Set mongo configuration
   * @param {Object} server Server data
   */
  set server(server) {
    this.#server = server;
  }

  /**
   * Get mongo configuration
   */
  get server() {
    return this.#server;
  }
}

export default new MongoConfiguration();
