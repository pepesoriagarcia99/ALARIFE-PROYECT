/**
 * TODO: Revisar si es correcto el uso del .end()
 *
 * ? res.badRequest().json({ message : 'Error' });
 * ? res.badRequest().end();
 */

const responseOptions = res => ({
  json : entity => res.json(entity).end(),
  xml  : entity => {
    res.header('Content-Type', 'application/xml');
    res.send(entity).end();
  },
  text : entity => {
    res.header('Content-Type', 'text/plain; charset=UTF-8');
    res.send(entity).end();
  },
  end : () => res.end()
});

/**
  * Middleware that injects response automation
  * @param {Object} req req
  * @param {Object} res res
  * @param {Function} next next
*/
export default (req, res, next) => {
  res.success = (status = 200) => {
    if (status === 204) {
      return res.status(status).end();
    }

    return responseOptions(res.status(status));
  };

  res.badRequest = () => responseOptions(res.status(400));
  res.unauthorized = () => responseOptions(res.status(401));
  res.notFound = () => responseOptions(res.status(404));
  res.serverError = () => responseOptions(res.status(500));

  next();
};
