/**
 * Internal Route model
 *
 * @class Route
 * @public
 *
 * @constructor
 *
 * @typedef {Object} Route
 * @param {String} type Router type (get, post, put, delete)
 * @param {String} path Router path
 * @param {String} method Main method name of the controller
 */
class Route {

  #type;

  #path;

  #method;

  /**
   * Controller constructor
   */
  constructor({ type, path, method }) {
    this.#type = type;
    this.#path = path;
    this.#method = method;
  }

  /**
   * Get type
   */
  get type() {
    return this.#type;
  }

  /**
   * Get path
   */
  get path() {
    return this.#path;
  }

  /**
   * Get method
   */
  get method() {
    return this.#method;
  }
}

export default Route;
