import DeveloperError from '../services/logger/DeveloperError.js';
import valueStore from '../modules/valueStore.js';

/**
  ** Value decorator
  * @param {String} path Value path
  * @returns {Function} Initialize function
*/
export const Value = path => (field, { kind }) => {
  if (kind !== 'field') {
    throw new DeveloperError('The Value decorator can only be applied to field.');
  }

  if (!path) {
    throw new DeveloperError('A path is needed to find the value.');
  }

  return () => valueStore.get(path);
};

