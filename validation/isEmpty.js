const isEmpty = value =>
  value === undefined ||
  value === null ||
  //empty object
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  //remove whitespaces
  (typeof value === 'string' && value.trim().length === 0);

module.exports = isEmpty;
