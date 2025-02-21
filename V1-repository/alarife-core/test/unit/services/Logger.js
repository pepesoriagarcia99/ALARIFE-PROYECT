import { describe, it } from 'mocha';
import { expect } from 'chai';

import Logger from '../../../source/services/logger/Logger.js';

describe('Service Logger', () => {

  it('Function validation', () => {
    const logger = new Logger('Logger');

    expect(logger).to.be.an.instanceof(Logger);

    expect(logger.info).to.be.a('function');
    expect(logger.debug).to.be.a('function');
    expect(logger.error).to.be.a('function');
    expect(logger.warn).to.be.a('function');
  });

});
