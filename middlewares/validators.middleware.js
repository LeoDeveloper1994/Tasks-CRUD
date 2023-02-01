const { body, validationResult } = require("express-validator");
const { AppError } = require("../utils/appError.util");

const checkValidations = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessage = errors.array().map(err => {
      return err.msg
    });

    const message = errorMessage.join(". ");

    return next(new AppError(message, 400));
  };

  next();
};

const createUserValidator = [
  body('user_name')
        .isString()
        .withMessage('Name must be a string')
        .notEmpty()
        .withMessage('Name cannot be empty')
        .isLength({ min: 3 })
        .withMessage('Name must be a least 3 characters'),
    body('email').isEmail().withMessage('Must provide a valid email'),
    body('password')
        .isString()
        .withMessage('Password must be a string')
        .notEmpty()
        .withMessage('Password cannot be empty')
        .isLength({ min: 8 })
        .withMessage('Password must be a least 8 characters'),
    checkValidations,
];

const loginValidator = [
  body('email').isEmail().withMessage('Must provide a valid email'),
  body('password')
      .isString()
      .withMessage('Password must be a string')
      .notEmpty()
      .withMessage('Password cannot be empty')
      .isLength({ min: 8 })
      .withMessage('Password must be a least 8 characters'),
  checkValidations,
];

const updateUserValidator = [
  body("user_name")
      .isString()
      .withMessage('Name must be a string')
      .notEmpty()
      .withMessage('Name cannot be empty')
      .isLength({ min: 3 })
      .withMessage('Name must be a least 3 characters'),
  body('email').isEmail().withMessage('Must provide a valid email'),
  body("password")
      .isString()
      .withMessage('Password must be a string')
      .notEmpty()
      .withMessage('Password cannot be empty')
      .isLength({ min: 8 })
      .withMessage('Password must be a least 8 characters'),
  checkValidations
];

const createTaskValidator = [
  body("task_name")
      .isString()
      .withMessage("Task name must be a string")
      .notEmpty()
      .withMessage("Task name cannot be empty"),
  body("description")
      .isString()
      .withMessage("Description must be a string")
      .notEmpty()
      .withMessage("Description cannot be empty"),
  checkValidations
];

const updateTaskValidator = [
  body("task_name")
      .isString()
      .withMessage("Task name must be a string")
      .notEmpty()
      .withMessage("Task name cannot be empty"),
  body("description")
      .isString()
      .withMessage("Description must be a string")
      .notEmpty()
      .withMessage("Description cannot be empty"),
  body("status")
      .isString()
      .withMessage("Status must be a string")
      .notEmpty()
      .withMessage("Status cannot be empty"),
  checkValidations
];

module.exports = { createUserValidator, loginValidator, updateUserValidator, createTaskValidator, updateTaskValidator };