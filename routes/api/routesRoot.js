const router = require('express').Router();
const testApi = require('./testApi');
const users = require('./users');
const profile = require('./profile');

/* test get request http://localhost:5000/api/testapi/mytest */
router.use('/api', testApi);

// registration, login and current user
router.use('/api/users', users);
// name, about, likes, hobbies
router.use('/api/profile', profile);

module.exports = router;
