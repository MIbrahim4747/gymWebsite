const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const flash = require("express-flash");
const session = require("express-session");
const passport = require("passport");

require("dotenv").config();
//CONNECTION WITH DATABASE==========================================\
mongoose.connect("mongodb://localhost/gym_website", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("open", () => {
  console.log("Connected to Mongoose");
});
mongoose.connection.on("error", () => {
  console.log("Error while Connecting to Mongoose");
});

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log("Mongoose connection closed through app termination");
    process.exit(0);
  });
});
// ALL middleWares configuration====================================
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "MIGYMWEBSITE",
    saveUninitialized: false,
    resave: false,
  })
);

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
// Router Configuration=============================================
const mainRouter = require("./router/mainRouter");
const dashRouter = require("./router/dashboardRouter");
const loginRouter = require("./router/loginRouter");
const registerRouter = require("./router/registerRouter");

app.use("/", mainRouter);
app.use("/dashboard", dashRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);

app.listen(3000, () => {
  console.log("Server is Started");
});
