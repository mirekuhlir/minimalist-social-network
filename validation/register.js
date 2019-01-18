const Validator = require('validator');
const isEmpty = require('./isEmpty');
const localizationBackend = require('../localization/localizationBackend');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password_match = !isEmpty(data.password_match)
    ? data.password_match
    : '';

  if (Validator.isEmpty(data.email)) {
    errors.email = localizationBackend.EMAIL_REQUIRED;
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = localizationBackend.EMAIL_INVALID;
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = localizationBackend.PASSWORD_REQUIRED;
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = localizationBackend.PASSWORD_LENGTH;
  }

  if (Validator.isEmpty(data.password_match)) {
    errors.password_match = localizationBackend.PASSWORD_CONFIG_REQUIRED;
  }

  if (!Validator.equals(data.password, data.password_match)) {
    errors.password_match = localizationBackend.PASSWORD_MATCH;
  }

  //return object
  return {
    //if value have same name as key we can write it this way
    errors,
    //check there are not errors - true false
    isValid: isEmpty(errors)
  };
};
