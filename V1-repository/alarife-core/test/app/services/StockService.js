
/* eslint-disable require-jsdoc */
import { AutoWired, Service } from '../../../source/decorators.js';
import ProductService from './ProductService.js';

@Service()
class StockService {

  #productName;

  @AutoWired(ProductService) #productService;

  constructor(name = 'default') {
    this.#productName = name;
  }

  getStock() {
    this.log.info('Get stock of product');

    return this.#productService.getStock(this.#productName);
  }

}

export default StockService;
