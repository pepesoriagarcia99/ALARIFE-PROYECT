import Ajv from 'ajv';
import ajvErrors from 'ajv-errors';

/**
 * Body validator
 *
 * @class BodyValidator
 * @public
 *
 * @constructor
 */
class BodyValidator {

  /**
   * Ajv instance
   * @type {Object}
   */
  #ajv;

  /**
   * Validator function
   * @type {Object}
   */
  #validate;

  /**
   * Body
   * @type {Object}
   */
  #body;

  /**
   * Target
   * @type {Class}
   */
  #Target;

  /**
    * Construct Validator
    *
    * @param {Object} schema Validation scheme
    * @param {Class} Target Target
    * @param {Object} options Schema validate options
    * @param {Object} body Body
  */
  constructor(schema, Target, options = {}, body) {
    const ajvOptions = Object.assign({ allErrors : true, strict : false }, options);

    this.#ajv = new Ajv(ajvOptions);
    ajvErrors(this.#ajv);

    this.#validate = this.#ajv.compile(schema);
    this.#validate(body);

    this.#body = body;
    this.#Target = Target;
  }

  /**
   * Model Builder
   */
  #buildModel() {
    /**
     * TODO: Build model
     * TODO: Generate an instance with the Target and fill it with the body
     * TODO: Fields that are references of other classes will also be instances
     */

    // const instance = new this.#Target();
    // Object.keys(instance).forEach(k => instance[k] = this.body[k]);
    // return instance;
  }

  /**
   * Get body
   */
  get body() {
    return this.#body;
  }

  /**
   * Get isValid
   */
  get isValid() {
    return this.#validate.errors === null || this.#validate.errors.length === 0;
  }

  /**
   * Get errors
   */
  get errors() {
    return this.#validate.errors;
  }

  /**
   * Get errors
   */
  get errorsText() {
    return this.#ajv.errorsText(this.#validate.errors);
  }
}

export default BodyValidator;
