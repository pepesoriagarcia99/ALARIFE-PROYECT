import mongoose from 'mongoose';
import Promise from 'bluebird';

import { MONGO_STATUS } from '../constants';

import { DeveloperError, launcher, Logger, valueStore } from '@alarife/core/modules';
import configuration from '../modules/Configuration';

import { isDefined } from '@alarife/core/utils';

/**
 * TODO: Soporte para conectar a varias BBDD mongo
 */
const eventReferences = {};

/**
 * ! Recuperar el valor server del core configuration
 */

/**
 * Mongo data
 *
 * @typedef {Object} connectionConfiguration
 * @param {String} uri Mongo uri
 * @param {Object} options Mongo options
 */
/**
 ** Mongo decorator
 * @param {connectionConfiguration} server Mongo data
 * @returns {function} The decorator function
 */
export const Mongo =
  server =>
    (Target, { kind, metadata }) => {
      if (kind !== 'class') {
        throw new DeveloperError('The Mongo decorator can only be applied to classes.');
      }

      if (!server.uri) {
        throw new DeveloperError('The uri value is required to start the mongo.');
      }

      if (isDefined(metadata.decorated) && metadata.decorated.includes('App')) {
        throw new DeveloperError('The @App decorator must be on top of the rest of the decorators.');
      }

      if (isDefined(metadata.decorated)) {
        metadata.decorated.push('Mongo');
      }
      else {
        metadata.decorated = ['Mongo'];
      }

      /** Configuration and values */
      configuration.server = server;
      const { uri, options } = configuration.server;

      /** Defines injectable values */
      valueStore.set('mongo.uri', uri);
      valueStore.set('mongo.options', options);

      /** Mongoose config */
      Object.keys(options).forEach(key => {
        mongoose.set(key, options[key]);
      });

      mongoose.Promise = Promise;

      const log = new Logger('Mongo');
      launcher.addCallbackBeforeLaunching(() => {
        mongoose.connect(uri).catch(() => {
        /**
         * TODO: Controlar el fallo
         */
          log.error('wrong connection');
        });
      });

      launcher.addCallbackAfterLaunching((T, instance) => {
        Object.keys(eventReferences).forEach(key => {
          mongoose.connection.on(key, (...args) => instance[eventReferences[key]](...args));
        });
      });
    };

/**
 * MongoEvents decorators
 */
export const MongoEvents = {};

Object.keys(MONGO_STATUS).forEach(state => {
  MongoEvents[state] = (target, { name }) => {
    eventReferences[state] = name;
  };
});
