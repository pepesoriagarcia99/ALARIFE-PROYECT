// import { isDefined } from '@alarife/core/utils';

/**
 * Field model
 *
 * @class Field
 * @public
 *
 * @constructor
 *
 * @typedef {Object} Field
 * @param {String} reference field name
 * @param {String} name Custom field name
 * @param {Function} type Field type
 * @param {Object} options Parameter options
 */
class Field {

  #reference;

  #name;

  #type;

  #options;

  /**
   * Constructor
   * @param {String} reference Decorated parameter name
   * @param {Object} options Field options
   */
  constructor(reference, options) {
    this.#reference = reference;
    this.#options = {};

    this.build(options);
  }

  /**
   * Complete field information
   * @param {Object} options Field options
   */
  build(options = {}) {
    if (options.type) {
      this.#type = options.type;
    }

    if (options.name) {
      this.#name = options.name;
      delete options.name;
    }

    this.#options = Object.assign(this.#options, options);
  }
}

export default Field;
