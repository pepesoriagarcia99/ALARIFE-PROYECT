/**
 * Uuid model
 *
 * @class Uuid
 */
class Uuid {
  /**
   * Creation date
   * @type {Date}
   */
  #date;

  /**
   * Id value
   * @type {String}
   */
  #value;

  /**
   * Value length
   * @type {Number}
   */
  #length;

  /**
   * Constructos
   * @param {Number} length Uuid length
   */
  constructor(length = 8) {
    this.#date = new Date();
    this.#length = length;
    this.#value = this.#generate();
  }

  /**
   * Generate Uuid
   * @returns {String} Uuid
   */
  #generate() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < this.length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  /**
   * Get value
   */
  get value() {
    return this.#value;
  }

  /**
   * Get date
   */
  get date() {
    return this.#date;
  }

  /**
   * Get length
   */
  get length() {
    return this.#length;
  }
}

export default Uuid;
