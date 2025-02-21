"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _nodeFs = require("node:fs");
var _nodePath = require("node:path");

var _utils = require("../utils.js"); /* eslint-disable no-console */

/**
 * Banner service
 * Banner type "Slant"
 *
 * @class Banner
 * @public
 *
 * @constructor
 * @property {String} path banner path
 */
class Banner {

  #path;

  /**
    * Construct Banner
  */
  constructor() {
    this.#path = this.#bannerCheck();
  }

  /**
    * Check if there is a banner in the root of the project
    * @returns {String} banner path
  */
  #bannerCheck() {
    const mainBanner = `${process.env.INIT_CWD}/banner.txt`;
    const bannerPath = (0, _utils.existsFile)(mainBanner) ? mainBanner : (0, _nodePath.resolve)(__dirname, '../static/banner.txt');
    return bannerPath;
  }

  /**
    * Paint the existing banner on the path
    * @param {Object} data App data
  */
  print(data) {
    try {
      const banner = (0, _nodeFs.readFileSync)(this.#path, { encoding: 'utf8' });
      console.log(banner);
      console.log('\n');

      const serverProperties = Object.keys(data);
      serverProperties.forEach((key) => {
        const keyName = key.charAt(0).toUpperCase() + key.slice(1);
        console.log(`${keyName}: ${data[key]}`);
      });
      console.log('\n');
    }
    catch (error) {
      console.error(error);
    }
  }

}var _default = exports.default =

Banner;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbm9kZUZzIiwicmVxdWlyZSIsIl9ub2RlUGF0aCIsIl91dGlscyIsIkJhbm5lciIsInBhdGgiLCJjb25zdHJ1Y3RvciIsImJhbm5lckNoZWNrIiwiI2Jhbm5lckNoZWNrIiwibWFpbkJhbm5lciIsInByb2Nlc3MiLCJlbnYiLCJJTklUX0NXRCIsImJhbm5lclBhdGgiLCJleGlzdHNGaWxlIiwicmVzb2x2ZSIsIl9fZGlybmFtZSIsInByaW50IiwiZGF0YSIsImJhbm5lciIsInJlYWRGaWxlU3luYyIsImVuY29kaW5nIiwiY29uc29sZSIsImxvZyIsInNlcnZlclByb3BlcnRpZXMiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsImtleSIsImtleU5hbWUiLCJjaGFyQXQiLCJ0b1VwcGVyQ2FzZSIsInNsaWNlIiwiZXJyb3IiLCJfZGVmYXVsdCIsImV4cG9ydHMiLCJkZWZhdWx0Il0sInNvdXJjZXMiOlsiLi4vLi4vc291cmNlL21vZHVsZXMvQmFubmVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUgKi9cclxuaW1wb3J0IHsgcmVhZEZpbGVTeW5jIH0gZnJvbSAnbm9kZTpmcyc7XHJcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdub2RlOnBhdGgnO1xyXG5cclxuaW1wb3J0IHsgZXhpc3RzRmlsZSB9IGZyb20gJy4uL3V0aWxzLmpzJztcclxuXHJcbi8qKlxyXG4gKiBCYW5uZXIgc2VydmljZVxyXG4gKiBCYW5uZXIgdHlwZSBcIlNsYW50XCJcclxuICpcclxuICogQGNsYXNzIEJhbm5lclxyXG4gKiBAcHVibGljXHJcbiAqXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKiBAcHJvcGVydHkge1N0cmluZ30gcGF0aCBiYW5uZXIgcGF0aFxyXG4gKi9cclxuY2xhc3MgQmFubmVyIHtcclxuXHJcbiAgI3BhdGg7XHJcblxyXG4gIC8qKlxyXG4gICAgKiBDb25zdHJ1Y3QgQmFubmVyXHJcbiAgKi9cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuI3BhdGggPSB0aGlzLiNiYW5uZXJDaGVjaygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICAqIENoZWNrIGlmIHRoZXJlIGlzIGEgYmFubmVyIGluIHRoZSByb290IG9mIHRoZSBwcm9qZWN0XHJcbiAgICAqIEByZXR1cm5zIHtTdHJpbmd9IGJhbm5lciBwYXRoXHJcbiAgKi9cclxuICAjYmFubmVyQ2hlY2soKSB7XHJcbiAgICBjb25zdCBtYWluQmFubmVyID0gYCR7cHJvY2Vzcy5lbnYuSU5JVF9DV0R9L2Jhbm5lci50eHRgO1xyXG4gICAgY29uc3QgYmFubmVyUGF0aCA9IGV4aXN0c0ZpbGUobWFpbkJhbm5lcikgPyBtYWluQmFubmVyIDogcmVzb2x2ZShfX2Rpcm5hbWUsICcuLi9zdGF0aWMvYmFubmVyLnR4dCcpO1xyXG4gICAgcmV0dXJuIGJhbm5lclBhdGg7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgICogUGFpbnQgdGhlIGV4aXN0aW5nIGJhbm5lciBvbiB0aGUgcGF0aFxyXG4gICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YSBBcHAgZGF0YVxyXG4gICovXHJcbiAgcHJpbnQoZGF0YSkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgYmFubmVyID0gcmVhZEZpbGVTeW5jKHRoaXMuI3BhdGgsIHsgZW5jb2RpbmcgOiAndXRmOCcgfSk7XHJcbiAgICAgIGNvbnNvbGUubG9nKGJhbm5lcik7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdcXG4nKTtcclxuXHJcbiAgICAgIGNvbnN0IHNlcnZlclByb3BlcnRpZXMgPSBPYmplY3Qua2V5cyhkYXRhKTtcclxuICAgICAgc2VydmVyUHJvcGVydGllcy5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAgICAgY29uc3Qga2V5TmFtZSA9IGtleS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGtleS5zbGljZSgxKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhgJHtrZXlOYW1lfTogJHtkYXRhW2tleV19YCk7XHJcbiAgICAgIH0pO1xyXG4gICAgICBjb25zb2xlLmxvZygnXFxuJyk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQmFubmVyO1xyXG5cclxuIl0sIm1hcHBpbmdzIjoiO0FBQ0EsSUFBQUEsT0FBQSxHQUFBQyxPQUFBO0FBQ0EsSUFBQUMsU0FBQSxHQUFBRCxPQUFBOztBQUVBLElBQUFFLE1BQUEsR0FBQUYsT0FBQSxnQkFBeUMsQ0FKekM7O0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNRyxNQUFNLENBQUM7O0VBRVgsQ0FBQ0MsSUFBSTs7RUFFTDtBQUNGO0FBQ0E7RUFDRUMsV0FBV0EsQ0FBQSxFQUFHO0lBQ1osSUFBSSxDQUFDLENBQUNELElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQ0UsV0FBVyxDQUFDLENBQUM7RUFDbEM7O0VBRUE7QUFDRjtBQUNBO0FBQ0E7RUFDRSxDQUFDQSxXQUFXQyxDQUFBLEVBQUc7SUFDYixNQUFNQyxVQUFVLEdBQUksR0FBRUMsT0FBTyxDQUFDQyxHQUFHLENBQUNDLFFBQVMsYUFBWTtJQUN2RCxNQUFNQyxVQUFVLEdBQUcsSUFBQUMsaUJBQVUsRUFBQ0wsVUFBVSxDQUFDLEdBQUdBLFVBQVUsR0FBRyxJQUFBTSxpQkFBTyxFQUFDQyxTQUFTLEVBQUUsc0JBQXNCLENBQUM7SUFDbkcsT0FBT0gsVUFBVTtFQUNuQjs7RUFFQTtBQUNGO0FBQ0E7QUFDQTtFQUNFSSxLQUFLQSxDQUFDQyxJQUFJLEVBQUU7SUFDVixJQUFJO01BQ0YsTUFBTUMsTUFBTSxHQUFHLElBQUFDLG9CQUFZLEVBQUMsSUFBSSxDQUFDLENBQUNmLElBQUksRUFBRSxFQUFFZ0IsUUFBUSxFQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUM7TUFDOURDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDSixNQUFNLENBQUM7TUFDbkJHLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLElBQUksQ0FBQzs7TUFFakIsTUFBTUMsZ0JBQWdCLEdBQUdDLE1BQU0sQ0FBQ0MsSUFBSSxDQUFDUixJQUFJLENBQUM7TUFDMUNNLGdCQUFnQixDQUFDRyxPQUFPLENBQUMsQ0FBQUMsR0FBRyxLQUFJO1FBQzlCLE1BQU1DLE9BQU8sR0FBR0QsR0FBRyxDQUFDRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUNDLFdBQVcsQ0FBQyxDQUFDLEdBQUdILEdBQUcsQ0FBQ0ksS0FBSyxDQUFDLENBQUMsQ0FBQztRQUMxRFYsT0FBTyxDQUFDQyxHQUFHLENBQUUsR0FBRU0sT0FBUSxLQUFJWCxJQUFJLENBQUNVLEdBQUcsQ0FBRSxFQUFDLENBQUM7TUFDekMsQ0FBQyxDQUFDO01BQ0ZOLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLElBQUksQ0FBQztJQUNuQjtJQUNBLE9BQU9VLEtBQUssRUFBRTtNQUNaWCxPQUFPLENBQUNXLEtBQUssQ0FBQ0EsS0FBSyxDQUFDO0lBQ3RCO0VBQ0Y7O0FBRUYsQ0FBQyxJQUFBQyxRQUFBLEdBQUFDLE9BQUEsQ0FBQUMsT0FBQTs7QUFFY2hDLE1BQU0ifQ==