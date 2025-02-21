import { DeveloperError } from '@alarife/core/modules';

/**
 * Internal Controller model
 *
 * @class Controller
 * @public
 *
 * @constructor
 *
 * @typedef {Object} Controller
 * @param {Class} Target Reference controller class
 * @param {Object} instance Controller instance
 * @param {String} path Controller path
 * @param {Array<Route>} routes List of routes assigned to controller methods
 * @param {Array<Middleware>} middlewares List of middlewares assigned to controller methods
 * @param {Boolean} excludeImport Exclude controller from import
 */
class Controller {
  #Target;

  #instance;

  #path;

  #routes;

  #middlewares;

  excludeImport;

  /**
   * Controller constructor
   * @param {Boolean} excludeImport Exclude controller from import
   */
  constructor(excludeImport = false) {
    this.#routes = [];
    this.#middlewares = [];

    this.excludeImport = excludeImport;
  }

  /**
   * Complete the driver information
   ** Launched in the controller decorator
   *
   * @param {Class} Target Reference controller class
   * @param {String} path Controller path
   */
  build({ Target, path }) {
    this.#Target = Target;
    this.#path = path;
  }

  /**
   * Add a new route to the controller
   * @param {Route} route New route
   */
  addRoute(route) {
    const identicalPath = this.#routes.find(r => r.path === route.path && r.type === route.type);
    if (identicalPath) {
      throw new DeveloperError(`The path ${route.path} is already in use.`);
    }

    this.#routes.push(route);
  }

  /**
   * Add a new middleware to the controller
   * @param {Middleware} middleware New middleware
   */
  addMiddleware(middleware) {
    this.#middlewares.unshift(middleware);
  }

  /**
   * List of middlewares filtered by method
   * @param {String} method Name of the method it is assigned to in the controller
   * @returns {Array<Function>} List of middlewares
   */
  getMiddlewares(method) {
    return this.#middlewares
      .filter(m => m.method === method || m.method === 'all')
      .sort(e => (e.method === 'all' ? -1 : 0))
      .map(e => e.func);
  }

  /**
   * Get routes
   */
  get routes() {
    return this.#routes;
  }

  /**
   * Get Target
   */
  get Target() {
    return this.#Target;
  }

  /**
   * Get path
   */
  get path() {
    return this.#path;
  }

  /**
   * Set instance
   * @param {Object} instance Controller instance
   */
  set instance(instance) {
    this.#instance = instance;
  }

  /**
   * Get instance
   */
  get instance() {
    return this.#instance;
  }
}

export default Controller;
