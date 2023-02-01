const express = require("express");

const tasksRoute = express.Router();

const { protectedSession, protectedTask } = require("../middlewares/auth.middlewares");

const { createTaskValidator, updateTaskValidator } = require("../middlewares/validators.middleware");

const { tasksExist, taskExistById } = require("../middlewares/tasks.middleware");

const { getAllTasks, createTask, updateTask, deleteTask } = require("../controllers/tasks.controller");


tasksRoute.use(protectedSession);

tasksRoute.post("/", createTaskValidator, createTask);

tasksRoute.get("/", tasksExist, getAllTasks);

tasksRoute.patch("/:id", updateTaskValidator, taskExistById, protectedTask, updateTask);

tasksRoute.delete("/:id", taskExistById, protectedTask, deleteTask)

module.exports = { tasksRoute };