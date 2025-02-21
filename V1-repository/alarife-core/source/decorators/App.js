/**
 ** The launcher import has to come first, so that the first thing to do is launch the Launcher.
 */
import launcher from '../modules/launcher.js';

import DeveloperError from '../services/logger/DeveloperError.js';
import Logger from '../services/logger/Logger.js';

// import configuration from '../modules/configuration.js';
// import valueStore from '../modules/valueStore.js';

import { defineProperty, isDefined } from '../utils.js';

/**
 * TODO: Analizar
 * TODO: Crear un decorador para SecureClientBuilder
 * TODO: Comunicacion directa entre microservicios (p2p) -- wrtc y socket.io
 */

/**
 * TODO: mostrar PID
 */

/**
  ** App decorator
  * @returns {function} The decorator function
*/
export const App = () =>
  (Target, { kind, metadata }) => {
    if (kind !== 'class') {
      throw new DeveloperError('The App decorator can only be applied to classes.');
    }

    /** Target Metadata */
    if (isDefined(metadata.decorated)) {
      metadata.decorated.push('App');
    }
    else {
      metadata.decorated = ['App'];
    }

    /** Modules used in the instance */
    const logService = new Logger(Target.name);
    defineProperty(Target.prototype, 'log', logService.methods);

    /** Defines injectable values */
    /**
     * ! el configure del launcher lanzara el guardado de esto
     */
    // valueStore.set('Core.version', configuration.version);
    // valueStore.set('Core.name', configuration.name);
    // valueStore.set('Core.traceLog', configuration.traceLog);
    // valueStore.merge('configuration', configuration.publicConfiguration());

    /** App launcher */
    launcher.run(Target);
  };
