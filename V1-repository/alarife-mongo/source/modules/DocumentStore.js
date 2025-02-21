import Document from '../models/Document';

/**
 * Document Store
 */
class DocumentStore {
  // #current = new Document();

  /**
   * List of documents
   * @type {Array<Document>}
   */
  #documents = [];

  /**
   * Add document
   *
   * @param {Document} document New document
   */
  add(document) {
    this.#documents.push(document);
  }

  /**
   * find document
   *
   * @param {Class} Target Target class, class decorated with @Document()
   *
   * @returns {Document | undefined} Document
   */
  find(Target) {
    return this.#documents.find(d => d.Target === Target) || new Document();
  }

  // /**
  //  * finish controller process
  //  */
  // finishController() {
  //   this.#documents.push(this.#current);

  //   this.#current = new Document();
  // }

  // /**
  //  * Get current Document
  //  *
  //  * @returns {Document} Document instance
  //  */
  // get current() {
  //   return this.#current;
  // }

  /**
   * Get documents
   *
   * @returns {Array<Document>} List of documents
   */
  get documents() {
    return this.#documents;
  }
}

export default new DocumentStore();
