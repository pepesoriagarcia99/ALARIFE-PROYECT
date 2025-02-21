import { Router } from 'express';

import { DeveloperError, Logger } from '@alarife/core/modules';
import { defineProperty, isFunction } from '@alarife/core/utils';

import controllerStore from '../modules/ControllerStore.js';

import Middleware from '../models/Middleware.js';
import Route from '../models/Route.js';

/**
 * TODO: Añadir al controller opciones de configuraicon del router
 ** caseSensitive?: boolean | undefined;
 ** mergeParams?: boolean | undefined;
 ** strict?: boolean | undefined;
 */

const log = new Logger('Controller');

/**
 ** Mount the apiRoutes with the imported drivers
 *
 * @param {Array<Controller>} importedDrivers list of imported drivers
 * @returns {Router} apiRouter
 */
export const buildApiRouter = importedDrivers => {
  const apiRouter = new Router();

  controllerStore.controllers.forEach(controller => {
    const c = importedDrivers.find(e => e === controller.Target);
    if (c || controller.excludeImport === true) {
      const { path, Target, routes } = controller;
      const instance = new Target();

      controller.instance = instance;

      const router = new Router();
      router.path = path;
      router.controller = Target.name;

      routes.forEach(route => {
        const mainFunction = (...args) => instance[route.method](...args);
        const stack = controller.getMiddlewares(route.method);

        router[route.type](route.path, ...stack, mainFunction);
      });

      apiRouter.use(path, router);
    }
    else {
      log.debug(`${c.name} controller not imported.`);
    }
  });

  return apiRouter;
};

/**
  ** Controller decorator
  *
  * @param {String} path Path to start the controller
  * @returns {Function} Controller decorator
*/
export const Controller = path => (Target, { kind, metadata }) => {
  if (kind !== 'class') {
    throw new DeveloperError('The Controller decorator can only be applied to classes.');
  }

  if (!path) {
    throw new DeveloperError('The path value is required to start the controller.');
  }

  metadata.path = path;

  /** Modules and values used in the instance */
  const logService = new Logger(Target.name);
  defineProperty(Target.prototype, 'log', logService.methods);

  controllerStore.current.build({
    Target,
    path
  });

  controllerStore.finishController();
};

/**
  ** Configuring routes inside a controller
  *
  * @param {String} path Endpoint path
  * @param {String} type Type of route
  * @param {Object} ctx Context of the decorator
*/
const httpMethod = (path, type, { kind, name }) => {
  if (kind !== 'method') {
    throw new DeveloperError(`The ${type} decorator can only be applied to methods.`);
  }

  if (!path) {
    throw new DeveloperError('The path value is required to start the route.');
  }

  const route = new Route({ type, path, method : name });
  controllerStore.current.addRoute(route);
};

export const Get = path => (target, ctx) => httpMethod(path, 'get', ctx);
export const Post = path => (target, ctx) => httpMethod(path, 'post', ctx);
export const Delete = path => (target, ctx) => httpMethod(path, 'delete', ctx);
export const Put = path => (target, ctx) => httpMethod(path, 'put', ctx);
export const Ws = path => (target, ctx) => httpMethod(path, 'ws', ctx);

/**
 * TODO: Uso en clases, se asignara el middleware a todos los metodos de la clase
 */
/**
  ** Use decorator
  * Configure the execution stack of an endpoint
  * @param {Function} func Middleware function
  * @returns {Function} Use decorator
*/
export const Use = func => (target, { kind, name }) => {
  if (!['method', 'class'].includes(kind)) {
    throw new DeveloperError('The Use decorator can only be applied to methods or class.');
  }

  if (!isFunction(func)) {
    throw new DeveloperError('The Use decorator requires a function as an input parameter.');
  }

  const method = kind === 'class' ? 'all' : name;
  const middleware = new Middleware({ type : 'use', method, func });
  controllerStore.current.addMiddleware(middleware);
};

export default Controller;
