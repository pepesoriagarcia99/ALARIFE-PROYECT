import { describe, it } from 'mocha';
import { expect } from 'chai';

import { App } from '../../../source/decorators/App.js';
import launcher from '../../../source/modules/launcher.js';

describe('Decorator App', () => {

  // eslint-disable-next-line require-jsdoc
  class Main { }

  it('Catch error no drivers', () => {
    App()(Main, { kind : 'class', metadata : {} });

    expect(launcher.mainInstance).to.be.an.instanceof(Main);
  });

});
