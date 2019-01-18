require('dotenv').config();

module.exports = {
  //I am using MongoDB as a service from mlab.com
  // MongoDB URI
  // mongodb://<dbuser>:<dbpassword>@ds123456.mlab.com:23456/minimalistic-social-network
  mongoURI: process.env.MONGO_URI_CONNECT_DEV,
  //secretOrKey is a string for verifying the token's signature
  secretOrKey: process.env.SECRET_KEY_DEV
};
