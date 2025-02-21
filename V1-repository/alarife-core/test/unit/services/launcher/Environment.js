import { beforeEach, describe, it } from 'mocha';
import { expect } from 'chai';

import Environment from '../../../../source/services/launcher/Environment.js';

describe('Service Environment', () => {
  let environment;

  beforeEach(() => {
    environment = new Environment('test', 'envFile');
    console.log(environment.toObject());
  });

  it('Function validation', () => {

  });

});
