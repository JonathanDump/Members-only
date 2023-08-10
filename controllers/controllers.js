const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const User = require("../models/user");
var bcrypt = require("bcryptjs");

exports.signUpPost = [
  body("name", "Name must not be empty").trim().isLength({ min: 1 }).escape(),
  body("lastName", "Last name must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("email", "Email name must not be empty")
    .isEmail()
    .withMessage("Invalid email. Email must look like this qwe@asd.zxc")
    .escape(),
  body("password")
    .isLength({ min: 8 })
    .withMessage("The password must be at least 8 characters long")
    .custom((value) => {
      if (/\d/.test(value)) {
        return true;
      }
      throw new Error("The password must contain at least one number");
    })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    console.log("errors", errors.errors);

    const user = new User({
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    });

    if (!errors.isEmpty()) {
      res.render("sign-up-form", {
        user,
        errors: errors.errors,
      });
    } else {
      bcrypt.hash("password", 10, async (err, hashedPassword) => {
        if (err) {
          return next(err);
        }
        user.password = hashedPassword;
        console.log("hashedPassword", hashedPassword);
        await user.save();
        res.redirect("/registered");
      });
    }
  }),
];
