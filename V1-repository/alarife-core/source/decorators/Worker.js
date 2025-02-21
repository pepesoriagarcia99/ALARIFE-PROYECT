import DeveloperError from '../services/logger/DeveloperError.js';
import workerPool from '../modules/workerPool.js';

/**
  ** Worker decorator
  * @returns {function} The decorator function
*/
export const Worker = () => (target, { kind }) => {
  if (kind !== 'method') {
    throw new DeveloperError('The Worker decorator can only be applied to methods.');
  }

  return (...args) => {
    const f = new Function(`return ( function ${target.toString()}).apply(null, arguments);`);
    return workerPool.exec(f, args);
  };
};
