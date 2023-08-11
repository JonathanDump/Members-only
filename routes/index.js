var express = require("express");
var router = express.Router();
const controllers = require("../controllers/controllers");
const passport = require("passport");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/sign-up", (req, res, next) =>
  res.render("sign-up-form", { user: null, errors: null })
);
router.post("/sign-up", controllers.signUpPost);

router.get("/registered", (req, res, next) => res.render("registeredTEMP"));

router.get("/log-in", (req, res, next) =>
  res.render("log-in-form", { errors: null })
);

router.post("/log-in", (req, res, next) => {
  passport.authenticate("local", (err, user, message) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.render("log-in-form", { errors: message });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect("/");
    });
  })(req, res);
});

module.exports = router;
