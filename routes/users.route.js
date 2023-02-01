const express = require("express");

const usersRoute = express.Router();

const { createUserValidator, loginValidator, updateUserValidator } = require("../middlewares/validators.middleware");

const { userExistToLogIn, userExist } = require("../middlewares/users.middleware");

const { createUser, userLogIn, updateUserAccount, deleteUserAccount } = require("../controllers/users.controller");

const { protectedSession, protectedUserAccount } = require("../middlewares/auth.middlewares");

usersRoute.post("/", createUserValidator, createUser);

usersRoute.post("/login", loginValidator, userExistToLogIn, userLogIn);

usersRoute.use(protectedSession);

usersRoute.patch("/:id", updateUserValidator, userExist, protectedUserAccount, updateUserAccount);

usersRoute.delete("/:id", userExist, protectedUserAccount, deleteUserAccount);

module.exports = { usersRoute };