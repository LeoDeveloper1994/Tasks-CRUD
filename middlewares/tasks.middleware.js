const { Tasks } = require("../models/tasks.model");

const { catchAsync } = require("../utils/catchAsync.utils");

const { AppError } = require("../utils/appError.util");



const tasksExist = catchAsync( async(req, res, next) => {
  const { sessionUser } = req;

  const tasks = await Tasks.findAll({ where: { user_id: sessionUser.id, status: ["active", "pending", "completed", "canceled"]}});

  if (!tasks[0]) {
    return next(new AppError("This user has no assigned tasks yet", 404));
  }

  req.tasks = tasks;

  next();

});

const taskExistById = catchAsync( async(req, res, next) => {
  const { id } = req.params;

  const task = await Tasks.findOne({ where: { id }});

  if (!task) {
    return next(new AppError(`Task with ID: ${ id } doesent exist in our server or your status is inactive`, 404));
  }

  req.task = task;

  next();
});


module.exports = { tasksExist, taskExistById };