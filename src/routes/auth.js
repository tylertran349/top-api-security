const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');

// Handler for login POST requests
router.post('/login', function(req, res, next) {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if(err || !user) {
            return res.status(400).json({
                message: 'Something is not right',
                user : user
            });
        }
        req.login(user, {session: false}, (err) => { // Pass session: false in passport options so that it won't save the user in the session
            if(err) {
                res.send(err);
            }

            // Generate a signed JSON web token with the contents of the user object and return to the client in the response
            const token = jwt.sign(user, 'your_jwt_secret');
            return res.json({user, token});
        });
    })(req, res);
});

// Make sure you export the route once you're done
module.exports = router;