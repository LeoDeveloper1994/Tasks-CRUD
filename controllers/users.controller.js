const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const { Users } = require("../models/users.model");

const { catchAsync } = require("../utils/catchAsync.utils");

const createUser = catchAsync( async (req, res) => {
  const {user_name, email, password} = req.body;

  const salt = await bcrypt.genSalt(12);

  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await Users.create({
    user_name,
    email,
    password: hashedPassword
  });

  newUser.password = undefined;

  res.status(201).json({
    status: "success",
    data: {
      newUser: "deberia haber un usuario xd"
    }
  });

});

const userLogIn = (req, res) => {
  const { user } = req;

  const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: "365d"});

  res.status(200).json({
    status: "success",
    data: {
      user,
      token
    }
  });
};

const updateUserAccount = catchAsync( async(req, res, next) => {
  const {user_name, email, password} = req.body;
  const { user } = req;

  const salt = await bcrypt.genSalt(12);

  const hashedPassword = await bcrypt.hash(password, salt);

  await user.update({user_name, email, password: hashedPassword});

  user.password = undefined;

  res.status(200).json({
    status: "success",
    data: user
  });
});

const deleteUserAccount = catchAsync( async (req, res, next) => {
  const { user } = req;

  await user.update({ status: "inactive" });

  res.status(204).json({
    statuss: "success"
  });
});

module.exports = { createUser, userLogIn, updateUserAccount, deleteUserAccount };