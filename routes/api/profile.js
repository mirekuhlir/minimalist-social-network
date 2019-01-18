const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
mongoose.set('useFindAndModify', false);

// load validation
const validateProfileInput = require('../../validation/profile');

const validateHobbyInput = require('../../validation/hobby');

// load profile Model
const Profile = require('../../models/profile');

// GET api/profile/test
// public
router.get('/test', (req, res) => res.json({ msg: 'Profile works!' }));

// GET api/profile
// get profile of current user
// private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    // req.user.id is from passport.js
    Profile.findOne({ user: req.user.id })
      // load name from document user (colection users) into profile document (collection profiles)
      .populate('user', ['_id'])
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user';
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// GET api/profile/all
// get all profiles
// public
router.get('/all', async (req, res) => {
  const errors = {};
  try {
    const profiles = await Profile.find({}, 'name')
      .populate('user', ['_id'])
      .sort({ date: -1 });
    if (!profiles) {
      errors.noprofile = 'There are no profiles';
      return res.status(404).json(errors);
    }
    res.json(profiles);
  } catch (error) {
    res.status(404).json({ profile: 'There are no profiles' });
  }
});

// GET api/profile/:user_id
// get profile by user id
// public
router.get('/:user_id', async (req, res) => {
  const errors = {};
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate('user', ['_id']);
    if (!profile) {
      errors.noprofile = 'There is no profile for this user';
      res.status(404).json(errors);
    }
    res.json(profile);
  } catch (error) {
    errors.noprofile = 'There is no profile for this user';
    res.status(404).json(errors);
  }
});

// POST api/profile
// create or edit user profile
// private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    // isValid return some error
    if (!isValid) {
      // return errors with 400 status, catch errors in response
      return res.status(400).json(errors);
    }

    const profileFields = {};

    profileFields.user = req.user.id;

    if (req.body.name) profileFields.name = req.body.name;
    if (req.body.about) profileFields.about = req.body.about;

    let profile = await Profile.findOne({ user: req.user.id });
    // update profile, profile already exists
    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        // overwrite profileFields
        { $set: profileFields },
        { new: true }
      );
      res.json(profile);
    } else {
      // profile does not exist, create new and save it
      profile = await new Profile(profileFields).save();
      res.json(profile);
    }
  }
);

// GET api/profile/most-rated
// get the most rated profile
// public
router.get('/most-rated/:number', (req, res) => {
  const errors = {};

  Profile.find({}, 'name date')
    .populate('user', ['_id'])
    //descenting
    .sort({ numberOfLikes: -1, date: -1 })
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = 'There are no profiles';
        return res.status(404).json(errors);
      } else {
        res.json(profiles.slice(0, req.params.number));
      }
    })
    .catch(() => res.status(404).json({ profile: 'There are no profiles' }));
});

// POST api/profile/like/:id
// like profile
// private
router.post(
  // id is profile id
  '/like/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findById(req.params.id)
      .populate('user', ['_id'])
      .then(profile => {
        if (
          // check if user alredy like post
          // likes is array
          profile.likes.filter(like => like.user.toString() === req.user.id)
            .length > 0
        ) {
          return res
            .status(400)
            .json({ alreadyliked: 'User already liked this profile' });
        }

        // add user id to array of likes

        profile.likes.unshift({ user: req.user.id });
        profile.numberOfLikes = profile.likes.length;

        profile.save().then(profile => res.json(profile));
      })
      .catch(err =>
        res.status(404).json({ profilenotfound: 'No profile found' })
      );
  }
);

// POST api/profile/unlike/:id
// unlike profile
// private
router.post(
  '/unlike/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findById(req.params.id)
      .populate('user', ['_id'])
      .then(profile => {
        if (
          // if user have not liked the post
          // like.user is a MongoDB object, we have convert it into string
          profile.likes.filter(like => like.user.toString() === req.user.id)
            .length === 0
        ) {
          return res
            .status(400)
            .json({ notliked: 'You have not yet liked this profile' });
        }

        // get remove index
        const removeIndex = profile.likes

          // get array of users
          .map(item => item.user.toString())

          // return our like based on login user id
          .indexOf(req.user.id);

        // remove item from array
        profile.likes.splice(removeIndex, 1);
        profile.numberOfLikes = profile.likes.length;
        profile.save().then(profile => res.json(profile));
      })
      .catch(() =>
        res.status(404).json({ profilenotfound: 'No profile found' })
      );
  }
);

// hobbies

// POST api/profile/hobby
// add hobby to profile
// private
router.post(
  '/hobby',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateHobbyInput(req.body);

    // check validation
    if (!isValid) {
      // return any errors with 400 status
      return res.status(400).json(errors);
    }

    Profile.findOne({
      user: req.user.id
    }).then(profile => {
      const newHobby = {
        hobby: req.body.hobby
      };
      // profile already exists, update profile
      if (profile) {
        if (profile.hobbies.length < 3) {
          // add to hobby array
          profile.hobbies.unshift(newHobby);
          profile.save().then(profile => res.json(profile));
        } else {
          let errors = {};
          errors.hobby = 'The number of hobbies is exceeded';
          return res.status(400).json(errors);
        }

        // profile does not exist
      } else {
        const profileFields = {};
        profileFields.user = req.user.id;
        profileFields.name = 'Profile';
        //create profile
        new Profile(profileFields).save().then(profile => {
          // add to hobby array
          profile.hobbies.unshift(newHobby);

          profile.save().then(profile => res.json(profile));
        });
      }
    });
  }
);

// DELETE api/profile/hobby/:hobby_id
// delete hobby from hobbies
// private
router.delete(
  '/hobby/:hobby_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // get remove index
        const removeIndex = profile.hobbies
          // go throught all experiences
          .map(hobby => hobby.id)
          // find index by databse id
          .indexOf(req.params.hobby_id);

        profile.hobbies.splice(removeIndex, 1);
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
