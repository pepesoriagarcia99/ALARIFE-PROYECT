import { isClass, isObject, isString } from './object';

/**
 * Check if the value is function
 *
 * @param {*} value Input value
 * @returns {Boolean} true or false
 */
export const isFunction = value => typeof value === 'function';

/**
 * Decode arguments
 *
 * @param {Array} args Decorator arguments
 * @param {Function} processOptions Processes the options to validate them
 * @returns {Object} Returns an object containing the decoded arguments
 */
export const decodeArgs = (args = [], processOptions = opt => opt) => {
  const data = {};

  if (args.length === 1) {
    const [ps1] = args;

    if (Array.isArray(ps1)) {
      data.values = ps1;
    }
    else if (isString(ps1)) {
      data.name = ps1;
    }
    else if (isObject(ps1)) {
      data.options = processOptions(ps1);
    }
    else if (isClass(ps1)) {
      data.target = ps1;
    }
  }
  else if (args.length === 2) {
    const [ps1, ps2] = args;

    if (isString(ps1)) {
      data.name = ps1;

      if (isObject(ps2)) {
        data.options = processOptions(ps2);
      }
    }
    else if (Array.isArray(ps1)) {
      data.values = ps1;

      if (isObject(ps2)) {
        data.options = processOptions(ps2);
      }
    }
    else if (isClass(ps1)) {
      data.target = ps1;

      if (isObject(ps2)) {
        data.options = processOptions(ps2);
      }
    }
  }
  else if (args.length === 3) {
    const [ps1, ps2, ps3] = args;

    if (isString(ps1)) {
      data.name = ps1;

      if (Array.isArray(ps2)) {
        data.values = ps2;
      }
      else if (isClass(ps2) || isObject(ps2)) {
        data.target = ps2;
      }

      if (isObject(ps3)) {
        data.options = processOptions(ps3);
      }
    }
  }

  return data;
};
