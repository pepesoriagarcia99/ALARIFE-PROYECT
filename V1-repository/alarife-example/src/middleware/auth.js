
export const protect = roles => (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization && !roles.includes(req.headers.authorization)) {
    return res.unauthorized().text('User is not authorized');
  }

  return next();
};
