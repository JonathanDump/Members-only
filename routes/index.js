var express = require("express");
var router = express.Router();
const controllers = require("../controllers/controllers");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/sign-up", (req, res, next) =>
  res.render("sign-up-form", { user: null, errors: null })
);
router.post("/sign-up", controllers.signUpPost);

router.get("/registered", (req, res, next) => res.render("registered"));

module.exports = router;
