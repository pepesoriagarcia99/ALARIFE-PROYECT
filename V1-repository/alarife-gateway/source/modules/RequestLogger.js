import morgan from 'morgan';

import { DEVELOPMENT } from '@alarife/core/constants';
import configuration from '../modules/Configuration';

/**
 * Request logger service
 *
 * @class RequestLogger
 * @public
 *
 * @constructor
 * @property {Object} morgan Morgan instance
 */
class RequestLogger {

  #morgan;

  /**
  * Construct RequestLogger
  */
  constructor() {
    const morganType = configuration.environment === DEVELOPMENT ? 'dev' : 'combined';
    this.#morgan = morgan(morganType);
  }

  /**
    * Get middleware
    * @return {Object} Morgan middleware
  */
  get middleware() {
    return this.#morgan;
  }
}

export default RequestLogger;
