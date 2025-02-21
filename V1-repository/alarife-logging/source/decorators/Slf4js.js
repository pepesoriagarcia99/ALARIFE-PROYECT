// import DeveloperError from '../services/logger/DeveloperError.js';
// import { defineProperty } from '../utils.js';

// import { default as LoggerModule } from '../services/logger/Logger.js';

/**
 * TODO: Configuracion de que trazas aplican a este Logger en concreto.
 */
/**
  ** Slf4n decorator
  * @returns {function} The decorator function
*/
export const Slf4js = () => (Target, { kind }) => {
  if (kind !== 'class') {
    throw new DeveloperError('The Logger decorator can only be applied to classes.');
  }

  const logService = new LoggerModule(Target.name);
  defineProperty(Target.prototype, 'log', logService.methods);
};
