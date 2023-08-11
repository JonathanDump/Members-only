const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const verifyCallback = async (username, password, done) => {
  try {
    const user = await User.findOne({ email: username });

    if (!user) {
      console.log("Incorrect username");
      return done(null, false, "Incorrect username");
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      console.log("Incorrect password");
      return done(null, false, "Incorrect password");
    }

    return done(null, user);
  } catch (err) {
    return done(err);
  }
};

const strategy = new LocalStrategy({ usernameField: "email" }, verifyCallback);

passport.use(strategy);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
