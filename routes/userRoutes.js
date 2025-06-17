const express = require('express');
const { getAllUsers, loginUser, registerUser } = require('../controllers/userController');

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/", getAllUsers);

module.exports = userRouter;
