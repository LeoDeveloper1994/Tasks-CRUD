const cors = require("cors");
const express = require("express");

const app = express();

app.use(express.json());

app.use(cors());

const { usersRoute } = require("./routes/users.route");

const { tasksRoute } = require("./routes/tasks.route");

const { globalErrorHanddler } = require("./controllers/error.controller");

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