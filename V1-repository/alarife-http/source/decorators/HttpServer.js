import express from 'express';
import expressWs from 'express-ws';
import https from 'https';

import { PRODUCTION } from '@alarife/core/constants';
import { coreConfiguration, DeveloperError, launcher, Logger, valueStore } from '@alarife/core/modules';
import { isDefined } from '@alarife/core/utils';

import httpConfiguration from '../modules/Configuration';
import RequestLogger from '../modules/RequestLogger.js';

import response from '../middleware/response.js';
import { buildApiRouter } from './Controller';

/**
 * TODO: Analizar
 * TODO: Decorador para cachear las peticiones
 * TODO: Para app, controladores o peticiones
 * TODO: Configurado en memoria en un BBDD redis...
 */

/**
 * TODO: Revisar https para entornos productivos
 * TODO: Revisar wss para entornos productivos
 */

/**
 * TODO: Insertar ruta cert y key por argv param
 * "start": "nodemon --exec babel-node src/app.js key=/dir/dir/cert.key cert=/dir/dir/cert.pem"
 */

/**
 * Start server
 * @param {Object} server The server configuration
 * @param {Function} callback The callback success function
 */
function startServer({ app, port, ip }, callback) {
  const { hasSsl, options } = httpConfiguration.ssl;
  if (hasSsl) {
    https.createServer(options, app).listen(port, ip, callback);
  }
  else {
    app.listen(port, ip, callback);
  }
}

/**
 * ! Recuperar los valores server y ssl del core configuration
 */

/**
  ** HttpServer decorator
  * @param {Server} server The server configuration
  * @param {Boolean | SslConfiguration} ssl Indicates if the server will be started with ssl
  * @returns {function} The decorator function
*/
export const HttpServer = (
  server = {},
  ssl = false
) =>
  (Target, { kind, metadata }) => {
    if (kind !== 'class') {
      throw new DeveloperError('The App decorator can only be applied to classes.');
    }

    if (!isDefined(server.controllers) || (Array.isArray(server.controllers) && server.controllers.length === 0)) {
      throw new DeveloperError('The drivers are required to start the app.');
    }

    if (isDefined(metadata.decorated) && metadata.decorated.includes('App')) {
      throw new DeveloperError('The @App decorator must be on top of the rest of the decorators.');
    }

    if (isDefined(metadata.decorated)) {
      metadata.decorated.push('HttpServer');
    }
    else {
      metadata.decorated = ['HttpServer'];
    }

    /** Configuration */
    httpConfiguration.ssl = ssl;
    httpConfiguration.server = server;

    const { protocol, accessLog } = httpConfiguration;
    const { ip, port, apiRoot, controllers } = httpConfiguration.server;
    const { hasSsl, options } = httpConfiguration.ssl;

    /** Decorate warnings */
    const log = new Logger('HttpServer');
    if (
      coreConfiguration.hasDebugLevel
      && coreConfiguration.environment === PRODUCTION
      && httpConfiguration.ssl.hasSsl === false
    ) {
      log.debug('The ssl parameter is required in production environment.');
    }

    /** Express configuration */
    const expressServer = expressWs(express());
    const requestLogger = new RequestLogger();

    const { app } = expressServer;
    const webSocket = expressServer.getWss();

    app.use(response);
    app.use(requestLogger.middleware);

    const apiRouter = buildApiRouter(controllers);

    app.use(apiRoot, apiRouter);

    /** Defines injectable values */
    valueStore.set('HttpServer.protocol', protocol);
    valueStore.set('HttpServer.ip', ip);
    valueStore.set('HttpServer.port', port);
    valueStore.set('HttpServer.apiRoot', apiRoot);
    valueStore.set('HttpServer.app', app);
    valueStore.set('HttpServer.webSocket', webSocket);
    valueStore.set('HttpServer.ssl.hasSsl', hasSsl);
    valueStore.set('HttpServer.ssl.options', options);
    valueStore.set('HttpServer.accessLog', accessLog);

    valueStore.merge('configuration', httpConfiguration.publicConfiguration());

    /** Launcher configuration and start */
    launcher.addBannerData('host', `${protocol}://${ip}:${port}`);

    launcher.addCallbackBeforeLaunching(() => {
      startServer({ app, port, ip }, () => {

        log.info('Server ready!!');
      });
    });
  };
