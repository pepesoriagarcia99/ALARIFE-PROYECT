/* eslint-disable require-jsdoc */
import { Dto, Number, String } from '../../../../source/decorators/Dto';

@Dto()
class ProductModel {

  @String({ required : true })
    name;

  @String()
    description;

  @Number({ type : 'int8', required : true })
    price;
}

export default ProductModel;
