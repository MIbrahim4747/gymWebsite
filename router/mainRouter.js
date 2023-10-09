const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("main.ejs", { partial: "hero" });
});

// Route for the About page
router.get("/about", (req, res) => {
  res.render("main.ejs", { partial: "about" });
});
router.get("/services", (req, res) => {
  res.render("main.ejs", { partial: "services" });
});
router.get("/testimonials", (req, res) => {
  res.render("main.ejs", { partial: "testimonials" });
});
router.get("/contact", (req, res) => {
  res.render("main.ejs", { partial: "contact" });
});
router.get("/blog", (req, res) => {
  res.render("main.ejs", { partial: "blog" });
});

module.exports = router;
