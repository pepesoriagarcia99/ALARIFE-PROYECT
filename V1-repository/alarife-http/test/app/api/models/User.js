/* eslint-disable require-jsdoc */
import { Any, ArrayId, Dto, Enum, Number, String } from '../../../../source/decorators/Dto';

import ProductModel from './Product';

@Dto({
  error : {
    type                 : 'should be an object',
    required             : 'should have property foo',
    additionalProperties : 'should not have properties other than foo',
    generic              : 'Validation error'
  }
})
class UserModel {

  @String()
    name;

  @String()
    email;

  @Enum(['admin', 'user'])
    role;

  @Number({
    required : [true, 'La edad es un parametro requerido.'],
    minimum  : 18
  })
    age;

  @ArrayId(ProductModel, { maxItems : 3, uniqueItems : false })
    shoppingCart;

  @Any({ type : ['number', 'string'] })
    value;
}

export default UserModel;
