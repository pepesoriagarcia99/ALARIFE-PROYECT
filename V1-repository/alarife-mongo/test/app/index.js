/* eslint-disable require-jsdoc */
import { App, AutoWired } from '@alarife/core/decorators';
import { Mongo, MongoEvents } from '../../source/decorators.js';

import UserService from './models/user/UserService.js';
import ImageService from './models/image/ImageService.js';

const configuration = {
  uri     : 'mongodb+srv://admin:easyex@cluster0.caomnsc.mongodb.net/alarife',
  options : {
    debug : true
  }
};

@App()
@Mongo(configuration)
class Main {

  @AutoWired(UserService) userService;

  @AutoWired(ImageService) imageService;

  constructor() {
    this.log.info('Hola mongo');
  }

  @MongoEvents.connecting
  onConnecting() {
    this.log.info('Connecting');
  }

  @MongoEvents.connected
  onConnected() {
    this.log.info('Connected');
  }

  @MongoEvents.disconnected
  onDisconnected() {
    this.log.info('Disconnected');
  }

  @MongoEvents.error
  onError(err) {
    this.log.error('Event error', err);
  }

  @MongoEvents.disconnecting
  onDisconnecting() {
    this.log.info('Disconnecting');
  }

  @MongoEvents.reconnected
  onReconnected() {
    this.log.warn('Reconnected');
  }

  @MongoEvents.timeout
  onTimeout() {
    this.log.info('Timeout');
  }

  @MongoEvents.close
  onClose() {
    this.log.info('Close');
  }
}

export default Main;
