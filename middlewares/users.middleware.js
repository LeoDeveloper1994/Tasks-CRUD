const bcrypt = require("bcryptjs");

const { Users } = require("../models/users.model");
const { Tasks } = require("../models/tasks.model");
const { catchAsync } = require("../utils/catchAsync.utils");
const { AppError } = require("../utils/appError.util");

const userExistToLogIn = catchAsync( async(req, res, next) => {
  const { email, password } = req.body;

  const userRegistered = await Users.findOne({
    where: { email, status: "active"}, include: { model: Tasks, required: false, where: { status: ["active", "pending", "completed", "canceled"] } }
  });

  if(!userRegistered || !(await bcrypt.compare(password, userRegistered.password))){
    return next(new AppError("Unregistered user", 404));
  }

  userRegistered.password = undefined;
  req.user = userRegistered;

  next();
});

const userExist = catchAsync( async (req, res, next) => {
  const { id } = req.params;

  const user = await Users.findOne({
    where: {id, status: "active"}
  });

  if(!user){
    return next(new AppError("This user doesent exist in our server", 404))
  }

  req.user = user;

  next();
});

module.exports = { userExistToLogIn, userExist };