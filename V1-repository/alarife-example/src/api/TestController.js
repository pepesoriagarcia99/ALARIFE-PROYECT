/* eslint-disable require-jsdoc */
import { AutoWired } from '@alarife/core/decorators';
import { Controller, Get } from '@alarife/http/decorators';

import TestService from '../services/TestService.js';

@Controller('/')
class TestController {

  @AutoWired(TestService) testService;

  @Get('/ping')
  ping(req, res) {
    res.success().json({ date : new Date() });
  }

  @Get('/stress')
  stress(req, res) {
    return this.testService.blockingMethod(9000000000)
      .then(result => {
        res.success().json(result);
      })
      .catch(err => {
        res.serverError().json(err);
      });
  }

}

export default TestController;
