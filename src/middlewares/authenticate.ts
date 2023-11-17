// creare un middleware para validar el token

import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/handleToken";
import { CustomRequest } from "../interfaces/userRequest";

export const authenticate = async (
	req: CustomRequest,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const token = req.headers.authorization?.split(" ")[1];
		if (!token) throw new Error("No se recibio el token");

		const user = await verifyToken(token);
		if (!user) throw new Error("Token invalido");
		req.user = user;
		return next();
	} catch (error) {
		if (error instanceof Error) {
			res.status(401).json({
				ok: false,
				message: error.message,
			});
		}
	}
};
