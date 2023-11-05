const { userController } = require("../controllers/user");

const userRouter = require("express").Router();

userRouter.post("/register", userController.registerUser);
userRouter.post("/login", userController.userLogin);

module.exports = userRouter;
