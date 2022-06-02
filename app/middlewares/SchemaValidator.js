/* eslint-disable no-underscore-dangle */
const _ = require('lodash');

module.exports = (useJoiError) => (req, res, next) => {
  const _supportedMethods = ['post', 'put'];
  const Schemas = useJoiError;
  const _validationOptions = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  };

  const route = req.baseUrl + req.route.path;
  const method = req.method.toLowerCase();
  if (_.includes(_supportedMethods, method) && _.has(Schemas, route)) {
    const _schema = _.get(Schemas, route);

    if (_schema) {
      let result = {};

      try {
        const { error, value } = _schema.validate(req.body, _validationOptions);

        if (error) {
          result = {
            success: 0,
            message: error.message,
          };

          res.send(result);
        } else {
          req.body = value;
          next();
        }
      } catch (err) {
        result = {
          success: 0,
          message: err,
        };
        res.send(result);
      }
    }
  }
};
