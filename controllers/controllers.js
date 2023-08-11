const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const User = require("../models/user");
var bcrypt = require("bcrypt");

exports.signUpPost = [
  body("name", "Name must not be empty").trim().isLength({ min: 1 }).escape(),
  body("lastName", "Last name must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("email", "Email name must not be empty")
    .isEmail()
    .withMessage("Invalid email. Email must look like this qwe@asd.zxc")
    .custom(async (value) => {
      if (await User.findOne({ email: value })) {
        throw new Error("This email is already registered");
      }
      return true;
    })
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
      bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        if (err) {
          return next(err);
        }
        user.password = hashedPassword;
        console.log("hashedPassword", hashedPassword);
        console.log("hashedPasswordLen", hashedPassword.length);
        await user.save();
        res.redirect("/registered");
      });
    }
  }),
];

exports.becomeAMemberPost = asyncHandler(async (req, res, next) => {
  console.log("code", req.body.code);
  console.log("currentUser", req.user);
  if (req.body.code === "00001111") {
    req.user.isMember = true;
    console.log("currentUser", req.user);
    const user = await User.findByIdAndUpdate(req.user._id, req.user);
    await user.save();
    res.redirect("/");
  } else {
    res.render("become-a-member", { message: "Invalid code" });
  }
});
