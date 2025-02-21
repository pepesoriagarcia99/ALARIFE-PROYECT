import { beforeEach, describe, it } from 'mocha';
import request from 'supertest';

import { valueStore } from '@alarife/core/modules';

/**
 * TODO: Añadir test de integracion para GET, POST, PUT, DELETE
 * TODO: Sobre todo para los POST y PUT
 */

const baseUrl = '/user';

describe('User', () => {
  let app;

  beforeEach(() => {
    app = valueStore.get('core.app');
  });

  // it('GET - /user', done => {
  //   request(app)
  //     .get(`${baseUrl}`)
  //     .expect(200)
  //     .end(err => {
  //       done(err);
  //     });
  // });
});
