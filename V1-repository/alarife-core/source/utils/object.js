/**
  * Define a new parameter on an object with our default parameters
  * @param {Object} prototype Target object
  * @param {String} key New key
  * @param {*} value Default value
*/
export const defineProperty = (prototype, key, value) => {
  Object.defineProperty(prototype, key, {
    value,
    writable     : false,
    enumerable   : true,
    configurable : false
  });
};

/**
 * Check if the value is defined
 *
 * @param {*} value Input value
 * @returns {Boolean} true or false
 */
export const isDefined = value => value !== undefined && value !== null;

/**
 *  Check if the value is a class
 *
 * @param {*} value Input value
 * @returns {Boolean} true or false
 */
export const isClass = value => typeof value === 'function' && /^\s*class\s+/.test(value.toString());

/**
 * Check if the value is a object
 *
 * @param {*} value Input value
 * @returns  {Boolean} true or false
 */
export const isObject = value => typeof value === 'object' && value !== null;

/**
 * Check if the value is a string
 *
 * @param {*} value Input value
 * @returns  {Boolean} true or false
 */
export const isString = value => (typeof value === 'string' || value instanceof String);

/**
 * Check if the value is a number
 *
 * @param {*} value Input value
 * @returns  {Boolean} true or false
 */
export const isNumber = value => (typeof value === 'number' || value instanceof Number);

/**
 * Combine objects superficially
 *
 * @param {Object} target Target object
 * @param {Object} source Source object
 * @returns {Object} Result object
 */
export const merge = (target, source) => {
  const keys = Object.keys(target);
  const result = {};
  keys.forEach(key => {
    result[key] = source[key] || target[key];
  });

  return result;
};

