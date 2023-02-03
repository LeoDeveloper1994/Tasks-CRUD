const express = require("express");

const cors = require("cors");

const app = express();

app.use(express.json());


const { usersRoute } = require("./routes/users.route");

const { tasksRoute } = require("./routes/tasks.route");

const { globalErrorHanddler } = require("./controllers/error.controller");

app.use(cors());

app.use("/api/v1/users", usersRoute);

app.use("/api/v1/tasks", tasksRoute);

app.use(globalErrorHanddler);

app.all("*", (req, res) => {
  const { method, url } = req;

  res.status(404).json({
    status: "error",
    message: `${method}/${url} dont exist in our server`
  });
});



module.exports = { app };