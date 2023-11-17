import { Router } from "express";
import * as userController from "./user.controller";
import validate from "../../middlewares/validateDTO";
import { createUserSchema, loginUserSchema } from "./user.validation";
const userRouter = Router();

userRouter.post(
	"/register",
	validate(createUserSchema),
	userController.register
);

userRouter.post("/login", validate(loginUserSchema), userController.login);

export default userRouter;
