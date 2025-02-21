/* eslint-disable no-console */
/* eslint-disable require-jsdoc */
import { describe, it } from 'mocha';

import { Getters } from '../../../source/decorators/Lombok.js';

describe('Module Lombok', () => {

  it('Function validation', () => {

    @Getters
    class User {
      #name = 'John';

      #lastName;

      #age;

      // constructor(name) {
      //   this.#name = name;
      // }

      get name() {
        return this.#name;
      }
    }

    const user = new User();
    console.log(user.name);
    console.log(user.lastName);
    console.log(user.age);
  });

});
