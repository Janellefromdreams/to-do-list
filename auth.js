const router = require("express").Router();
const User = require("../models/User");

router
  .get("/login", (req, res) => {
    res.render("login");
  })
  .post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
      req.session.userId = user._id;
      res.redirect("/"); // Redirect to user's to-do list page
    } else {
      res.send("Invalid username or password");
    }
  })
  .get("/register", (req, res) => {
    res.render("register");
  })
  .post("/register", async (req, res) => {
    const { username, password } = req.body;
    const user = new User({ username, password });
    try {
      await user.save();
      req.session.userId = user._id;
      res.redirect("/");
    } catch (err) {
      console.log(err)
      res.send("Error creating user");
    }
  });

module.exports = router;
