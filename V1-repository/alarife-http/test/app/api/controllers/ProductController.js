/* eslint-disable require-jsdoc */
import { Body, Controller, Post } from '../../../../source/decorators';

import ProductModel from '../models/Product';

@Controller('/product')
class ProductController {

  @Post('/import')
  @Body([ProductModel], { maxItems : 3, minItems : 1, uniqueItems : true })
  importProducts(req, res) {
    const user = req.body;
    user.startTime();

    res.success().json(user);
  }

  @Post('/new')
  @Body(ProductModel, { additionalProperties : false })
  addProduct(req, res) {
    const user = req.body;
    user.startTime();

    res.success().json(user);
  }

}

export default ProductController;
