const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//create Schema
const ProfileSchema = new Schema({
  // associated  profiler with users collection in database by id
  // on passport.authenticate we get req.user.id
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },

  name: {
    type: String,
    required: true
  },

  about: {
    type: String
  },

  numberOfLikes: {
    type: Number
  },

  hobbies: [
    {
      hobby: {
        type: String,
        required: true
      }
    }
  ],

  // each profile can have several likes
  likes: [
    {
      // each like has author - user
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],

  date: {
    type: Date,
    default: Date.now
  }
});

// profiles will be a collection profiles in the database
const Profile = mongoose.model('profile', ProfileSchema);
module.exports = Profile;
