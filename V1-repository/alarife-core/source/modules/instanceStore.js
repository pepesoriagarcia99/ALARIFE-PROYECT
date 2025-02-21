/**
 * Instance store module
 *
 ** No se migra al modelo Store porque se le añadira complejidad en un futuro.
 */
export default {
  instances : new Map(),
  /**
     * Set Instance
     * @param {String} key Instance key
     * @param {Object} value Instance schema
     */
  set(key, value) {
    this.instances.set(key, value);
  },
  /**
     * Get Instance by key
     * @param {String} key Instance key
     * @returns {Object} Instance
     */
  get(key) {
    return this.instances.get(key);
  },
  /**
     * Delete delete instance by key
     *
     * @param {String} key Instance key
     */
  delete(key) {
    this.instances.delete(key);
  }
};
