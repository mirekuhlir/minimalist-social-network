const Validator = require('validator');
const isEmpty = require('./isEmpty');
const localizationBackend = require('../localization/localizationBackend');

module.exports = function validateProfileInput(data) {
  let errors = {};

  // validor can only handle string input, so we have to force empty string
  data.name = !isEmpty(data.name) ? data.name : '';
  data.about = !isEmpty(data.about) ? data.about : '';

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = localizationBackend.NAME_LENGTH;
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = localizationBackend.NAME_REQUIRED;
  }

  //can not save empty string, this works
  if (Validator.isEmpty(data.about)) {
    data.about = ' ';
  }

  if (!Validator.isLength(data.about, { min: 0, max: 300 })) {
    errors.about = localizationBackend.ABOUT_LENGTH;
  }

  return { errors, isValid: isEmpty(errors) };
};
