import { DeveloperError, Logger } from '@alarife/core/modules';
import { decodeArgs, defineProperty, isClass, isDefined, isObject } from '@alarife/core/utils';

/**
 * TODO: Soporte para extends en las clases decoradas con @Dto()
 */

export const BASE_SCHEMA = {
  name                 : undefined,
  Target               : undefined,
  properties           : {},
  optionalProperties   : {},
  definitions          : {},
  required             : [],
  additionalProperties : false,
  errorMessage         : {
    properties : {},
    required   : {}
  }
};

export const schemaLibrary = [];
let schema = Object.assign({}, BASE_SCHEMA);

/**
 * Reset schema
 */
const resetSchema = () => {
  schema = Object.assign({}, BASE_SCHEMA);
};

/**
 * Options
 *
 * @typedef {Object} FieldOptions
 * @param {Boolean} optional Optional field
 * @param {Boolean} required Required field
 * @param {Boolean} nullable Nullable field
 * @param {String} error Error custom message
 *
 */
/**
 * Set field
 * @param {String} decoratorName Decorator name
 * @param {Object} ctx Decorator context
 * @param {String} fieldName Field name
 * @param {FieldOptions} options Field options
 */
const setField = (decoratorName, ctx, fieldName, options) => {
  if (ctx.kind !== 'field') {
    throw new DeveloperError(`The ${decoratorName} decorator can only be applied to field.`);
  }

  const name = fieldName ?? ctx.name;

  if (options.optional === true) {
    delete options.optional;
    schema.optionalProperties[name] = options;
  }
  else {
    options.nullable = options.nullable ?? false;
    schema.properties[name] = options;

    if (options.required === true) {
      schema.required.push(name);
      schema.errorMessage.required[name] = `The ${name} field is required.`;

      delete options.required;
    }
    else if (Array.isArray(options.required) && options.required.length === 2) {
      schema.required.push(name);
      schema.errorMessage.required[name] = options.required[1];

      delete options.required;
    }
  }

  /** Custom error message */
  if (options.error) {
    schema.errorMessage.properties[name] = options.error;

    delete options.error;
  }
};

/**
 * Process options
 *
 * @param {Object} opt Decorator options
 * @returns {Object} Returns the processed options
 */
const processOptions = opt => {
  // eslint-disable-next-line no-unused-expressions
  (opt && opt.ref) && delete opt.ref;
  // eslint-disable-next-line no-unused-expressions
  (opt && opt.enum) && delete opt.enum;
  // eslint-disable-next-line no-unused-expressions
  (opt && opt.type) && delete opt.type;

  return opt;
};

/**
 * Any field decorator
 * @param {String | Object | undefined} args Field args
 * @returns {Function} Decorator
*/
export const Any = (...args) => (field, ctx) => {
  const { name, options } = decodeArgs(args);

  if (!isDefined(options.type)) {
    throw new DeveloperError('The type is required in the Any decorator.');
  }

  setField('Any', ctx, name, options);
};

/**
 * Enum field decorator
 * @param {String | Object | Array} args Field args
 * @returns {Function} Decorator
 */
export const Enum = (...args) => (field, ctx) => {
  const { name, values, options } = decodeArgs(args, processOptions);

  if (values.length === 0) {
    throw new DeveloperError('A list of values is required for the Enum decorator.');
  }

  setField('Enum', ctx, name, { enum : values, required : true, ...options });
};

/**
 * String field decorator
 *
 * @param {*} args Field options
 * @returns {Function} Decorator
 */
export const String = (...args) => (field, ctx) => {
  const { name, options } = decodeArgs(args, processOptions);

  setField('String', ctx, name, { type : 'string', ...options });
};

/**
 * Number field decorator
 *
 * @param {*} args Field options
 * @returns {Function} Decorator
 */
export const Number = (...args) => (field, ctx) => {
  const { name, options } = decodeArgs(args, processOptions);
  const type = options.type ?? 'integer';

  setField('Number', ctx, name, { type, ...options });
};

/**
 * Date field decorator
 *
 * @param {*} args Field options
 * @returns {Function} Decorator
 */
export const Date = (...args) => (field, ctx) => {
  const { name, options } = decodeArgs(args, processOptions);

  setField('Date', ctx, name, { type : 'timestamp', ...options });
};

/**
 * Boolean field decorator
 *
 * @param {*} args Field options
 * @returns {Function} Decorator
 */
export const Boolean = (...args) => (field, ctx) => {
  const { name, options } = decodeArgs(args, processOptions);

  setField('Boolean', ctx, name, { type : 'timestamp', ...options });
};

/**
 * ObjectId field decorator
 * @param {*} args Field options
 * @returns {Function} Decorator
 */
export const ObjectId = (...args) => (field, ctx) => {
  if (ctx.kind !== 'field') {
    throw new DeveloperError('The ObjectId decorator can only be applied to field.');
  }

  const data = decodeArgs(args, processOptions);
  const name = data.name ?? ctx.name;

  if (isObject(data.target)) {
    schema.definitions[name] = data.target;
  }
  else if (isClass(data.target)) {
    const schemaObject = schemaLibrary.find(({ Target }) => Target === data.target);

    if (!schemaObject) {
      throw new DeveloperError('Reference model not located.');
    }

    const schemaObjectClone = Object.assign({ type : 'object' }, schemaObject);
    schema.definitions[name] = schemaObjectClone;
  }

  setField('ObjectId', ctx, name, { ref : name, ...data.options });
};

/**
 * ArrayId field decorator
 * @param {*} args Field options
 * @returns {Function} Decorator
 */
export const ArrayId = (...args) => (field, ctx) => {
  if (ctx.kind !== 'field') {
    throw new DeveloperError('The ObjectId decorator can only be applied to field.');
  }

  const data = decodeArgs(args, processOptions);
  const name = data.name ?? ctx.name;

  if (isObject(data.target)) {
    schema.definitions[name] = data.target;
  }
  else if (isClass(data.target)) {
    const schemaObject = schemaLibrary.find(({ Target }) => Target === data.target);

    if (!schemaObject) {
      throw new DeveloperError('Reference model not located.');
    }

    // eslint-disable-next-line no-unused-expressions
    data.options.maxItems && delete data.options.maxItems;
    // eslint-disable-next-line no-unused-expressions
    data.options.minItems && delete data.options.minItems;
    // eslint-disable-next-line no-unused-expressions
    data.options.uniqueItems && delete data.options.uniqueItems;

    const schemaArray = {
      type  : 'array',
      items : Object.assign({}, schemaObject),
      ...data.options
    };
    schema.definitions[name] = schemaArray;
  }

  setField('ArrayId', ctx, name, { ref : name, ...data.options });
};

/**
 * Options
 * @typedef {Object} DtoOptions
 * @param {Object} error Model-level error messages
 */
/**
 * Dto decorator
 * @param {DtoOptions} options Class options
 * @returns {Function} Decorator
 */
export const Dto = (options = {}) => (Target, { name, kind }) => {
  if (kind !== 'class') {
    throw new DeveloperError('The Dto decorator can only be applied to classes.');
  }

  /** Modules and values used in the instance */
  const logService = new Logger(Target.name);
  defineProperty(Target.prototype, 'log', logService.methods);

  if (options.error) {
    schema.errorMessage.type = options.error.type;
    schema.errorMessage._ = options.error.generic;

    delete options.error;
  }

  schema.name = name;
  schema.Target = Target;
  schema.options = options;

  schemaLibrary.push(schema);

  resetSchema();
};
