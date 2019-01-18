const keysProd = require('./keys_prod');
const keysDev = require('./keys_dev');

if (process.env.NODE_ENV === 'production') {
  // production
  module.exports = keysProd;
} else {
  // local machine
  module.exports = keysDev;
}


