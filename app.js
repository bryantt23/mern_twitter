const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./config/keys').mongoUri;
const passport = require('passport');

const users = require('./routes/api/users');
const tweets = require('./routes/api/tweets');

mongoose
  .connect(db, {
    useNewUrlParser: true
  })
  .then(() => console.log('Connected to mongoDB'))
  .catch(err => console.log(err));

app.use(passport.initialize());
require('./config/passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/users', users);
app.use('/api/tweets', tweets);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('Listening on port ' + port);
});
