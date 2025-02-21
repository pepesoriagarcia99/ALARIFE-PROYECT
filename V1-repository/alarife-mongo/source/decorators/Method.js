import { DeveloperError } from '@alarife/core/modules';

/**
  ** Method decorators
  * @Override
  * TODO: @Virtual
  * TODO: @Path
  * TODO: @Pre
  * TODO: @Post
  */

/**
 * Decorator @Override
 *
 * Method decorator
 * @param {*} target Decorator param
 * @param {Object} ctx Decorator param
 */
export const Override = (target, { name, kind }) => {
  console.log('----> Override: ', name);

  if (kind !== 'method') {
    throw new DeveloperError('The Override decorator can only be applied to methods.');
  }

  // methods.set(name, { decorator : 'Override', method : name });
};

/**
//  * Decorator @Virtual
//  *
//  * Accesor decorator
//  * @param {*} target Decorator param
//  * @param {Object} ctx Decorator param
//  */
// export const Virtual = (target, ctx) => {
//   onsole.log('------------> Virtual: ', name);

//   /**
//    ** EXAMPLE

//     class User {
//       @Virtual
//       get fullname() {
//         return `${this.name.first} ${this.name.last}`;
//       }

//       @Virtual
//       set fullname(name) {
//         this.name.first = v.substr(0, v.indexOf(' '));
//         this.name.last = v.substr(v.indexOf(' ') + 1);
//       }
//     }
//   */
// };

// /**
//  * Decorator @Path
//  *
//  * @returns {Function} Decorator
//  */
// export const Path = () => (target, { kind }) => {
//   if (kind !== 'method') {
//     throw new DeveloperError('The Override decorator can only be applied to methods.');
//   }
// };

// /**
//  * Decorator @Pre
//  *
//  * @returns {Function} Decorator
//  */
// export const Pre = () => (target, { kind }) => {
//   if (kind !== 'method') {
//     throw new DeveloperError('The Override decorator can only be applied to methods.');
//   }
// };

// /**
//  * Decorator @Post
//  *
//  * @returns {Function} Decorator
//  */
// export const Post = () => (target, { kind }) => {
//   if (kind !== 'method') {
//     throw new DeveloperError('The Override decorator can only be applied to methods.');
//   }
// };
