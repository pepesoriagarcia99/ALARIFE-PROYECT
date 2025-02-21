
/* eslint-disable require-jsdoc */
import { Service } from '../../../source/decorators.js';

@Service()
class ProductService {

  #userService;

  /**
   * ? La propuesta de decoradores todavia no tiene soporte para decorar constructores
   * * Propuesta de decoradores para parametros de constructores
   * * https://github.com/tc39/proposal-class-method-parameter-decorators
   */

  // constructor(@AutoWired(UserService) userService) {
  //   this.#userService = userService;
  // }

  getStock() {}
}

export default ProductService;
