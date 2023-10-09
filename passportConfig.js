const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("./model/user"); // Replace with your user model path

// Define a passport strategy for local authentication
passport.use(
  new LocalStrategy(
    { usernameField: "email", passReqToCallback: true },
    async (req, email, password, done) => {
      try {
        // Find a user with the provided email
        const user = await User.findOne({ email });

        // If user not found, flash an error message and return authentication failure
        if (!user) {
          req.flash("error", "User not found");
          return done(null, false);
        }

        // Compare the provided password with the hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);

        // If passwords don't match, flash an error message and return authentication failure
        if (!passwordMatch) {
          req.flash("error", "Incorrect password");
          return done(null, false);
        }

        // Authentication successful, return the user
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Serialize user data to store in the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user data from the session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

// Export a middleware function to check if a user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next(); // User is authenticated, continue with the next middleware
  }

  // User is not authenticated, redirect to the login page with a flash error message
  req.flash("error", "You must be logged in to access this page.");
  res.redirect("/login");
};

// Export the configured Passport instance and isAuthenticated middleware
module.exports = {
  passport,
  isAuthenticated,
};
