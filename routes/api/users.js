const express = require('express');

const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const localizationBackend = require('../../localization/localizationBackend');

// load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// load User model
// ../../ out of api and routes
const User = require('../../models/user');

// GET api/users/test
// public, 200 OK
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));

// POST api/users/register
// public
router.post('/register', (req, res) => {
  // input data from form
  const { errors, isValid } = validateRegisterInput(req.body);

  // check Validation if there is an error
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // check if user with this email already exist, searching in collection users
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = localizationBackend.EMAIL_EXIST;
      return res.status(400).json(errors);
    }
    // creating document - instance of model user
    const newUser = new User({
      email: req.body.email,
      // image to do
      password: req.body.password
    });

    // password hashing
    // 10 - hash level complexity, 10 is enought today
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        // salt is part of output string
        newUser.password = hash;
        // saving new user
        newUser
          .save()
          // post reponse with new user
          .then(user => res.json(user))
          .catch(err => console.log(err));
      });
    });
  });
});

// POST api/users/login Login user and returning JWT Token
// public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // find user by email
  User.findOne({ email }).then(user => {
    // if user exist
    if (!user) {
      errors.email = localizationBackend.USER_NOT_FOUND;
      return res.status(404).json(errors);
    }

    // check password
    // compare plane text password and hashed password from the database
    bcrypt.compare(password, user.password).then(isMatch => {
      // user Matched
      if (isMatch) {
        // create JWT payload
        const payload = { id: user.id, name: user.name };

        jwt.sign(
          payload,
          keys.secretOrKey,
          // key expire in one hour - 3600 s
          // current date plus one hour
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              // bearer schema for token, send back to client
              token: `Bearer ${token}`
            });
          }
        );
      } else {
        errors.password = localizationBackend.PASSWORD_INCORRECT;
        return res.status(400).json(errors);
      }
    });
  });
});

module.exports = router;
