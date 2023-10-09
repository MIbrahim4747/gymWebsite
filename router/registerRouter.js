const router = require("express").Router();
const User = require("../model/user");
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  res.render("register.ejs", { errorMessages: req.flash("error") });
});

async function isValidUser(name, email, password, User, req) {
  // Validate the name format
  const validName = /^[A-Za-z\s]+$/.test(name);
  if (!validName) {
    req.flash("error", "Numbers are not allowed in the name");
  }

  // Check if the name meets the minimum length requirement
  if (name.length < 3) {
    req.flash("error", "Name must be at least 3 characters long.");
  }

  // Check if the password meets the minimum length requirement
  if (password.length < 6) {
    req.flash("error", "Password must be at least 6 characters long.");
  }

  // Check if a user with the same email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    req.flash("error", "User with this email already exists.");
  }

  // If any validation checks failed, return false
  if (!validName || name.length < 3 || password.length < 6 || existingUser) {
    return false;
  }

  // If all checks pass, return true
  return true;
}

router.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  const isValid = await isValidUser(name, email, password, User, req);

  if (isValid) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        name: name,
        email: email,
        password: hashedPassword,
      });
      const user = await newUser.save();
      console.log("User created:", user);
      res.redirect("/login");
    } catch (error) {
      req.flash("error", "Error while creating user");
      console.log(error);
      // Handle the error and possibly show an error page
      res.status(500).redirect("/register");
    }
  } else {
    res.redirect("/register");
  }
});

module.exports = router;
