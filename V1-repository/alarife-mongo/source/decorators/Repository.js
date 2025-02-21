// import mongoose, { Schema } from 'mongoose';

import { DeveloperError, instanceStore, Logger } from '@alarife/core/modules';
import { defineProperty } from '@alarife/core/utils';

// import { DeveloperError, InstanceStore, Logger } from '@alarife/core/lib/modules';
// import { defineProperty } from '@alarife/core/lib/utils';

// import { mongooseSchema } from './Document';
// import { MethodStore } from './Method';

// const migratedMethods = [
//   'create',
//   'aggregate',
//   'createCollection',
//   'createIndexes',
//   'deleteMany',
//   'deleteOne',
//   'distinct',
//   'find',
//   'findById',
//   'findByIdAndDelete',
//   'findByIdAndRemove',
//   'findByIdAndUpdate',
//   'findOne',
//   'findOneAndDelete',
//   'findOneAndRemove',
//   'findOneAndReplace',
//   'findOneAndUpdate',
//   'insertMany',
//   'populate'
// ];

/**
 * Repository
 */
// export class MongoRepository {

//   // eslint-disable-next-line require-jsdoc
//   create() {}

//   // eslint-disable-next-line require-jsdoc
//   aggregate() {}

//   // eslint-disable-next-line require-jsdoc
//   createCollection() {}

//   // eslint-disable-next-line require-jsdoc
//   createIndexes() {}

//   // eslint-disable-next-line require-jsdoc
//   deleteMany() {}

//   // eslint-disable-next-line require-jsdoc
//   deleteOne() {}

//   // eslint-disable-next-line require-jsdoc
//   distinct() {}

//   // eslint-disable-next-line require-jsdoc
//   find() {}

//   // eslint-disable-next-line require-jsdoc
//   findById() {}

//   // eslint-disable-next-line require-jsdoc
//   findByIdAndDelete() {}

//   // eslint-disable-next-line require-jsdoc
//   findByIdAndRemove() {}

//   // eslint-disable-next-line require-jsdoc
//   findByIdAndUpdate() {}

//   // eslint-disable-next-line require-jsdoc
//   findOne() {}

//   // eslint-disable-next-line require-jsdoc
//   findOneAndDelete() {}

//   // eslint-disable-next-line require-jsdoc
//   findOneAndRemove() {}

//   // eslint-disable-next-line require-jsdoc
//   findOneAndReplace() {}

//   // eslint-disable-next-line require-jsdoc
//   findOneAndUpdate() {}

//   // eslint-disable-next-line require-jsdoc
//   insertMany() {}

//   // eslint-disable-next-line require-jsdoc
//   populate() {}
// }

/**
 * ! @Virtual hidrata el modelo
 */
/**
//  * Modeling data
//  *
//  * @param {*} data Query result
//  * @param {Function} Model Models assigned to the repository
//  * @returns {Object | Array} Modeled data
//  */
// const constructor = (data, Model) => {
//   const objectModeling = e => {
//     const instance = new Model();
//     Object.keys(e._doc).forEach(k => instance[k] = e[k]);

//     instance.$isNew = e.$isNew;

//     return instance;
//   };

//   if (Array.isArray(data)) {
//     return data.map(e => objectModeling(e));
//   }
//   else {
//     return objectModeling(data);
//   }
// };

// /**
//  *
//  * @param {*} Target
//  * @param {*} Model
//  * @param {*} model
//  */
// const overrideGenericMethods = (Target, Model, model) => {
//   migratedMethods.forEach(method => {
//     /**
//      * !Comprueba que el metodo no tenga el @Override
//      */
//     if (!MethodStore.getOneByMethod(method)) {
//       Target.prototype[method] = function (...args) {
//         return model[method](...args).then(e => (e ? constructor(e, Model) : e));
//       };
//     }
//   });
// };

// /**
//  * Filtros sintacticos
//  *
//  * @param {*} fields
//  * @param {*} Target
//  * @param {*} Model
//  * @param {*} model
//  */
// const generateMethodsByParameter = (fields, Target, Model, model) => {
//   Object.keys(fields).forEach(key => {
//     const methodName = `findBy${key.charAt(0).toUpperCase() + key.slice(1)}`;

//     /** Revisar, no estoy seguro */
//     Target.prototype[methodName] = function (value ) {
//       return model.find({ [key] : value }).then(e => (e ? constructor(e, Model) : e));
//     };
//   });
// };

/**
 * Decorator @Repository
 *
 * @param {Function} Model Class model
 * @returns {Function} Decorator
 */
export const Repository = Model => (Target, ctx) => {
  console.log('--------> Repository: ', ctx.name, Model);

  if (ctx.kind !== 'class') {
    throw new DeveloperError('The Repository Document can only be applied to classes.');
  }

  if (!Model) {
    throw new DeveloperError('Target model class is a required value.');
  }

  const logService = new Logger(Target.name);
  defineProperty(Target.prototype, 'log', logService.methods);

  /**
   ** Asignar los nuevos metodos al schema antes de generar el modelo
   */

  // const { fields, options } = mongooseSchema.schema;

  /**
   * ! Añadir al esquema los Pre y Post
   */

  // const schema = new Schema(fields, options);
  // const model = mongoose.model(mongooseSchema.name, schema);

  // defineProperty(Target.prototype, 'model', model);

  // // overrideGenericMethods(Target, Model, model);
  // // generateMethodsByParameter(fields, Target, Model, model);

  // const targetInstance = new Target();

  instanceStore.set(Target.name, new Target());

  // MethodStore.clear();

  console.log('<----------------------------------->');
};
