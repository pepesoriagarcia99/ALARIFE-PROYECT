"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
 * Instance store
 */
class InstanceStore {
  // eslint-disable-next-line no-undef
  instances = new Map();

  /**
   * Set Instance
   * @param {String} key Instance key
   * @param {Object} value Instance schema
   */
  set(key, value) {
    this.instances.set(key, value);
  }

  /**
   * Get Instance by key
   * @param {String} key Instance key
   * @returns {Object} Instance
   */
  get(key) {
    return this.instances.get(key);
  }

  /**
   * Delete delete instance by key
   *
   * @param {String} key Instance key
   */
  delete(key) {
    this.instances.delete(key);
  }
}var _default = exports.default =

new InstanceStore();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJJbnN0YW5jZVN0b3JlIiwiaW5zdGFuY2VzIiwiTWFwIiwic2V0Iiwia2V5IiwidmFsdWUiLCJnZXQiLCJkZWxldGUiLCJfZGVmYXVsdCIsImV4cG9ydHMiLCJkZWZhdWx0Il0sInNvdXJjZXMiOlsiLi4vLi4vc291cmNlL21vZHVsZXMvSW5zdGFuY2VTdG9yZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogSW5zdGFuY2Ugc3RvcmVcclxuICovXHJcbmNsYXNzIEluc3RhbmNlU3RvcmUge1xyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxyXG4gIGluc3RhbmNlcyA9IG5ldyBNYXAoKTtcclxuXHJcbiAgLyoqXHJcbiAgICogU2V0IEluc3RhbmNlXHJcbiAgICogQHBhcmFtIHtTdHJpbmd9IGtleSBJbnN0YW5jZSBrZXlcclxuICAgKiBAcGFyYW0ge09iamVjdH0gdmFsdWUgSW5zdGFuY2Ugc2NoZW1hXHJcbiAgICovXHJcbiAgc2V0KGtleSwgdmFsdWUpIHtcclxuICAgIHRoaXMuaW5zdGFuY2VzLnNldChrZXksIHZhbHVlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCBJbnN0YW5jZSBieSBrZXlcclxuICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5IEluc3RhbmNlIGtleVxyXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IEluc3RhbmNlXHJcbiAgICovXHJcbiAgZ2V0KGtleSkge1xyXG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VzLmdldChrZXkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGVsZXRlIGRlbGV0ZSBpbnN0YW5jZSBieSBrZXlcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBrZXkgSW5zdGFuY2Uga2V5XHJcbiAgICovXHJcbiAgZGVsZXRlKGtleSkge1xyXG4gICAgdGhpcy5pbnN0YW5jZXMuZGVsZXRlKGtleSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBuZXcgSW5zdGFuY2VTdG9yZSgpO1xyXG4iXSwibWFwcGluZ3MiOiJxR0FBQTtBQUNBO0FBQ0E7QUFDQSxNQUFNQSxhQUFhLENBQUM7RUFDbEI7RUFDQUMsU0FBUyxHQUFHLElBQUlDLEdBQUcsQ0FBQyxDQUFDOztFQUVyQjtBQUNGO0FBQ0E7QUFDQTtBQUNBO0VBQ0VDLEdBQUdBLENBQUNDLEdBQUcsRUFBRUMsS0FBSyxFQUFFO0lBQ2QsSUFBSSxDQUFDSixTQUFTLENBQUNFLEdBQUcsQ0FBQ0MsR0FBRyxFQUFFQyxLQUFLLENBQUM7RUFDaEM7O0VBRUE7QUFDRjtBQUNBO0FBQ0E7QUFDQTtFQUNFQyxHQUFHQSxDQUFDRixHQUFHLEVBQUU7SUFDUCxPQUFPLElBQUksQ0FBQ0gsU0FBUyxDQUFDSyxHQUFHLENBQUNGLEdBQUcsQ0FBQztFQUNoQzs7RUFFQTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0VBQ0VHLE1BQU1BLENBQUNILEdBQUcsRUFBRTtJQUNWLElBQUksQ0FBQ0gsU0FBUyxDQUFDTSxNQUFNLENBQUNILEdBQUcsQ0FBQztFQUM1QjtBQUNGLENBQUMsSUFBQUksUUFBQSxHQUFBQyxPQUFBLENBQUFDLE9BQUE7O0FBRWMsSUFBSVYsYUFBYSxDQUFDLENBQUMifQ==