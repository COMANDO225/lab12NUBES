import { compare, encrypt } from "../../utils/handleBcrypt";
import { generateToken } from "../../utils/handleToken";
import { prisma } from "../../utils/prismaClient";
import { User } from "@prisma/client";

export const createUserService = async (data: User): Promise<User> => {
	try {
		const userMatcheao = await prisma.user.findUnique({
			where: {
				email: data.email,
			},
		});
		if (userMatcheao) throw new Error("Ya existe un usuario con ese email");

		// encriptacion de la contraseña
		const encryptedPassword = await encrypt(data.password!);
		if (!encryptedPassword)
			throw new Error("Error al encriptar la contraseña");

		const newUser: Omit<User, "id" | "refreshToken"> = {
			nombre: data.nombre,
			apellido: data.apellido,
			email: data.email,
			password: encryptedPassword,
		};

		// creacion del usuario
		const userCreated = await prisma.user.create({
			data: newUser,
		});
		return userCreated;
	} catch (error) {
		throw error;
	}
};

interface loginProps {
	token: string;
	refreshToken: string;
}
export const loginUserService = async (data: User): Promise<loginProps> => {
	try {
		const userMatcheao = await prisma.user.findUnique({
			where: {
				email: data.email,
			},
		});
		if (!userMatcheao)
			throw new Error("El usuario no existe, como el amor de ella");

		// comparacion de la contraseña
		const passwordMatcheada = await compare(
			data.password,
			userMatcheao.password
		);
		if (!passwordMatcheada)
			throw new Error("Correo o contraseña incorrecta causa");

		const payload = {
			id: userMatcheao.id,
			nombre: userMatcheao.nombre,
			email: userMatcheao.email,
			apellido: userMatcheao.apellido,
		};

		const token = await generateToken(payload, "1h");
		if (!token) throw new Error("Error al generar el token");

		const refreshToken = await generateToken(payload, "7d");
		if (!refreshToken) throw new Error("Error al generar el refresh token");

		// actualizacion del usuario con el refresh token
		const userUpdated = await prisma.user.update({
			where: {
				id: userMatcheao.id,
			},
			data: {
				refreshToken,
			},
		});
		if (!userUpdated) throw new Error("Error al actualizar el usuario");

		return {
			token,
			refreshToken,
		};
	} catch (error) {
		throw error;
	}
};
