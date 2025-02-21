import { DeveloperError, Logger } from '@alarife/core/modules';
import { decodeArgs, defineProperty } from '@alarife/core/utils';

import documentStore from '../modules/DocumentStore';

// import { default as DocumentModel } from '../models/Document';

/**
 * TODO: Soporte para extends en las clases decoradas con @Document()
*/

// export const DocumentStore = {
//   /**
//    * list of generated Documents
//    * @type {Array<DocumentModel>}
//   */
//   documents : [],
//   /**
//    * Set value
//    *
//    * @param {DocumentOptions} document Document
//    */
//   add(document) {
//     this.documents.push(document);
//   },
//   /**
//    * Get value
//    *
//    * @param {DocumentOptions} document Document
//    * @returns {DocumentOptions} document Document
//    */
//   get(document) {
//     return this.documents.find(s => s.name === document.name);
//   }
// };

// /**
//  * Current document in initialization
//  * @type {DocumentModel}
//  */
// export let currentDocument = new DocumentModel();

/**
 * Decorator @Document
 *
 * @param {String} name Document name
 * @param {DocumentOptions} configuration Document configuration
 * @returns {Function} Decorator
 */
export const Document = (...args) => (Target, ctx) => {
  console.log('--------> Document: ', ctx.name);

  if (ctx.kind !== 'class') {
    throw new DeveloperError('The Service Document can only be applied to classes.');
  }

  const logService = new Logger(Target.name);
  defineProperty(Target.prototype, 'log', logService.methods);

  const { name, options } = decodeArgs(args);

  const currentDocument = documentStore.find(Target);

  // currentDocument.builder(name, options, Target);
  // ctx.metadata.name = currentDocument.name;

  // DocumentStore.add(currentDocument);
  // currentDocument = new DocumentModel();
};
