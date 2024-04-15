const router = require("express").Router();
const Todo = require("../models/Task");

router
  .post("/add/todo", async (req, res) => {
    const { todo } = req.body;
    const newTodo = new Todo({ todo, user: req.session.userId });

    try {
      await newTodo.save();
      res.redirect("/");
    } catch (err) {
      console.log(err);
      res.send("Error adding todo");
    }
  })
  .get("/delete/todo/:_id", async (req, res) => {
    const { _id } = req.params;
    try {
      await Todo.deleteOne({ _id });
      res.redirect("/");
    } catch (err) {
      console.log(err);
      res.send("Error deleting todo");
    }
  })
  .get("/edit/todo/:_id", async (req, res) => {
    const { _id } = req.params;
    try {
      const todo = await Todo.findById(_id);
      res.render("edit", { todo });
    } catch (err) {
      console.log(err);
      res.send("Error editing todo");
    }
  })
  .post("/update/todo/:_id", async (req, res) => {
    const { _id } = req.params;
    const { todo } = req.body;
    try {
      await Todo.updateOne({ _id }, { todo });
      res.redirect("/");
    } catch (err) {
      console.log(err);
      res.send("Error updating todo");
    }
  });

module.exports = router;
