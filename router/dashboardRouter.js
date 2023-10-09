const express = require("express");
const router = express.Router();
const passportConfig = require("../passportConfig"); // Replace with the correct path

// Middleware to check if a user is authenticated
const isAuthenticated = passportConfig.isAuthenticated;

// Route to the dashboard page, only accessible to authenticated users
router.get("/", isAuthenticated, (req, res) => {
  // Render the dashboard page here
  res.render("dashboard.ejs");
});

module.exports = router;
