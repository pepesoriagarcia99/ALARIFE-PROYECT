import { beforeEach, describe, it } from 'mocha';
import request from 'supertest';

import { valueStore } from '@alarife/core/modules';

describe('Test', () => {
  let app;

  beforeEach(() => {
    app = valueStore.get('HttpServer.app');
  });

  it('GET - /ping', done => {
    request(app)
      .get('/ping')
      .expect(200)
      .end(err => {
        done(err);
      });
  });
});

