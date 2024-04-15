const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");

const app = express();

mongoose.connect("mongodb://localhost/todo_express", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(session({
  secret: "secret",
  resave: true,
  saveUninitialized: true
}));

app.use(require("./routes/index"))
app.use(require("./routes/todo"))
app.use(require("./routes/auth"))

app.get("/user/todos", async (req, res) => {
  if (!req.session.userId) {
    return res.redirect("/login");
  }

  const allTodo = await Todo.find({ user: req.session.userId });
  res.render("todos", { todo: allTodo });
});

app.listen(3000, () => console.log("Server started listening on port: 3000"));
