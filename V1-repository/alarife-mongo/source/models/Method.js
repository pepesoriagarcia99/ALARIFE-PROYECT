/**
 * Method model
 *
 * @typedef {Object} Method
 * @param {String} reference Function name
 * @param {String} decorator Decorator name
 * @param {Array<any>} args Function arguments
 */
class Method {

  #reference;

  #decorator;

  #args;

  // /**
  //  * Constructor
  //  * @param {String} reference Decorated parameter name
  //  * @param {Object} data Method data
  //  */
  // constructor(reference, { decorator, args = [] }) {
  //   this.#reference = reference;
  //   this.#decorator = decorator;
  //   this.#args = args;
  // }
}

export default Method;
