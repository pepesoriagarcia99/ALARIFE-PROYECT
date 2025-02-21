import instanceStore from '../modules/instanceStore.js';

import Logger from '../services/logger/Logger.js';
import DeveloperError from '../services/logger/DeveloperError.js';

import { defineProperty } from '../utils.js';

/**
  ** Service decorator
  * @returns {function} The decorator function
*/
export const Service = () => (Target, { kind }) => {
  if (kind !== 'class') {
    throw new DeveloperError('The Service decorator can only be applied to classes.');
  }

  const logService = new Logger(Target.name);
  defineProperty(Target.prototype, 'log', logService.methods);

  instanceStore.set(Target.name, new Target());
};

/**
 * TODO: AutoWired con parametros de construcción
 * ? AutoWired(Target, flag, parameters) --> El flag identifica los diferentes servicios construidos
 */
/**
  ** AutoWired decorator
  * @param {Function} Target Class reference
  * @returns {Function} Initialize function
*/
export const AutoWired = Target => (field, { kind }) => {
  if (kind !== 'field') {
    throw new DeveloperError('The AutoWired decorator can only be applied to field.');
  }

  if (!Target) {
    throw new DeveloperError('Target service class is a required value.');
  }

  return () => instanceStore.get(Target.name);
};

export default Service;
