/* eslint-disable require-jsdoc */
import { Service } from '@alarife/core/decorators';

@Service
class UserService {

  getAllUsers() {
    this.log.info('getAllUsers - service');
    return [
      {
        id   : 1,
        name : 'John'
      }
    ];
  }
}

export default UserService;
