const Validator = require('validator');
const isEmpty = require('./isEmpty');
const localizationBackend = require('../localization/localizationBackend');

module.exports = function validateHobbyInput(data) {
  let errors = {};

  data.hobby = !isEmpty(data.hobby) ? data.hobby : '';

  if (!Validator.isLength(data.hobby, { min: 1, max: 15 })) {
    errors.hobby = localizationBackend.HOBBY_LENGTH;
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
