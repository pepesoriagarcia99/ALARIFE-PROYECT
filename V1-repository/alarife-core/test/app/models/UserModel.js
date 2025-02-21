/* eslint-disable require-jsdoc */
import { Logger } from '../../../source/decorators.js';

@Logger()
class User {
  #name;

  constructor(name) {
    this.log.info('User constructor');
    this.log.debug('name: ', name);

    this.#name = name;
  }
}

export default User;
