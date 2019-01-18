const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const router = require('./routes/api/routesRoot');
const app = express();

// body parser middleware
// urlencoded - UTF8 encode, extended : false - only string or array, true - nested objects
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// database config
const db = require('./config/keys').mongoURI;

// connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));
  
// passport middleware
app.use(passport.initialize());

// passport Config, we are using JWT strategy
require('./config/passport')(passport);

// all routes
app.use('/', router);

// server static assets in production
if (process.env.NODE_ENV === 'production') {
  //set static folder, load static files for browser
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
