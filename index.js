const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const TodoTask = require("./models/TodoTask");
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
// app.get("/", (req, res) => {
//   res.render("todo.ejs");
// });
app.get("/", (req, res) => {
  TodoTask.find({}, (err, tasks) => {
    res.render("todo.ejs", { todoTasks: tasks });
  });
});
app.post("/", async (req, res) => {
    const todoTask = new TodoTask({
      description: req.body.description,
      isComplete: req.body.isComplete,
    });
    try {
      await todoTask.save();
      res.redirect("/");
    } catch (err) {
      res.redirect("/");
    }
  });
  app.put("/edit/:id", async (req, res) => {
    const todoTask = new TodoTask({
      isComplete: req.body.isComplete,
    });
    if(todoTask =true){
        res.send("Complete");
    }
    else{
        res.send("Incomplete");
    }
    try {
      await todoTask.save();
      res.redirect("/");
    } catch (err) {
      res.redirect("/");
    }
  });
  app.route("/remove/:id").get((req, res) => {
    const id = req.params.id;
    TodoTask.findByIdAndRemove(id, err => {
    if (err) return res.send(500, err);
    res.redirect("/");
    });
    });

    const mongoose = require("mongoose");

    const url =
      "mongodb+srv://TodoListApp:1234@todoapp.vibin.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    
    const connectionParams = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    mongoose
      .connect(url, connectionParams)
      .then(() => {
        console.log("Connected to database ");
        app.listen(7017, () => console.log("Server Up and running"));
      })
      .catch((err) => {
        console.error(`Error connecting to the database. \n${err}`);
      });
