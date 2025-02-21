/* eslint-disable require-jsdoc */
import { Service, Worker } from '@alarife/core/decorators';

@Service()
class TestService {

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

export default TestService;
