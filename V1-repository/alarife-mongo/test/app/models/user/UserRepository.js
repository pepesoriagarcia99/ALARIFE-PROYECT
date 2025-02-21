/* eslint-disable require-jsdoc */
import { /** MongoRepository,*/ Repository } from '../../../../source/decorators/Repository';
import { Override } from '../../../../source/decorators/Method';

import { User } from './User';

@Repository(User)
export class UserRepository /** extends MongoRepository */ {

  // @Pre('save')
  // preSave(next) {
  //   if (!this.isModified('password')) {
  //     return next();
  //   }

  //   this.password = 'test';
  //   return next();
  // }

  @Override
  create(user) {
    this.log.info('Repository - Override - save');

    this.model.create(user);
  }

  // @Post('save')
  // postSave(next) {
  //   if (!this.isModified('password')) {
  //     return next();
  //   }

  //   this.password = 'test';
  //   return next();
  // }

  // async findByUserByRole() {
  //   // eslint-disable-next-line camelcase
  //   const user = await this.model.find({ role_name : 'admin' }).lean();

  //   // lean elimina los valores vacios
  //   return user;
  // }
}
