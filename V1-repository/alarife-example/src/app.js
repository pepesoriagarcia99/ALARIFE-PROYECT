/* eslint-disable require-jsdoc */
import { App, Value } from '@alarife/core/decorators';
import { HttpServer } from '@alarife/http/decorators';

@App()
@HttpServer({ port : 9000, controllers : [] })
class Main {

  /** Core values */

  @Value('Core.environment') environment;

  @Value('Core.version') coreVersion;

  @Value('Core.rootPath') rootPath;

  @Value('Core.traceLog') traceLog;

  @Value('configuration') configuration;

  /** Http values */

  @Value('HttpServer.ip') ip;

  @Value('HttpServer.port') port;

  @Value('HttpServer.apiRoot') apiRoot;

  @Value('HttpServer.app') app;

  @Value('HttpServer.webSocket') webSocket;

  @Value('HttpServer.hasSsl') hasSsl;

  @Value('HttpServer.options') options;

  constructor() {
    this.configuration.traceLog({ levels : ['info', 'debug', 'error', 'warn'] });
    this.configuration.accessLog({ active : true });
  }
}

export default Main;
