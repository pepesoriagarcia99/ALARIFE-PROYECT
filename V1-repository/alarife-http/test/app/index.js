/* eslint-disable require-jsdoc */

import express from 'express';

import { App, Value } from '@alarife/core/decorators';

import { HttpServer } from '../../source/decorators.js';

import TestController from './api/controllers/TestController.js';
import UserController from './api/controllers/UserController.js';
/** import ProductController from './api/controllers/ProductController'; */
import UserAddressController from './api/controllers/UserAddressController.js';

@App()
@HttpServer({ port : 9000, controllers : [UserController, TestController, UserAddressController] })
class Main {
@Value('HttpServer.ip') ip;

@Value('HttpServer.port') port;

@Value('HttpServer.apiRoot') apiRoot;

@Value('HttpServer.app') app;

@Value('HttpServer.webSocket') webSocket;

@Value('HttpServer.hasSsl') hasSsl;

@Value('HttpServer.options') options;

@Value('configuration') configuration;

constructor() {
  this.configuration.traceLog({ levels : ['info', 'debug', 'error', 'warn'] });
  this.configuration.accessLog({ active : true });

  this.app.use(express.json());
  this.app.use(express.urlencoded({ extended : false }));

  this.log.info('ip: ', this.ip);
  this.log.info(`port: ${this.port}`);
}
}

export default Main;
