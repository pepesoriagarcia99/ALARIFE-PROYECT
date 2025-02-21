import { describe, it } from 'mocha';
import { expect } from 'chai';

import { instanceStore } from '@alarife/core/modules';
import { HttpServer } from '../../../source/decorators/HttpServer.js';

/**
 * TODO: Añadir test unitarios
 */

describe('HttpServer', () => {

  // eslint-disable-next-line require-jsdoc
  class Main { }

  it('Catch error no drivers', () => {
    const serverConfig = {
      controllers : [
        class ControllerTest {}
      ]
    };

    HttpServer(serverConfig, false)(Main, { kind : 'class' });

    const mainInstance = instanceStore.get(Main.name);

    expect(mainInstance).to.be.an.instanceof(Main);
  });

});
