const express = require('express');
const app = express();
const models = require('./models/index.js');
const routes = require('./routes/index.js');
const auth = require('./routes/auth.js');
const user = require('./routes/user')
const passport = require('passport');

// Extract the entire body portion of any incoming request stream (regular POST request or a POST request from an HTML form) and make it accessible on req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/auth', auth);
app.use('/user', passport.authenticate('jwt', {session: false}), user);
// Make it so that the first user object is the user associated with all the messages
app.use((req, res, next) => {
    req.context = { models, me: models.users[1] } // Adds a new property called context that contains a models property and me property (me property is set to the first user object)
    next();
});

app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/messages', routes.message);

app.listen(3000, () => {
  console.log(`Example app listening on port 3000`)
})