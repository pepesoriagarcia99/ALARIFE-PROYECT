/* eslint-disable require-jsdoc */
import { AutoWired, Service } from '@alarife/core/decorators';

import { UserRepository } from './UserRepository';

@Service
class UserService {

  @AutoWired(UserRepository) userRepository;

  getAllUsers() {
    this.log.info('Service - getAllUsers');
    return this.userRepository
      .find({})
      .then(users => users.map(user => user.viewSimple()));
  }

  // async createUser(user) {
  //   this.log.info('Service - createUser');

  //   // return this.userRepository.create(user)
  //   //   .then(newUser => {
  //   //     this.log.info(newUser);
  //   //     return newUser;
  //   //   })
  //   //   .catch(this.log.error);

  //   const newUser = await this.userRepository.create(user);

  //   this.log.info(newUser);

  //   return newUser;
  // }
}

export default UserService;
