const express = require("express");
const router = express.Router();
const passport = require("passport");
// Render the login form
router.get("/", (req, res) => {
  const flashErrors = req.flash("error");
  res.render("login", { errorMessages: flashErrors }); // Replace with your login form rendering logic
});

// Handle user login
router.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/dashboard", // Redirect to a dashboard page upon successful login
    failureRedirect: "/login", // Redirect back to the login page on failure
    failureFlash: true, // Enable flash messages for displaying error messages
  })
);

module.exports = router;
