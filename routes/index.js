var express = require("express");
var router = express.Router();
const controllers = require("../controllers/controllers");
const passport = require("passport");

/* GET home page. */
router.get("/", controllers.indexPostList);
router.post("/", controllers.indexPostDelete);

router.get("/sign-up", (req, res, next) =>
  res.render("sign-up-form", { user: null, errors: null })
);
router.post("/sign-up", controllers.signUpPost);

router.get("/registered", (req, res, next) => res.redirect("log-in"));

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

router.get("/become-a-member", (req, res, next) =>
  res.render("become-a-member")
);
router.post("/become-a-member", controllers.becomeAMemberPost);

router.get("/log-out", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.get("/create-post", (req, res, next) => res.render("create-post-form"));
router.post("/create-post", controllers.createPostPost);

module.exports = router;
