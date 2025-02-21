"use strict";var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _DeveloperError = _interopRequireDefault(require("./DeveloperError.js"));

var _utils = require("../utils.js");

/**
 * ValueStore
 */
class ValueStore {
  // eslint-disable-next-line no-undef
  values = new Map();

  /**
   * Constructor
   */
  constructor() {
    /**
     * TODO: añadir los valores encontrados en process.env
     */
    this.values.set('configuration', {});
  }

  /**
   * Set value
   *
   * @param {String} path Value path
   * @param {*} value Value
   */
  set(path, value) {
    this.values.set(path, value);
  }

  /**
   * Merge value
   *
   * @param {String} path Value path
   * @param {*} value Value
   */
  merge(path, value) {
    const target = this.values.get(path);

    if (target && (0, _utils.isObject)(target) && (0, _utils.isObject)(value)) {
      this.values.set(path, Object.assign(target, value));
    } else
    {
      throw new _DeveloperError.default('To merge values a target must exist, the target must be an Object and the input value must be an Object.');
    }
  }

  /**
   * Get value
   *
   * @param {String} path Value path
   * @returns {*} Value
   */
  get(path) {
    const oneValue = this.values.get(path);
    if (oneValue) {
      return oneValue;
    }

    // eslint-disable-next-line no-undef
    const values = new Map();
    for (const [key, value] of this.values) {
      if (key.includes(path)) {
        values.set(key, value);
      }
    }

    if (values.size > 0) {
      return values;
    }

    return undefined;
  }

  /**
   * Delete value
   *
   * @param {String} path Value path
   */
  delete(path) {
    this.values.delete(path);
  }
}var _default = exports.default =

new ValueStore();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfRGV2ZWxvcGVyRXJyb3IiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwicmVxdWlyZSIsIl91dGlscyIsIlZhbHVlU3RvcmUiLCJ2YWx1ZXMiLCJNYXAiLCJjb25zdHJ1Y3RvciIsInNldCIsInBhdGgiLCJ2YWx1ZSIsIm1lcmdlIiwidGFyZ2V0IiwiZ2V0IiwiaXNPYmplY3QiLCJPYmplY3QiLCJhc3NpZ24iLCJEZXZlbG9wZXJFcnJvciIsIm9uZVZhbHVlIiwia2V5IiwiaW5jbHVkZXMiLCJzaXplIiwidW5kZWZpbmVkIiwiZGVsZXRlIiwiX2RlZmF1bHQiLCJleHBvcnRzIiwiZGVmYXVsdCJdLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS9tb2R1bGVzL1ZhbHVlU3RvcmUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IERldmVsb3BlckVycm9yIGZyb20gJy4vRGV2ZWxvcGVyRXJyb3IuanMnO1xyXG5cclxuaW1wb3J0IHsgaXNPYmplY3QgfSBmcm9tICcuLi91dGlscy5qcyc7XHJcblxyXG4vKipcclxuICogVmFsdWVTdG9yZVxyXG4gKi9cclxuY2xhc3MgVmFsdWVTdG9yZSB7XHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXHJcbiAgdmFsdWVzID0gbmV3IE1hcCgpO1xyXG5cclxuICAvKipcclxuICAgKiBDb25zdHJ1Y3RvclxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBUT0RPOiBhw7FhZGlyIGxvcyB2YWxvcmVzIGVuY29udHJhZG9zIGVuIHByb2Nlc3MuZW52XHJcbiAgICAgKi9cclxuICAgIHRoaXMudmFsdWVzLnNldCgnY29uZmlndXJhdGlvbicsIHt9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCB2YWx1ZVxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtTdHJpbmd9IHBhdGggVmFsdWUgcGF0aFxyXG4gICAqIEBwYXJhbSB7Kn0gdmFsdWUgVmFsdWVcclxuICAgKi9cclxuICBzZXQocGF0aCwgdmFsdWUpIHtcclxuICAgIHRoaXMudmFsdWVzLnNldChwYXRoLCB2YWx1ZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBNZXJnZSB2YWx1ZVxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtTdHJpbmd9IHBhdGggVmFsdWUgcGF0aFxyXG4gICAqIEBwYXJhbSB7Kn0gdmFsdWUgVmFsdWVcclxuICAgKi9cclxuICBtZXJnZShwYXRoLCB2YWx1ZSkge1xyXG4gICAgY29uc3QgdGFyZ2V0ID0gdGhpcy52YWx1ZXMuZ2V0KHBhdGgpO1xyXG5cclxuICAgIGlmICh0YXJnZXQgJiYgaXNPYmplY3QodGFyZ2V0KSAmJiBpc09iamVjdCh2YWx1ZSkpIHtcclxuICAgICAgdGhpcy52YWx1ZXMuc2V0KHBhdGgsIE9iamVjdC5hc3NpZ24odGFyZ2V0LCB2YWx1ZSkpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIHRocm93IG5ldyBEZXZlbG9wZXJFcnJvcignVG8gbWVyZ2UgdmFsdWVzIGEgdGFyZ2V0IG11c3QgZXhpc3QsIHRoZSB0YXJnZXQgbXVzdCBiZSBhbiBPYmplY3QgYW5kIHRoZSBpbnB1dCB2YWx1ZSBtdXN0IGJlIGFuIE9iamVjdC4nKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB2YWx1ZVxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtTdHJpbmd9IHBhdGggVmFsdWUgcGF0aFxyXG4gICAqIEByZXR1cm5zIHsqfSBWYWx1ZVxyXG4gICAqL1xyXG4gIGdldChwYXRoKSB7XHJcbiAgICBjb25zdCBvbmVWYWx1ZSA9IHRoaXMudmFsdWVzLmdldChwYXRoKTtcclxuICAgIGlmIChvbmVWYWx1ZSkge1xyXG4gICAgICByZXR1cm4gb25lVmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXHJcbiAgICBjb25zdCB2YWx1ZXMgPSBuZXcgTWFwKCk7XHJcbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiB0aGlzLnZhbHVlcykge1xyXG4gICAgICBpZiAoa2V5LmluY2x1ZGVzKHBhdGgpKSB7XHJcbiAgICAgICAgdmFsdWVzLnNldChrZXksIHZhbHVlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmICh2YWx1ZXMuc2l6ZSA+IDApIHtcclxuICAgICAgcmV0dXJuIHZhbHVlcztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGVsZXRlIHZhbHVlXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge1N0cmluZ30gcGF0aCBWYWx1ZSBwYXRoXHJcbiAgICovXHJcbiAgZGVsZXRlKHBhdGgpIHtcclxuICAgIHRoaXMudmFsdWVzLmRlbGV0ZShwYXRoKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG5ldyBWYWx1ZVN0b3JlKCk7XHJcbiJdLCJtYXBwaW5ncyI6InlMQUFBLElBQUFBLGVBQUEsR0FBQUMsc0JBQUEsQ0FBQUMsT0FBQTs7QUFFQSxJQUFBQyxNQUFBLEdBQUFELE9BQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTUUsVUFBVSxDQUFDO0VBQ2Y7RUFDQUMsTUFBTSxHQUFHLElBQUlDLEdBQUcsQ0FBQyxDQUFDOztFQUVsQjtBQUNGO0FBQ0E7RUFDRUMsV0FBV0EsQ0FBQSxFQUFHO0lBQ1o7QUFDSjtBQUNBO0lBQ0ksSUFBSSxDQUFDRixNQUFNLENBQUNHLEdBQUcsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDLENBQUM7RUFDdEM7O0VBRUE7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0VBQ0VBLEdBQUdBLENBQUNDLElBQUksRUFBRUMsS0FBSyxFQUFFO0lBQ2YsSUFBSSxDQUFDTCxNQUFNLENBQUNHLEdBQUcsQ0FBQ0MsSUFBSSxFQUFFQyxLQUFLLENBQUM7RUFDOUI7O0VBRUE7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0VBQ0VDLEtBQUtBLENBQUNGLElBQUksRUFBRUMsS0FBSyxFQUFFO0lBQ2pCLE1BQU1FLE1BQU0sR0FBRyxJQUFJLENBQUNQLE1BQU0sQ0FBQ1EsR0FBRyxDQUFDSixJQUFJLENBQUM7O0lBRXBDLElBQUlHLE1BQU0sSUFBSSxJQUFBRSxlQUFRLEVBQUNGLE1BQU0sQ0FBQyxJQUFJLElBQUFFLGVBQVEsRUFBQ0osS0FBSyxDQUFDLEVBQUU7TUFDakQsSUFBSSxDQUFDTCxNQUFNLENBQUNHLEdBQUcsQ0FBQ0MsSUFBSSxFQUFFTSxNQUFNLENBQUNDLE1BQU0sQ0FBQ0osTUFBTSxFQUFFRixLQUFLLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBQ0k7TUFDSCxNQUFNLElBQUlPLHVCQUFjLENBQUMsMEdBQTBHLENBQUM7SUFDdEk7RUFDRjs7RUFFQTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7RUFDRUosR0FBR0EsQ0FBQ0osSUFBSSxFQUFFO0lBQ1IsTUFBTVMsUUFBUSxHQUFHLElBQUksQ0FBQ2IsTUFBTSxDQUFDUSxHQUFHLENBQUNKLElBQUksQ0FBQztJQUN0QyxJQUFJUyxRQUFRLEVBQUU7TUFDWixPQUFPQSxRQUFRO0lBQ2pCOztJQUVBO0lBQ0EsTUFBTWIsTUFBTSxHQUFHLElBQUlDLEdBQUcsQ0FBQyxDQUFDO0lBQ3hCLEtBQUssTUFBTSxDQUFDYSxHQUFHLEVBQUVULEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQ0wsTUFBTSxFQUFFO01BQ3RDLElBQUljLEdBQUcsQ0FBQ0MsUUFBUSxDQUFDWCxJQUFJLENBQUMsRUFBRTtRQUN0QkosTUFBTSxDQUFDRyxHQUFHLENBQUNXLEdBQUcsRUFBRVQsS0FBSyxDQUFDO01BQ3hCO0lBQ0Y7O0lBRUEsSUFBSUwsTUFBTSxDQUFDZ0IsSUFBSSxHQUFHLENBQUMsRUFBRTtNQUNuQixPQUFPaEIsTUFBTTtJQUNmOztJQUVBLE9BQU9pQixTQUFTO0VBQ2xCOztFQUVBO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7RUFDRUMsTUFBTUEsQ0FBQ2QsSUFBSSxFQUFFO0lBQ1gsSUFBSSxDQUFDSixNQUFNLENBQUNrQixNQUFNLENBQUNkLElBQUksQ0FBQztFQUMxQjtBQUNGLENBQUMsSUFBQWUsUUFBQSxHQUFBQyxPQUFBLENBQUFDLE9BQUE7O0FBRWMsSUFBSXRCLFVBQVUsQ0FBQyxDQUFDIn0=