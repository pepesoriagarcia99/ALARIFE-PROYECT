/* eslint-disable require-jsdoc */

import { Service, Worker } from '../../../source/decorators.js';

@Service()
class UserService {

  #users = [];

  add(user) {
    this.#users.push(user);
  }

  @Worker()
  blockingMethod(range) {
    const start = new Date();

    let total = 0;
    for (let index = 0; index < range; index++) {
      total += index;
    }

    const end = new Date();

    const t = end - start;
    return { total, delay : t > 1000 ? `${t / 1000} seconds` : `${t} milliseconds` };
  }

}

export default UserService;
