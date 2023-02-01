const { Tasks } = require("../models/tasks.model");

const { catchAsync } = require("../utils/catchAsync.utils");

const createTask = catchAsync( async(req, res, next) => {

  const { sessionUser } = req;

  const { task_name, description } = req.body;

  const newTask = await Tasks.create({task_name, description, user_id: sessionUser.id});

  res.status(201).json({
    status: "success",
    data: newTask
  });
});

const getAllTasks = catchAsync( async(req, res, next) => {

  const { tasks } = req;

  res.status(200).json({
    status: "success",
    data: tasks
  });

});

const updateTask = catchAsync( async(req, res, next) => {
  const { task } = req;
  const { task_name, description, status } = req.body;

  await task.update({task_name, description, status});

  res.status(200).json({
    status: "success",
    data: {
      task
    }
  });
});

const deleteTask = catchAsync( async(req, res, next) => {
  const { task } = req;

  await task.update({status: "inactive"});

  res.status(204).json({
    status: "success"
  });
});

module.exports = { getAllTasks, createTask, updateTask, deleteTask };