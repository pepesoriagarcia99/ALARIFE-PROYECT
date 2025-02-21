/* eslint-disable require-jsdoc */
import App from '../../source/index.js';
import { AutoWired, Value } from '../../source/decorators.js';

import User from './models/UserModel.js';

import UserService from './services/UserService.js';
import StockService from './services/StockService.js';

/**
 * ! Revisar posible error por el orden de los imports
 * ! por razones de ejecucion lo primero que deberia importarse es App,
 * ! para que este importe el launcher y lo lance, este rescata todos los datos y configura la configuracion
 *
 * ! puese existir el error, que si importas la config antes que el launcher en el orden de imports
 * ! la info todavia no exista
 */

@App()
class Main {

  // @Value('Core.environment') environment;

  // @Value('Core.version') coreVersion;

  // @Value('Core.rootPath') rootPath;

  // @Value('Core.traceLog') traceLog;

  @Value('configuration') configuration;

  @AutoWired(UserService) #userService;

  @AutoWired(StockService) #stockService;

  // /**
  //  * ? Flag
  //  * * Se debe añdir un parametro flag para poder recuperar de la Store
  //  */
  // @AutoWired(StockService, { name : 'Iphone' }) #stockService;

  constructor() {
    this.log.info('Init app');

    // this.configuration.traceLog({ levels : ['info', 'debug', 'error', 'warn'] });

    this.#stockService.getStock();

    this.#userService.blockingMethod(9000000000)
      .then(result => {
        this.log.info(result);
      })
      .catch(err => {
        this.log.error(err);
      });

    this.#userService.add(new User('John Doe'));
  }
}

export default Main;
