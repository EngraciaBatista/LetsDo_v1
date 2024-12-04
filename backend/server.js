const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const usersRoutes = require("./routes/users-routes");
const tasksRoutes = require("./routes/tasks-routes");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/api/users", usersRoutes);
app.use("/api/tasks", tasksRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running");
});

mongoose
  .connect(
    "mongodb+srv://mbwakoko88:0SdoPDz7iZng5kIw@cluster0.vi4ar.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(8080, () => {
      console.log("Server is running on http://localhost:8080");
    });
  })
  .catch((err) => {
    console.log(err);
  });
