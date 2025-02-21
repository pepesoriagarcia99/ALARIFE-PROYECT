import DeveloperError from '../services/logger/DeveloperError.js';

import { isObject } from '../utils.js';

/**
 * Store
 *
 * @class Store
 */
class Store {
  /**
   * Value map
   * @type {Map}
  */
  #values;

  /**
   * Constructor
   * @param {Object} initialValues Init values (optional)
   */
  constructor(initialValues = {}) {
    this.#values = new Map();

    if (initialValues) {
      // Object.keys(initialValues).forEach();
    }
  }

  /**
   * Set value
   *
   * @param {String} path Value path
   * @param {*} value Value
   */
  set(path, value) {
    this.#values.set(path, value);
  }

  /**
   * Merge value
   *
   * @param {String} path Value path
   * @param {*} value Value
   */
  merge(path, value) {
    const target = this.#values.get(path);

    if (target && isObject(target) && isObject(value)) {
      this.#values.set(path, Object.assign(target, value));
    }
    else {
      throw new DeveloperError('To merge values a target must exist, the target must be an Object and the input value must be an Object.');
    }
  }

  /**
   * Get value
   *
   * @param {String} path Value path
   * @returns {*} Value
   */
  get(path) {
    const oneValue = this.#values.get(path);
    if (oneValue) {
      return oneValue;
    }

    const values = new Map();
    for (const [key, value] of this.#values) {
      if (key.includes(path)) {
        values.set(key, value);
      }
    }

    if (values.size > 0) {
      return values;
    }

    return undefined;
  }

  /**
   * Delete value
   *
   * @param {String} path Value path
   */
  delete(path) {
    this.#values.delete(path);
  }

  /**
   * Map to object
   *
   * @returns {Object} Object
   */
  toObject() {
    const obj = {};

    for (const [key, value] of this.#values) {
      obj[key] = value;
    }

    return obj;
  }
}

export default Store;
