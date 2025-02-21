/**
 * Internal router Middleware model
 *
 * @class Middleware
 * @public
 *
 * @constructor
 *
 * @typedef {Object} Middleware
 * @param {String} type Decorator ref (Body, Use,..)
 * @param {String} method Method name it applies to
 * @param {Function} func Middleware function
 */
class Middleware {

  #type;

  #method;

  #func;

  /**
   * Constructor
   * @param {String} type Decorator name
   * @param {String} method Method name
   * @param {Function} func Middleware function
   */
  constructor({ type, method, func }) {
    this.#type = type;
    this.#method = method;
    this.#func = func;
  }

  /**
   * Get type
   */
  get type() {
    return this.#type;
  }

  /**
   * Get method
   */
  get method() {
    return this.#method;
  }

  /**
   * Get func
   */
  get func() {
    return this.#func;
  }
}

export default Middleware;
