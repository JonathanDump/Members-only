const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const verifyCallback = async (username, password, done) => {
  try {
    console.log("username", username);
    console.log("password", password);

    const user = await User.findOne({ email: username });
    console.log(await user);
    if (!user) {
      console.log("Incorrect username");
      return done(null, false, { message: "Incorrect username" });
    }

    const match = await bcrypt.compare(password, user.password);
    console.log(match);
    if (!match) {
      console.log("Incorrect password");
      return done(null, false, { message: "Incorrect password" });
    }
    console.log("login successful");
    return done(null, user);
  } catch (err) {
    console.log("login unsuccessful");
    console.log("login errors", err);
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
