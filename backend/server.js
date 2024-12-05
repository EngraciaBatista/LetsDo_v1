const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const usersRoutes = require("./routes/users-routes");
const tasksRoutes = require("./routes/tasks-routes");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const MONGO_DB_CONNECTION_STRING = process.env.MONGO_DB_CONNECTION_STRING;

app.use(cors());
app.use(bodyParser.json());
app.use("/api/users", usersRoutes);
app.use("/api/tasks", tasksRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running");
});

mongoose
  .connect(MONGO_DB_CONNECTION_STRING)
  .then(() => {
    app.listen(8080, () => {
      console.log("Server is running on http://localhost:8080");
    });
  })
  .catch((err) => {
    console.log(err);
  });
