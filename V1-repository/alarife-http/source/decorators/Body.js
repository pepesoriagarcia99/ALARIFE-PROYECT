import { isClass, isDefined, isObject } from '@alarife/core/utils';
import { DeveloperError } from '@alarife/core/modules';

import { schemaLibrary } from './Dto';
import { addBodyMiddleware } from '../middleware/body';

/**
  ** Body decorator
  *
  * @param {Object} schema Validator scheme
  * @param {Object} options Validator options
  * @returns {Function} Body decorator
*/
export const Body = (schema, options = { additionalProperties : false }) => (target, { kind, name } ) => {
  if (kind !== 'method') {
    throw new DeveloperError('The Body decorator can only be applied to methods.');
  }

  if (!isDefined(schema)) {
    throw new DeveloperError('A data schema is required to validate.');
  }

  if (isClass(schema)) {
    const schemaObject = schemaLibrary.find(({ Target }) => Target === schema);
    if (!schemaObject) {
      throw new DeveloperError('Reference model not located.');
    }

    schemaObject.type = 'object';

    addBodyMiddleware(name, schemaObject, options);
  }
  else if (Array.isArray(schema) && isClass(schema[0])) {
    const schemaObject = schemaLibrary.find(({ Target }) => Target === schema);
    if (!schemaObject) {
      throw new DeveloperError('Reference model not located.');
    }

    const arraySchema = {
      type  : 'array',
      items : schemaObject
    };

    addBodyMiddleware(name, arraySchema, options);
  }
  else if (isObject(schema)) {
    addBodyMiddleware(name, schema, options);
  }
  else {
    throw new DeveloperError('The body decorator must receive an object or a class.');
  }
};
