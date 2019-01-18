const Validator = require('validator');
const isEmpty = require('./isEmpty');
const localizationBackend = require('../localization/localizationBackend');

module.exports = function validateLoginInput(data) {
  let errors = {};

  //Validator.isEmpty can only handle String input, so we have to force empty string
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (!Validator.isEmail(data.email)) {
    errors.email = localizationBackend.EMAIL_INVALID;
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = localizationBackend.EMAIL_REQUIRED;
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = localizationBackend.PASSWORD_REQUIRED;
  }

  return { errors, isValid: isEmpty(errors) };
};
