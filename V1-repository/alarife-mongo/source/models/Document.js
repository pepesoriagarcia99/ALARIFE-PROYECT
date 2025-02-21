import Field from './Field';

/**
 ** Document options
 *
 * @typedef {Object} DocumentOptions
 * @param {Boolean} autoIndex In options object
 * @param {Boolean} autoCreate In options object
 * @param {Boolean} bufferCommands In options object
 * @param {Number} bufferTimeoutMS In options object
 * @param {Number | Object} capped In options object.Example object capped: { size: 1024, max: 1000, autoIndexId: true }
 * TODO: @param {String} collection In options object
 * @param {String} discriminatorKey In options object
 * @param {Boolean} excludeIndexes In options object
 * id (in @Field decorator)
 * _id (in @Field decorator)
 * minimize (in options object)
 * read (in options object)
 * writeConcern (in options object)
 * shardKey (in options object)
 * statics (in @Methods decorator)
 * ! strict (quizas siempre deberia ser estricto)
strictQuery
toJSON
toObject
typeKey
validateBeforeSave
versionKey
optimisticConcurrency
collation
 * timeseries (in options object)
selectPopulatedPaths
skipVersioning
 * TODO: timestamps (! Revisar no se si ponerlo por objeto options o por decorador @Fields)
 * storeSubdocValidationError (in options object)
 * collectionOptions (in options object)
 * methods (in @Methods decorator)
 * query (in @Methods decorator)
 */

/**
 * Document model
 *
 * @typedef {Object} Document
 * @param {String} name Document name
 * @param {Class} Target Reference model for the schema
 * @param {DocumentOptions} options Mongoose document options
 * @param {Array<Field>} fields Field collection
 * @param {Array<Method>} methods Method collection
 */
class Document {

  #name;

  #Target;

  // #instance;

  #options;

  #fields;

  #methods;

  /**
   * Constructor
   */
  constructor() {
    this.#fields = [];
    this.#methods = [];
  }

  /**
   * Builder
   *
   * @param {String} name Document name
   * @param {Object} options Document options
   * @param {Class} Target Target reference
   */
  builder(name, options, Target) {
    this.#name = name ?? Target.name;
    this.#options = options;
    this.#Target = Target;
  }

  /**
   * Add new field
   *
   * @param {String} ref Field name
   * @param {Object} options Field options
   */
  setField(ref, options) {
    const field = this.#fields.find(f => f.ref === ref);
    if (field) {
      field.build(options);
    }
    else {
      this.#fields.push(new Field(ref, options));
    }
  }

  generateSchema() {

  }

  generateModel() {

  }

  /**
   * Get name
   */
  get name() {
    return this.#name;
  }

  /**
   * Get Field collection
   */
  get fields() {
    return this.#fields;
  }

  //   /**
  //  * Modeling data
  //  *
  //  * @param {*} data Query result
  //  * @returns {Object | Array} Modeled data
  //  */
  //   buildModel(data) {
  //     const objectModeling = e => {
  //       const instance = new this.#Model();
  //       Object.keys(e._doc).forEach(k => instance[k] = e[k]);

  //       /**
  //        * !Revisar los campos inyectados por mongoose
  //        * (id || _id), $isNew, createdAt y updatedAt
  //        */
  //       instance.$isNew = e.$isNew;

  //       return instance;
  //     };

//     if (Array.isArray(data)) {
//       return data.map(e => objectModeling(e));
//     }
//     else {
//       return objectModeling(data);
//     }
//   }
}

export default Document;
