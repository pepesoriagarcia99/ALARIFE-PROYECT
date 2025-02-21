import { Schema } from 'mongoose';

import { DeveloperError } from '@alarife/core/modules';
import { decodeArgs } from '@alarife/core/utils';

const fieldStore = {
  // eslint-disable-next-line no-undef
  values : new Map(),
  /**
   * Set item
   * @param {String} key Key name
   * @param {Object} value New value
   */
  set(key, value) {
    const currentValue = this.values.get(key);
    if (currentValue) {
      const newValue = Object.assign(currentValue, value);

      this.values.set(key, newValue);
    }
    else {
      this.values.set(key, value);
    }
  },
  /**
   * Map to object
   * @returns {Object} Object
   */
  toObject() {
    return Object.fromEntries(this.values.entries());
  }
};

/**
  ** Type decorators
  *
  * @String
  * @Number
  * @Date
  * @Buffer
  * @Boolean
  * @Mixed
  * TODO: @ObjectId
  * @Array
  * @Decimal128
  * @Map
  * @UUID
  * TODO: @Static
  * @BigInt
  */

/**
   ** timestamps:
   * ! si menciona createdAt o updatedAt añade la config de { timestamps : true } -------------> nose
   * ! Referenciar timestamps timestamps: { createdAt: 'created_at' }
   *
   */
/**
   * ! si no lanza este decorador en un parametro se configura en el esquema  { _id: false } || { id: false }
   * REvisar diferencia entre { _id: false } || { id: false }
   */

/**
 * TODO: Validate options
 */
// const defaultOptions = ['index', 'required', 'unique', 'default', 'get'];
// Object.keys(data).forEach(k => {
//   if (!allowedOptions.includes(k) && k !== 'name' && k !== 'type') {
//     throw new DeveloperError(`The option "${k}" is not allowed.`);
//   }
// });

/**
 * Set field
 * @param {String} decorator Decorator name
 * @param {Object} ctx Decorator context
 * @param {String} name Field name
 * @param {Object} options Decorator base options
 */
// , decoratorAllowedOptions = []
const setField = (decorator, ctx, options) => {
  if (ctx.kind !== 'field') {
    throw new DeveloperError(`The ${decorator} decorator can only be applied to field.`);
  }

  fieldStore.set(ctx.name, options);
};

/**
 * Options
 *
 * @param {Boolean} index
 * @param {Boolean} required
 * @param {Boolean} unique
 * @param {*} default
 * @param {Function} get
 *
 * @param {Boolean} lowercase
 * @param {Boolean} uppercase
 * @param {Boolean} trim
 * @param {RegExp} match
 * @param {Array} enum
 * @param {Number} minLength
 * @param {Number} maxLength
 * @param {Object} populate
 */
/**
 * Decorator @String
 *
 * @param {String | Object | undefined} args Decorator args
 * @returns {Function} Decorator
 */
export const String = (...args) => (field, ctx) => {
  console.log('----> String: ', ctx.name);

  const { name, options } = decodeArgs(args);

  // eslint-disable-next-line no-unused-expressions
  options.type && delete options.type;

  setField('String', ctx, { name, type : Schema.Types.String, ...options });

  // setFiled(
  //   'String',
  //   ctx,
  //   { type : Schema.Types.String },
  //   args,
  //   ['lowercase', 'uppercase', 'trim', 'match', 'enum', 'minLength', 'maxLength', 'populate']
  // );
};

// /**
//  * Options
//  *
//  * @param {Boolean} index
//  * @param {Boolean} required
//  * @param {Boolean} unique
//  * @param {*} default
//  * @param {Function} get
//  *
//  * @param {Number} min
//  * @param {Number} max
//  * @param {Array} enum
//  * @param {Object} populate
//  */
// /**
//  * Decorator @Number
//  *
//  * @param {String | Object | undefined} args Decorator args
//  * @returns {Function} Decorator
//  */
// export const Number = args => (field, ctx) => {
//   setFiled('Number', ctx, { type : Schema.Types.Number }, args, ['min', 'max', 'enum', 'populate']);
// };

// /**
//  * Options
//  *
//  * @param {Boolean} index
//  * @param {Boolean} required
//  * @param {Boolean} unique
//  * @param {*} default
//  * @param {Function} get
//  *
//  * @param {Number} min
//  * @param {Number} max
//  * @param {Number | String} expires
//  */
// /**
//  * Decorator @Date
//  *
//  * @param {String | Object | undefined} args Decorator args
//  * @returns {Function} Decorator
//  */
// export const Date = args => (field, ctx) => {
//   setFiled('Date', ctx, { type : Schema.Types.Date }, args, ['min', 'max', 'expires']);
// };

/**
//  * Options
//  *
//  * @param {Boolean} index
//  * @param {Boolean} required
//  * @param {Boolean} unique
//  * @param {*} default
//  * @param {Function} get
//  */
// /**
//  * Decorator @Buffer
//  *
//  * @param {String | Object | undefined} args Decorator args
//  * @returns {Function} Decorator
//  */
// export const Buffer = args => (field, ctx) => {
//   setFiled('Buffer', ctx, { type : Schema.Types.Buffer }, args);
// };

// /**
//  * Options
//  *
//  * @param {Boolean} index
//  * @param {Boolean} required
//  * @param {Boolean} unique
//  * @param {*} default
//  * @param {Function} get
//  */
// /**
//  * Decorator @Boolean
//  *
//  * @param {String | Object | undefined} args Decorator args
//  * @returns {Function} Decorator
//  */
// export const Boolean = args => (field, ctx) => {
//   setFiled('Boolean', ctx, { type : Schema.Types.Boolean }, args);
// };

// /**
//  * Options
//  *
//  * @param {Boolean} index
//  * @param {Boolean} required
//  * @param {Boolean} unique
//  * @param {*} default
//  * @param {Function} get
//  */
// /**
//  * Decorator @Mixed
//  *
//  * @param {String | Object | undefined} args Decorator args
//  * @returns {Function} Decorator
// */
// export const Mixed = args => (field, ctx) => {
//   setFiled('Mixed', ctx, { type : Schema.Types.Mixed }, args);
// };

/**
 * Options
 *
 * @param {Boolean} index
 * @param {Boolean} required
 * @param {Boolean} unique
 * @param {*} default
 *
 * @param {Object} populate
 */
/**
 * Decorator @ObjectId
 *
 * TODO: Revisar si se podria pasar la clase en vez del name en String
 * @param {Class} Model Reference to model class
 * @param {Object} options Decorator options
 *
 * @returns {Function} Decorator
 */
export const ObjectId = (...args) => (value, { kind, name }) => {
  // Model, options = {}
  console.log('----> ObjectId: ', name);

  if (kind !== 'field') {
    throw new DeveloperError('The ObjectId decorator can only be applied to field.');
  }

  /**
   * ! usar decodeArgs
   */

  // let documentName;
  // const options = {
  //   type : Schema.Types.ObjectId
  // };

  // if (args === undefined) {
  //   throw new DeveloperError('ObjectId decorator needs a reference document.');
  // }
  // else if (typeof args === 'function') {
  //   documentName = args;
  // }
  // else if (typeof args === 'object') {
  //   documentName = args.name;
  //   options = args.options;
  // }

  // fields.set(name, { type : Schema.Types.ObjectId, ref, ...options });
};

// /**
//  * Decorator @Array
//  *
//  * @param {Object | Class | Function} args Array schema
//  * @returns {Function} Decorator
//  */
// export const Array = args => (field, ctx) => {
//   setFiled('Array', ctx, { type : 'Array' }, args);
// };

// /**
//  * Options
//  *
//  * @param {Boolean} index
//  * @param {Boolean} required
//  * @param {Boolean} unique
//  * @param {*} default
//  * @param {Function} get
//  */
// /**
//  * Decorator @Decimal128
//  *
//  * @param {String | Object | undefined} args Decorator args
//  * @returns {Function} Decorator
//  */
// export const Decimal128 = args => (field, ctx) => {
//   setFiled('Mixed', ctx, { type : Schema.Types.Decimal128 }, args);
// };

// /**
//  * Options
//  *
//  * @param {Boolean} index
//  * @param {Boolean} required
//  * @param {Boolean} unique
//  * @param {*} default
//  * @param {Function} get
//  *
//  * @param {Object | Function | class} of Value type
//  */
// /**
//  * Decorator @Map
//  *
//  * @param {String | Object | undefined} args Decorator args
//  * @returns {Function} Decorator
//  */
// export const Map = args => (field, ctx) => {
//   setFiled('Map', ctx, { type : Schema.Types.Map }, args, ['of']);
// };

// /**
//  * Options
//  *
//  * @param {Boolean} index
//  * @param {Boolean} required
//  * @param {Boolean} unique
//  * @param {*} default
//  * @param {Function} get
//  *
//  * @param {Class | String | undefined} ref Reference to model class
//  */
// /**
//  * Decorator @UUID
//  *
//  * @param {String | Object | undefined} args Decorator args
//  * @returns {Function} Decorator
//  */
// export const UUID = args => (field, ctx) => {
//   setFiled('UUID', ctx, { type : Schema.Types.UUID }, args, ['ref']);
// };

// /**
//  * Options
//  *
//  * @param {Boolean} index
//  * @param {Boolean} required
//  * @param {Boolean} unique
//  * @param {*} default
//  * @param {Function} get
//  */
// /**
//  * Decorator @BigInt
//  *
//  * @param {String | Object | undefined} args Decorator args
//  * @returns {Function} Decorator
//  */
// export const BigInt = args => (field, ctx) => {
//   setFiled('BigInt', ctx, { type : BigInt }, args);
// };

// /**
//  * Decorator @Static
//  */
// export const Static = (target, ctx) => { };
