import { isDefined } from '@alarife/core/utils';
import { Logger } from '@alarife/core/modules';

import configuration from '../modules/Configuration';
import BodyValidator from '../modules/BodyValidator';
import Middleware from '../models/Middleware';

import controllerStore from '../modules/ControllerStore.js';

/**
 ** Middleware for body validation
 *
 * @param {String} name Method name
 * @param {Object} schema Validator scheme
 * @param {Object} options Validator options
 */
export const addBodyMiddleware = (name, schema, options) => {
  let Target;
  if (schema.type === 'array') {
    Target = schema.items.Target;
  }
  else if (schema.type === 'object') {
    Target = schema.Target;
  }

  const bodyMiddleware = (req, res, next) => {
    const log = new Logger('BODY');
    const { body } = req;

    if (isDefined(body)) {
      const bodyValidator = new BodyValidator(schema, Target, options, body);

      if (bodyValidator.isValid) {
        req.body = bodyValidator.body;
        return next();
      }
      else {
        if (configuration.hasDebugLevel) {
          log.debug(bodyValidator.errorsText);
        }

        /**
         * TODO: improve error presentation
         */
        return res.badRequest().json({
          errors : bodyValidator.errors
        })
          .end();
      }
    }
    else {
      log.debug('There is no body in the request. The body-parser middleware is recommended.');
      return res.badRequest().end();
    }
  };

  const middleware = new Middleware({ type : 'body', method : name, func : bodyMiddleware });
  controllerStore.current.addMiddleware(middleware);
};
