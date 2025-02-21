/* eslint-disable require-jsdoc */
import { AutoWired } from '@alarife/core/decorators';
import { Controller, Get } from '../../../../source/decorators';

import UserService from '../services/UserService';

@Controller('/user')
class UserAddressController {

  @AutoWired(UserService) userService;

  @Get('/address')
  userList(req, res) {
    this.log.info('userList - Controller');

    const users = this.userService.getAllUsers();

    res.success().json(users);
  }
}

export default UserAddressController;
