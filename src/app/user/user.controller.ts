import { Request, Response } from "express";
import { createUserService, loginUserService } from "./user.service";

// controller de user: registro, login, logout, update, delete

// registro
export const register = async (req: Request, res: Response) => {
	try {
		const userCreated = await createUserService(req.body);

		const { email, nombre, apellido } = userCreated;

		res.status(201).json({
			ok: true,
			message: "Usuario creado correctamente",
			user: { email, nombre, apellido },
		});
	} catch (error) {
		console.log(error);
		if (error instanceof Error) {
			res.status(400).json({
				ok: false,
				message: error.message,
			});
		}
	}
};

// login
export const login = async (req: Request, res: Response) => {
	try {
		const { refreshToken, token } = await loginUserService(req.body);

		res.cookie("refreshTokenLab02", refreshToken, {
			httpOnly: true,
			maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
		});

		res.status(200).json({
			ok: true,
			message: "Usuario logueado correctamente",
			token,
		});
	} catch (error) {
		console.log(error);
		if (error instanceof Error) {
			res.status(400).json({
				ok: false,
				message: error.message,
			});
		}
	}
};
