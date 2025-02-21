"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.merge = exports.isString = exports.isObject = exports.isNumber = exports.isDefined = exports.isClass = exports.defineProperty = void 0; /**
  * Define a new parameter on an object with our default parameters
  * @param {Object} prototype Target object
  * @param {String} key New key
  * @param {*} value Default value
*/
const defineProperty = (prototype, key, value) => {
  Object.defineProperty(prototype, key, {
    value,
    writable: false,
    enumerable: true,
    configurable: false
  });
};

/**
 * Check if the value is defined
 *
 * @param {*} value Input value
 * @returns {Boolean} true or false
 */exports.defineProperty = defineProperty;
const isDefined = (value) => value !== undefined && value !== null;

/**
 *  Check if the value is a class
 *
 * @param {*} value Input value
 * @returns {Boolean} true or false
 */exports.isDefined = isDefined;
const isClass = (value) => typeof value === 'function' && /^\s*class\s+/.test(value.toString());

/**
 * Check if the value is a object
 *
 * @param {*} value Input value
 * @returns  {Boolean} true or false
 */exports.isClass = isClass;
const isObject = (value) => typeof value === 'object' && value !== null;

/**
 * Check if the value is a string
 *
 * @param {*} value Input value
 * @returns  {Boolean} true or false
 */exports.isObject = isObject;
const isString = (value) => typeof value === 'string' || value instanceof String;

/**
 * Check if the value is a number
 *
 * @param {*} value Input value
 * @returns  {Boolean} true or false
 */exports.isString = isString;
const isNumber = (value) => typeof value === 'number' || value instanceof Number;

/**
 * Combine objects superficially
 *
 * @param {Object} target Target object
 * @param {Object} source Source object
 * @returns {Object} Result object
 */exports.isNumber = isNumber;
const merge = (target, source) => {
  const keys = Object.keys(target);
  const result = {};
  keys.forEach((key) => {
    result[key] = source[key] || target[key];
  });

  return result;
};exports.merge = merge;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJkZWZpbmVQcm9wZXJ0eSIsInByb3RvdHlwZSIsImtleSIsInZhbHVlIiwiT2JqZWN0Iiwid3JpdGFibGUiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwiZXhwb3J0cyIsImlzRGVmaW5lZCIsInVuZGVmaW5lZCIsImlzQ2xhc3MiLCJ0ZXN0IiwidG9TdHJpbmciLCJpc09iamVjdCIsImlzU3RyaW5nIiwiU3RyaW5nIiwiaXNOdW1iZXIiLCJOdW1iZXIiLCJtZXJnZSIsInRhcmdldCIsInNvdXJjZSIsImtleXMiLCJyZXN1bHQiLCJmb3JFYWNoIl0sInNvdXJjZXMiOlsiLi4vLi4vc291cmNlL3V0aWxzL29iamVjdC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICAqIERlZmluZSBhIG5ldyBwYXJhbWV0ZXIgb24gYW4gb2JqZWN0IHdpdGggb3VyIGRlZmF1bHQgcGFyYW1ldGVyc1xyXG4gICogQHBhcmFtIHtPYmplY3R9IHByb3RvdHlwZSBUYXJnZXQgb2JqZWN0XHJcbiAgKiBAcGFyYW0ge1N0cmluZ30ga2V5IE5ldyBrZXlcclxuICAqIEBwYXJhbSB7Kn0gdmFsdWUgRGVmYXVsdCB2YWx1ZVxyXG4qL1xyXG5leHBvcnQgY29uc3QgZGVmaW5lUHJvcGVydHkgPSAocHJvdG90eXBlLCBrZXksIHZhbHVlKSA9PiB7XHJcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3RvdHlwZSwga2V5LCB7XHJcbiAgICB2YWx1ZSxcclxuICAgIHdyaXRhYmxlICAgICA6IGZhbHNlLFxyXG4gICAgZW51bWVyYWJsZSAgIDogdHJ1ZSxcclxuICAgIGNvbmZpZ3VyYWJsZSA6IGZhbHNlXHJcbiAgfSk7XHJcbn07XHJcblxyXG4vKipcclxuICogQ2hlY2sgaWYgdGhlIHZhbHVlIGlzIGRlZmluZWRcclxuICpcclxuICogQHBhcmFtIHsqfSB2YWx1ZSBJbnB1dCB2YWx1ZVxyXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gdHJ1ZSBvciBmYWxzZVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGlzRGVmaW5lZCA9IHZhbHVlID0+IHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGw7XHJcblxyXG4vKipcclxuICogIENoZWNrIGlmIHRoZSB2YWx1ZSBpcyBhIGNsYXNzXHJcbiAqXHJcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgSW5wdXQgdmFsdWVcclxuICogQHJldHVybnMge0Jvb2xlYW59IHRydWUgb3IgZmFsc2VcclxuICovXHJcbmV4cG9ydCBjb25zdCBpc0NsYXNzID0gdmFsdWUgPT4gdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nICYmIC9eXFxzKmNsYXNzXFxzKy8udGVzdCh2YWx1ZS50b1N0cmluZygpKTtcclxuXHJcbi8qKlxyXG4gKiBDaGVjayBpZiB0aGUgdmFsdWUgaXMgYSBvYmplY3RcclxuICpcclxuICogQHBhcmFtIHsqfSB2YWx1ZSBJbnB1dCB2YWx1ZVxyXG4gKiBAcmV0dXJucyAge0Jvb2xlYW59IHRydWUgb3IgZmFsc2VcclxuICovXHJcbmV4cG9ydCBjb25zdCBpc09iamVjdCA9IHZhbHVlID0+IHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgIT09IG51bGw7XHJcblxyXG4vKipcclxuICogQ2hlY2sgaWYgdGhlIHZhbHVlIGlzIGEgc3RyaW5nXHJcbiAqXHJcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgSW5wdXQgdmFsdWVcclxuICogQHJldHVybnMgIHtCb29sZWFufSB0cnVlIG9yIGZhbHNlXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgaXNTdHJpbmcgPSB2YWx1ZSA9PiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyB8fCB2YWx1ZSBpbnN0YW5jZW9mIFN0cmluZyk7XHJcblxyXG4vKipcclxuICogQ2hlY2sgaWYgdGhlIHZhbHVlIGlzIGEgbnVtYmVyXHJcbiAqXHJcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgSW5wdXQgdmFsdWVcclxuICogQHJldHVybnMgIHtCb29sZWFufSB0cnVlIG9yIGZhbHNlXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgaXNOdW1iZXIgPSB2YWx1ZSA9PiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyB8fCB2YWx1ZSBpbnN0YW5jZW9mIE51bWJlcik7XHJcblxyXG4vKipcclxuICogQ29tYmluZSBvYmplY3RzIHN1cGVyZmljaWFsbHlcclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IHRhcmdldCBUYXJnZXQgb2JqZWN0XHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgU291cmNlIG9iamVjdFxyXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXN1bHQgb2JqZWN0XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgbWVyZ2UgPSAodGFyZ2V0LCBzb3VyY2UpID0+IHtcclxuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXModGFyZ2V0KTtcclxuICBjb25zdCByZXN1bHQgPSB7fTtcclxuICBrZXlzLmZvckVhY2goa2V5ID0+IHtcclxuICAgIHJlc3VsdFtrZXldID0gc291cmNlW2tleV0gfHwgdGFyZ2V0W2tleV07XHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiByZXN1bHQ7XHJcbn07XHJcblxyXG4iXSwibWFwcGluZ3MiOiIyTkFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTyxNQUFNQSxjQUFjLEdBQUdBLENBQUNDLFNBQVMsRUFBRUMsR0FBRyxFQUFFQyxLQUFLLEtBQUs7RUFDdkRDLE1BQU0sQ0FBQ0osY0FBYyxDQUFDQyxTQUFTLEVBQUVDLEdBQUcsRUFBRTtJQUNwQ0MsS0FBSztJQUNMRSxRQUFRLEVBQU8sS0FBSztJQUNwQkMsVUFBVSxFQUFLLElBQUk7SUFDbkJDLFlBQVksRUFBRztFQUNqQixDQUFDLENBQUM7QUFDSixDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUxBQyxPQUFBLENBQUFSLGNBQUEsR0FBQUEsY0FBQTtBQU1PLE1BQU1TLFNBQVMsR0FBR0EsQ0FBQU4sS0FBSyxLQUFJQSxLQUFLLEtBQUtPLFNBQVMsSUFBSVAsS0FBSyxLQUFLLElBQUk7O0FBRXZFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUxBSyxPQUFBLENBQUFDLFNBQUEsR0FBQUEsU0FBQTtBQU1PLE1BQU1FLE9BQU8sR0FBR0EsQ0FBQVIsS0FBSyxLQUFJLE9BQU9BLEtBQUssS0FBSyxVQUFVLElBQUksY0FBYyxDQUFDUyxJQUFJLENBQUNULEtBQUssQ0FBQ1UsUUFBUSxDQUFDLENBQUMsQ0FBQzs7QUFFcEc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBTEFMLE9BQUEsQ0FBQUcsT0FBQSxHQUFBQSxPQUFBO0FBTU8sTUFBTUcsUUFBUSxHQUFHQSxDQUFBWCxLQUFLLEtBQUksT0FBT0EsS0FBSyxLQUFLLFFBQVEsSUFBSUEsS0FBSyxLQUFLLElBQUk7O0FBRTVFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUxBSyxPQUFBLENBQUFNLFFBQUEsR0FBQUEsUUFBQTtBQU1PLE1BQU1DLFFBQVEsR0FBR0EsQ0FBQVosS0FBSyxLQUFLLE9BQU9BLEtBQUssS0FBSyxRQUFRLElBQUlBLEtBQUssWUFBWWEsTUFBTzs7QUFFdkY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBTEFSLE9BQUEsQ0FBQU8sUUFBQSxHQUFBQSxRQUFBO0FBTU8sTUFBTUUsUUFBUSxHQUFHQSxDQUFBZCxLQUFLLEtBQUssT0FBT0EsS0FBSyxLQUFLLFFBQVEsSUFBSUEsS0FBSyxZQUFZZSxNQUFPOztBQUV2RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQU5BVixPQUFBLENBQUFTLFFBQUEsR0FBQUEsUUFBQTtBQU9PLE1BQU1FLEtBQUssR0FBR0EsQ0FBQ0MsTUFBTSxFQUFFQyxNQUFNLEtBQUs7RUFDdkMsTUFBTUMsSUFBSSxHQUFHbEIsTUFBTSxDQUFDa0IsSUFBSSxDQUFDRixNQUFNLENBQUM7RUFDaEMsTUFBTUcsTUFBTSxHQUFHLENBQUMsQ0FBQztFQUNqQkQsSUFBSSxDQUFDRSxPQUFPLENBQUMsQ0FBQXRCLEdBQUcsS0FBSTtJQUNsQnFCLE1BQU0sQ0FBQ3JCLEdBQUcsQ0FBQyxHQUFHbUIsTUFBTSxDQUFDbkIsR0FBRyxDQUFDLElBQUlrQixNQUFNLENBQUNsQixHQUFHLENBQUM7RUFDMUMsQ0FBQyxDQUFDOztFQUVGLE9BQU9xQixNQUFNO0FBQ2YsQ0FBQyxDQUFDZixPQUFBLENBQUFXLEtBQUEsR0FBQUEsS0FBQSJ9