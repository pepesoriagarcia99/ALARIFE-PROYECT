/* eslint-disable require-jsdoc */
import { AutoWired } from '@alarife/core/decorators';
import { Body, Controller, Get, Post, Put, Use } from '@alarife/http/decorators';

import UserService from '../services/UserService.js';

@Controller('/user')
@Use((req, res, next) => {
  // eslint-disable-next-line no-console
  console.log('UserController - Middleware');

  return next();
})
class UserController {

  @AutoWired(UserService) userService;

  @Post('/import/roles')
  @Body({ elements : { type : 'string', required : ['type'] } })
  importRoles(req, res) {
    const roles = req.body;

    this.log.info('importRoles - Controller: ', roles);

    res.success().json(roles);
  }

  @Get('/names')
  usernameList(req, res) {
    this.log.info('usernameList - Controller');

    const users = this.userService.getAllUsers();

    res.success().json(users);
  }

  @Get('/')
  @Use((req, res, next) => {
    // eslint-disable-next-line no-console
    console.log('userList - Middleware');

    return next();
  })
  userList(req, res) {
    this.log.info('userList - Controller');

    const users = this.userService.getAllUsers();

    res.success().json(users);
  }

  // @Post('/')
  // @Body(UserModel)
  // createUser(req, res) {
  //   const user = req.body;

  //   this.log.info('createUser - Controller: ', user);

  //   return res.success().json(user)
  //     .end();
  // }

  @Put('/')
  @Body({
    type       : 'object',
    properties : {
      name  : { type : 'string' },
      email : { type : 'string' },
      age   : { type : 'number', minimum : 18 }
    },
    required     : ['name', 'age'],
    errorMessage : {
      properties : {
        name : 'Tipo erroneo.'
      },
      required : {
        name : 'El nombre es un parametro requerido.'
      }
    },
    additionalProperties : false
  })
  editUser(req, res) {
    const user = req.body;

    this.log.info('editUser - Controller: ', user);

    res.success().json(user)
      .end();
  }
}

export default UserController;
