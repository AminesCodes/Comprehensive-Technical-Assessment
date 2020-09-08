const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const { comparePasswords } = require('./helpers');
const usersQueries = require('../queries/users');
const { formatInputStr } = require('../routes/helpers/helpers')

passport.use(new LocalStrategy({usernameField: 'username', passwordField : 'password'}, async (username, password, done) => {
  try {
      const parsedUsername = formatInputStr(username)
    const user = await usersQueries.getUserByUsername(parsedUsername);
    if (!user) { // user not found in the database
      console.log('user not found in the database')
      return done(null, false)
    }

    const passwordMatch = await comparePasswords(password, user.password);
    if (!passwordMatch) { // user found but passwords don't match
        console.log('user found but passwords do not match')
        return done(null, false)
    }

    delete user.password; 
    done(null, user);

  } catch (err) {
    done(err)
  }
}))

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser(async (user, done) => {
  try {
    let retrievedUser = await usersQueries.getUserById(user.id)
    delete retrievedUser.password;
    done(null, retrievedUser)
  } catch (err) {
    done(err, false)
  }
})

module.exports = passport;