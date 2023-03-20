const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
function(email, password, cb) {
    return UserModel.findOne({email, password}).then(user => {
        if(!user) {
            return cb(null, false, {message: "Incorrect email or password"});
        }
        return cb(null, user, {message: "Logged in successfully"}).catch(err => cb(err));
    })
}));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'your_jwt_secret'
},
function(jwtPayload, cb) {

    // Find the user in the DB if needed, this function may be omitted if you store everything you'll need in the JWT payload
    return UserModel.findOneById(jwtPayload.id).then(user => {
        return cb(null, user);
    }).catch(err => {
        return cb(err);
    });
}));