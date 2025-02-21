import Controller from '../models/Controller.js';

/**
 * Controller Store
 */
class ControllerStore {

  /**
   * Current controller in initialization
   * @type {Controller}
   */
  #current = new Controller();

  /**
   * List of controller routes in initialization
   * @type {Array<Controller>}
   */
  #controllers = [];

  /**
   * Add controller
   *
   * @param {Controller} controller New controller instance
   */
  add(controller) {
    this.#controllers.push(controller);
  }

  /**
   * Find controller by Target
   *
   * @param {Class} Target Controller class
   * @returns {Controller} Controller instance
   */
  find(Target) {
    return this.#controllers.find(c => c.Target === Target);
  }

  /**
   * finish controller process
   */
  finishController() {
    this.#controllers.push(this.#current);

    this.#current = new Controller();
  }

  /**
   * Get current controller
   *
   * @returns {Controller} Controller instance
   */
  get current() {
    return this.#current;
  }

  /**
   * Get controllers
   *
   * @returns {Array<Controller>} List of controllers
   */
  get controllers() {
    return this.#controllers;
  }
}

export default new ControllerStore();
