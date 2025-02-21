/* eslint-disable no-console */
import { readFileSync } from 'node:fs';
import { DEFAULT_BANNER_PATH } from '../../constant';

import { existsFile } from '../../utils.js';
import Logger from '../logger/Logger.js';

/**
 * ! El banner service podria recuperar su propia data para eliminarla del launcher
 */

/**
 * Banner service
 * Banner type "Slant"
 *
 * @class Banner
 */
class Banner {

  /**
   * Banner path
   * @type {String}
   */
  #path;

  // /**
  //  * Logger
  //  * @type {Logger}
  //  */
  // #log;

  /**
    * Construct Banner
  */
  constructor() {
    // this.#log = new Logger('Banner', true);
    this.#path = this.#bannerPath();
  }

  /**
    * Get the banner path
    * @returns {String} banner path
  */
  #bannerPath() {
    const mainBanner = `${process.env.INIT_CWD}/banner.txt`;
    const bannerPath = existsFile(mainBanner) ? mainBanner : DEFAULT_BANNER_PATH;
    return bannerPath;
  }

  /**
    * Paint the existing banner on the path
    * @param {Object} data App data
  */
  print(data) {
    try {
      const banner = readFileSync(this.#path, { encoding : 'utf8' });
      console.log(banner);
      console.log('\n');

      const serverProperties = Object.keys(data);
      serverProperties.forEach(key => {
        const keyName = key.charAt(0).toUpperCase() + key.slice(1);
        console.log(`${keyName}: ${data[key]}`);
      });
      console.log('\n');
    }
    catch (error) {
      // this.#log.error('Error when painting the banner');
    }
  }

}

export default Banner;

