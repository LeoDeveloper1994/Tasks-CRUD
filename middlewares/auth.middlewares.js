const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const { Users } = require("../models/users.model");

const { catchAsync } = require("../utils/catchAsync.utils");

const { AppError } = require("../utils/appError.util");



const protectedSession = catchAsync( async (req, res, next) => {
  let token;

  if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
    token = req.headers.authorization.split(" ")[1];
  }

  if(!token) {
    return next(new AppError("Invalid session", 403));
  }

  const decode = jwt.verify(token, process.env.JWT_SECRET);

  const user = await Users.findOne({
    where: {id: decode.id, status: "active"}
  });

  if (!user) {
    return next(new AppError("The owner of the session is no longer active", 403));
  }

  req.sessionUser = user;

  next();
});

const protectedUserAccount = catchAsync( async ( req, res, next ) =>{
  const { sessionUser, user } = req;

  if(sessionUser.id !== user.id){
    return next(new AppError("You aren't the owner of this account", 403));
  }

  next();
});

module.exports = { protectedSession, protectedUserAccount };